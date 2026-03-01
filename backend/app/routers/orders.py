"""
Order processing endpoints.

Authentication is header-based (X-User-Id / X-User-Role) until a full JWT
auth system is in place. All order-write endpoints require a user id header;
the status-update and payment-verify endpoints additionally require role=admin.
"""

import json
import uuid as uuid_mod
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, Header, HTTPException, Query, UploadFile, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.schemas.order import (
    OrderCreate,
    OrderResponse,
    OrderListResponse,
    OrderStatusUpdate,
    PaymentVerificationUpdate,
)

router = APIRouter(prefix="/orders", tags=["orders"])

# Directory where payment screenshots are stored (relative to the backend/ cwd)
UPLOADS_DIR = Path("uploads/payments")

# Allowed image MIME types for payment screenshots
ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
}

# ---------------------------------------------------------------------------
# Auth dependencies (lightweight until JWT is wired up)
# ---------------------------------------------------------------------------


def get_current_user_id(
    x_user_id: Optional[str] = Header(default=None, alias="X-User-Id")
) -> str:
    """Extract the current user id from the request header."""
    if not x_user_id or not x_user_id.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-User-Id header. Authentication required.",
        )
    return x_user_id.strip()


def get_current_admin(
    x_user_id: Optional[str] = Header(default=None, alias="X-User-Id"),
    x_user_role: Optional[str] = Header(default=None, alias="X-User-Role"),
) -> str:
    """Verify that the caller is an authenticated admin user."""
    if not x_user_id or not x_user_id.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-User-Id header. Authentication required.",
        )
    if x_user_role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin role required to perform this action.",
        )
    return x_user_id.strip()


# ---------------------------------------------------------------------------
# Helper: valid status transitions
# ---------------------------------------------------------------------------

VALID_TRANSITIONS: dict[str, list[str]] = {
    "pending":   ["confirmed", "cancelled"],
    "confirmed": ["shipped", "cancelled"],
    "shipped":   ["delivered", "cancelled"],
    "delivered": [],
    "cancelled": [],
}


def _assert_valid_transition(current: str, new: str) -> None:
    """Raise 400 if the requested status transition is not allowed."""
    allowed = VALID_TRANSITIONS.get(current, [])
    if new == current:
        return  # idempotent – allow
    if new not in allowed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Cannot transition order from '{current}' to '{new}'. "
                f"Allowed transitions: {allowed or ['none']}."
            ),
        )


# ---------------------------------------------------------------------------
# Helper: build order items + total from a list of {product_id, quantity} dicts
# ---------------------------------------------------------------------------

def _build_order_items(
    parsed_items: list[dict],
    db: Session,
) -> tuple[list[OrderItem], float]:
    """
    Validate products, check stock, snapshot prices.
    Returns (order_items, total_amount).
    Raises HTTPException on any validation failure.
    """
    seen_ids: set[str] = set()
    order_items: list[OrderItem] = []
    total_amount: float = 0.0

    for item in parsed_items:
        pid = item["product_id"]

        if pid in seen_ids:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Duplicate product_id '{pid}' in order items. Merge quantities.",
            )
        seen_ids.add(pid)

        product: Optional[Product] = db.query(Product).filter_by(id=pid).first()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id '{pid}' not found.",
            )
        if product.status != "active":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product '{product.name}' is not available for purchase.",
            )
        if product.stock_status == "out_of_stock":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product '{product.name}' is out of stock.",
            )
        if product.total_stock < item["quantity"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Insufficient stock for '{product.name}'. "
                    f"Requested: {item['quantity']}, available: {product.total_stock}."
                ),
            )

        snapshot_price: float = (
            product.discount_price
            if product.discount_price and product.discount_price > 0
            else product.selling_price
        )
        total_amount += snapshot_price * item["quantity"]
        order_items.append(
            OrderItem(
                product_id=pid,
                quantity=item["quantity"],
                price=snapshot_price,
            )
        )

    return order_items, total_amount


def _deduct_stock(parsed_items: list[dict], db: Session) -> None:
    """Deduct stock for all items in the order."""
    for item in parsed_items:
        product = db.query(Product).filter_by(id=item["product_id"]).first()
        if product:
            product.total_stock -= item["quantity"]
            if product.total_stock <= 0:
                product.total_stock = 0
                product.stock_status = "out_of_stock"
            elif product.total_stock <= product.low_stock_threshold:
                product.stock_status = "low_stock"
            else:
                product.stock_status = "in_stock"


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post(
    "/create",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create order with manual payment (multipart/form-data)",
)
async def create_order_with_payment(
    items: str = Form(..., description="JSON array: [{product_id, quantity}, ...]"),
    customer_name: str = Form(...),
    customer_phone: str = Form(...),
    customer_address: str = Form(...),
    customer_city: str = Form(...),
    customer_notes: Optional[str] = Form(None),
    payment_method: str = Form(..., description="cod | easypaisa | jazzcash"),
    screenshot: Optional[UploadFile] = File(None, description="Payment screenshot (required for Easypaisa/JazzCash)"),
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """
    Create a new order supporting all manual payment methods.

    - **cod**: Cash on Delivery – no screenshot required.
      `payment_status` is set to *"Pending"*.
    - **easypaisa / jazzcash**: Screenshot is required.
      `payment_status` is set to *"Pending Verification"*.

    Screenshots are saved to `uploads/payments/` and the relative path is
    stored in the order record.
    """
    # --- Validate payment method ---
    valid_methods = {"cod", "easypaisa", "jazzcash"}
    if payment_method not in valid_methods:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid payment_method '{payment_method}'. Allowed: {sorted(valid_methods)}.",
        )

    # --- Screenshot validation ---
    if payment_method in {"easypaisa", "jazzcash"} and not screenshot:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A payment screenshot is required for Easypaisa and JazzCash payments.",
        )

    if screenshot:
        if screenshot.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Invalid file type '{screenshot.content_type}'. "
                    "Only image files (JPEG, PNG, GIF, WebP) are accepted."
                ),
            )

    # --- Parse items JSON ---
    try:
        raw_items = json.loads(items)
        if not isinstance(raw_items, list) or len(raw_items) == 0:
            raise ValueError("items must be a non-empty list")
    except (json.JSONDecodeError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid items format: {exc}",
        )

    parsed_items: list[dict] = []
    for entry in raw_items:
        if not isinstance(entry, dict) or "product_id" not in entry or "quantity" not in entry:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Each item must be an object with 'product_id' and 'quantity'.",
            )
        qty = int(entry["quantity"])
        if qty < 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Item quantity must be at least 1.",
            )
        parsed_items.append({"product_id": str(entry["product_id"]), "quantity": qty})

    # --- Validate products and build line items ---
    order_items, total_amount = _build_order_items(parsed_items, db)

    # --- Save screenshot ---
    screenshot_path: Optional[str] = None
    if screenshot:
        UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
        suffix = Path(screenshot.filename).suffix if screenshot.filename else ".jpg"
        filename = f"{uuid_mod.uuid4().hex}{suffix}"
        dest = UPLOADS_DIR / filename
        content = await screenshot.read()
        dest.write_bytes(content)
        screenshot_path = f"uploads/payments/{filename}"

    # --- Determine payment status ---
    payment_status_value = "Pending Verification" if payment_method in {"easypaisa", "jazzcash"} else "Pending"

    # --- Persist order ---
    order = Order(
        user_id=user_id,
        customer_name=customer_name.strip(),
        customer_phone=customer_phone.strip(),
        customer_address=customer_address.strip(),
        customer_city=customer_city.strip(),
        customer_notes=customer_notes.strip() if customer_notes else None,
        payment_method=payment_method,
        payment_status=payment_status_value,
        payment_screenshot=screenshot_path,
        total_amount=round(total_amount, 2),
        status="pending",
        items=order_items,
    )
    db.add(order)
    _deduct_stock(parsed_items, db)
    db.commit()
    db.refresh(order)

    return OrderResponse.from_orm(order)


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """
    Create a new order (JSON body – legacy endpoint, COD/Easypaisa/JazzCash without screenshot).

    Use `POST /orders/create` for screenshot-based payments.
    """
    parsed_items = [
        {"product_id": item.product_id, "quantity": item.quantity}
        for item in order_in.items
    ]

    order_items, total_amount = _build_order_items(parsed_items, db)

    payment_status_value = (
        "Pending Verification"
        if order_in.payment_method in {"easypaisa", "jazzcash"}
        else "Pending"
    )

    order = Order(
        user_id=user_id,
        customer_name=order_in.customer_name,
        customer_phone=order_in.customer_phone,
        customer_address=order_in.customer_address,
        customer_city=order_in.customer_city,
        customer_notes=order_in.customer_notes,
        payment_method=order_in.payment_method,
        payment_status=payment_status_value,
        total_amount=round(total_amount, 2),
        status="pending",
        items=order_items,
    )
    db.add(order)
    _deduct_stock(parsed_items, db)
    db.commit()
    db.refresh(order)

    return OrderResponse.from_orm(order)


@router.get("/", response_model=OrderListResponse)
def list_orders(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    status_filter: Optional[str] = Query(
        None,
        alias="status",
        description="Filter by order status",
    ),
):
    """List orders belonging to the authenticated user."""
    query = db.query(Order).filter(Order.user_id == user_id)

    if status_filter:
        allowed = {"pending", "confirmed", "shipped", "delivered", "cancelled"}
        if status_filter not in allowed:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid status filter '{status_filter}'. Allowed: {sorted(allowed)}.",
            )
        query = query.filter(Order.status == status_filter)

    query = query.order_by(Order.created_at.desc())
    total: int = query.count()
    offset = (page - 1) * limit
    orders = query.offset(offset).limit(limit).all()
    pages = (total + limit - 1) // limit if total > 0 else 1

    return OrderListResponse(
        items=[OrderResponse.from_orm(o) for o in orders],
        total=total,
        page=page,
        limit=limit,
        pages=pages,
    )


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Retrieve a single order by id. Only the owning user may access it."""
    order: Optional[Order] = db.query(Order).filter_by(id=order_id).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id '{order_id}' not found.",
        )
    if order.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view this order.",
        )

    return OrderResponse.from_orm(order)


@router.put("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: str,
    status_update: OrderStatusUpdate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin),
):
    """
    Update an order's fulfillment status (admin only).

    Enforces allowed status transitions:
      pending   -> confirmed | cancelled
      confirmed -> shipped   | cancelled
      shipped   -> delivered | cancelled
      delivered -> (terminal)
      cancelled -> (terminal)
    """
    order: Optional[Order] = db.query(Order).filter_by(id=order_id).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id '{order_id}' not found.",
        )

    _assert_valid_transition(order.status, status_update.status)
    order.status = status_update.status
    db.commit()
    db.refresh(order)

    return OrderResponse.from_orm(order)


@router.put("/{order_id}/verify", response_model=OrderResponse)
def verify_payment(
    order_id: str,
    update: PaymentVerificationUpdate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin),
):
    """
    Verify or reject a manual payment screenshot (admin only).

    Sets `payment_status` to **"Paid"** or **"Rejected"**.
    When marked as Paid, the order status is automatically advanced to
    *"confirmed"* (if it is still *"pending"*).
    """
    order: Optional[Order] = db.query(Order).filter_by(id=order_id).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id '{order_id}' not found.",
        )

    order.payment_status = update.payment_status

    # Auto-confirm pending orders when payment is verified
    if update.payment_status == "Paid" and order.status == "pending":
        order.status = "confirmed"

    db.commit()
    db.refresh(order)

    return OrderResponse.from_orm(order)

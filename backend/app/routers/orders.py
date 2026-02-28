"""
Order processing endpoints.

Authentication is header-based (X-User-Id / X-User-Role) until a full JWT
auth system is in place. All order-write endpoints require a user id header;
the status-update endpoint additionally requires role=admin.
"""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Header, Query, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.schemas.order import (
    OrderCreate,
    OrderResponse,
    OrderListResponse,
    OrderStatusUpdate,
)

router = APIRouter(prefix="/orders", tags=["orders"])

# ---------------------------------------------------------------------------
# Auth dependencies (lightweight until JWT is wired up)
# ---------------------------------------------------------------------------

def get_current_user_id(
    x_user_id: Optional[str] = Header(default=None, alias="X-User-Id")
) -> str:
    """
    Extract the current user id from the request header.

    Replace with JWT-based extraction once the auth system is ready.
    """
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
    """
    Verify that the caller is an authenticated admin user.

    Replace with JWT role-claim extraction once the auth system is ready.
    """
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
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """
    Create a new order.

    - Validates each product exists and is active.
    - Snapshots the current selling price into OrderItem.price.
    - Calculates total_amount as sum(quantity * price) across all items.
    - Returns HTTP 201 on success.
    """
    # Deduplicate product_ids within the request
    seen_product_ids: set[str] = set()
    for item in order_in.items:
        if item.product_id in seen_product_ids:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Duplicate product_id '{item.product_id}' in order items. "
                       "Merge quantities into a single entry.",
            )
        seen_product_ids.add(item.product_id)

    # Validate products and build line items
    order_items: list[OrderItem] = []
    total_amount: float = 0.0

    for item_in in order_in.items:
        product: Optional[Product] = db.query(Product).filter_by(id=item_in.product_id).first()

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id '{item_in.product_id}' not found.",
            )

        if product.status != "active":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product '{product.name}' (id={product.id}) is not available for purchase.",
            )

        if product.stock_status == "out_of_stock":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product '{product.name}' is out of stock.",
            )

        if product.total_stock < item_in.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Insufficient stock for '{product.name}'. "
                    f"Requested: {item_in.quantity}, available: {product.total_stock}."
                ),
            )

        # Snapshot: use discount_price when available, else selling_price
        snapshot_price: float = (
            product.discount_price
            if product.discount_price and product.discount_price > 0
            else product.selling_price
        )

        line_total = snapshot_price * item_in.quantity
        total_amount += line_total

        order_items.append(
            OrderItem(
                product_id=item_in.product_id,
                quantity=item_in.quantity,
                price=snapshot_price,
            )
        )

    # Create the order
    order = Order(
        user_id=user_id,
        customer_name=order_in.customer_name,
        customer_phone=order_in.customer_phone,
        customer_address=order_in.customer_address,
        customer_city=order_in.customer_city,
        customer_notes=order_in.customer_notes,
        payment_method=order_in.payment_method,
        total_amount=round(total_amount, 2),
        status="pending",
        items=order_items,
    )

    db.add(order)

    # Deduct stock after successful order creation
    for item_in in order_in.items:
        product = db.query(Product).filter_by(id=item_in.product_id).first()
        if product:
            product.total_stock -= item_in.quantity
            # Update stock_status
            if product.total_stock <= 0:
                product.total_stock = 0
                product.stock_status = "out_of_stock"
            elif product.total_stock <= product.low_stock_threshold:
                product.stock_status = "low_stock"
            else:
                product.stock_status = "in_stock"

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
        description="Filter by order status (pending, confirmed, shipped, delivered, cancelled)",
    ),
):
    """
    List orders belonging to the authenticated user.

    Supports pagination and optional status filtering.
    """
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
    """
    Retrieve a single order by id.

    Only the owning user may fetch their own order.
    """
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
    Update an order's status (admin only).

    Enforces allowed status transitions:
      pending   -> confirmed | cancelled
      confirmed -> shipped   | cancelled
      shipped   -> delivered | cancelled
      delivered -> (terminal – no further transitions)
      cancelled -> (terminal – no further transitions)
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

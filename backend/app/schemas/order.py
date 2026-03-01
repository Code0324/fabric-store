"""Order and OrderItem Pydantic v2 schemas."""
from typing import List, Optional, Literal
from datetime import datetime
from pydantic import BaseModel, field_validator

from app.schemas.product import ProductResponse


# ---------------------------------------------------------------------------
# OrderItem schemas
# ---------------------------------------------------------------------------

class OrderItemCreate(BaseModel):
    """Input schema for a single line item when creating an order."""
    product_id: str
    quantity: int

    @field_validator("quantity")
    @classmethod
    def quantity_must_be_positive(cls, v: int) -> int:
        if v < 1:
            raise ValueError("quantity must be at least 1")
        return v


class OrderItemResponse(BaseModel):
    """Response schema for a single line item."""
    id: str
    order_id: str
    product_id: str
    quantity: int
    price: float            # Snapshot price at order time
    product: Optional[ProductResponse] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Order schemas
# ---------------------------------------------------------------------------

VALID_PAYMENT_METHODS = {"cod", "easypaisa", "jazzcash"}
VALID_STATUSES = {"pending", "confirmed", "shipped", "delivered", "cancelled"}
VALID_PAYMENT_STATUSES = {"Pending", "Pending Verification", "Paid", "Rejected"}


class OrderCreate(BaseModel):
    """Input schema for creating an order (JSON / COD-only legacy endpoint)."""
    items: List[OrderItemCreate]
    customer_name: str
    customer_phone: str
    customer_address: str
    customer_city: str
    customer_notes: Optional[str] = None
    payment_method: Literal["cod", "easypaisa", "jazzcash"] = "cod"

    @field_validator("items")
    @classmethod
    def items_must_not_be_empty(cls, v: List[OrderItemCreate]) -> List[OrderItemCreate]:
        if not v:
            raise ValueError("Order must contain at least one item")
        return v

    @field_validator("customer_name")
    @classmethod
    def name_must_not_be_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("customer_name must not be blank")
        return v

    @field_validator("customer_phone")
    @classmethod
    def phone_must_not_be_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("customer_phone must not be blank")
        return v

    @field_validator("customer_address")
    @classmethod
    def address_must_not_be_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("customer_address must not be blank")
        return v

    @field_validator("customer_city")
    @classmethod
    def city_must_not_be_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("customer_city must not be blank")
        return v


class OrderResponse(BaseModel):
    """Response schema for a full order."""
    id: str
    user_id: str
    customer_name: str
    customer_phone: str
    customer_address: str
    customer_city: str
    customer_notes: Optional[str] = None
    items: List[OrderItemResponse] = []
    total_amount: float
    payment_method: str
    payment_status: str
    payment_screenshot: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class OrderListResponse(BaseModel):
    """Paginated list of orders."""
    items: List[OrderResponse]
    total: int
    page: int
    limit: int
    pages: int

    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    """Input schema for updating an order's fulfillment status (admin)."""
    status: Literal["pending", "confirmed", "shipped", "delivered", "cancelled"]


class PaymentVerificationUpdate(BaseModel):
    """Input schema for verifying / rejecting a manual payment (admin)."""
    payment_status: Literal["Paid", "Rejected"]

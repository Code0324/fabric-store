"""Order schemas."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.order import OrderStatus, PaymentMethod


class OrderItemRequest(BaseModel):
    """Order item creation request."""

    product_id: str = Field(..., description="Product ID")
    quantity: int = Field(..., gt=0, description="Item quantity")


class OrderCreate(BaseModel):
    """Order creation schema."""

    items: list[OrderItemRequest] = Field(..., description="Order items")
    customer_name: Optional[str] = Field(None, description="Customer name")
    customer_phone: Optional[str] = Field(None, description="Customer phone")
    shipping_address: Optional[str] = Field(None, description="Shipping address")
    payment_method: PaymentMethod = Field(
        default=PaymentMethod.COD, description="Payment method"
    )
    notes: Optional[str] = Field(None, description="Order notes")


class OrderItemResponse(BaseModel):
    """Order item response schema."""

    id: str = Field(..., description="Order item ID")
    product_id: str = Field(..., description="Product ID")
    quantity: int = Field(..., description="Item quantity")
    price: float = Field(..., description="Item price")

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    """Order response schema."""

    id: str = Field(..., description="Order ID")
    user_id: str = Field(..., description="User ID")
    total_amount: float = Field(..., description="Total amount")
    status: OrderStatus = Field(..., description="Order status")
    payment_method: PaymentMethod = Field(..., description="Payment method")
    customer_name: Optional[str] = Field(None, description="Customer name")
    customer_phone: Optional[str] = Field(None, description="Customer phone")
    shipping_address: Optional[str] = Field(None, description="Shipping address")
    notes: Optional[str] = Field(None, description="Order notes")
    items: list[OrderItemResponse] = Field(..., description="Order items")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

    class Config:
        from_attributes = True


__all__ = ["OrderCreate", "OrderResponse", "OrderItemResponse", "OrderItemRequest"]

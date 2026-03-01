"""Order and OrderItem models."""
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Text, CheckConstraint
from sqlalchemy.orm import relationship
import uuid

from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    # Primary Key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    # User reference
    user_id = Column(String(36), nullable=False, index=True)

    # Customer delivery info
    customer_name = Column(String(255), nullable=False)
    customer_phone = Column(String(20), nullable=False)
    customer_address = Column(Text, nullable=False)
    customer_city = Column(String(100), nullable=False)
    customer_notes = Column(Text, nullable=True)

    # Financials
    total_amount = Column(Float, nullable=False, default=0.0)

    # Payment method: 'cod' | 'easypaisa' | 'jazzcash'
    payment_method = Column(String(20), nullable=False, default="cod")

    # Payment status: 'Pending' | 'Pending Verification' | 'Paid' | 'Rejected'
    payment_status = Column(String(30), nullable=False, default="Pending")

    # Path to uploaded payment screenshot (Easypaisa / JazzCash only)
    payment_screenshot = Column(String(500), nullable=True)

    # Order status
    status = Column(
        String(20),
        nullable=False,
        default="pending",
        index=True,
    )

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')",
            name="ck_order_status",
        ),
    )

    def __repr__(self):
        return (
            f"<Order(id={self.id}, user_id={self.user_id}, "
            f"status={self.status}, payment_status={self.payment_status}, "
            f"total={self.total_amount})>"
        )


class OrderItem(Base):
    __tablename__ = "order_items"

    # Primary Key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    # Foreign Keys
    order_id = Column(String(36), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="RESTRICT"), nullable=False, index=True)

    # Line item details
    quantity = Column(Integer, nullable=False, default=1)
    price = Column(Float, nullable=False)  # Snapshot of product price at order time

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("Product", lazy="selectin")

    def __repr__(self):
        return (
            f"<OrderItem(id={self.id}, order_id={self.order_id}, "
            f"product_id={self.product_id}, qty={self.quantity})>"
        )

"""Order service."""
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import OrderCreate
from app.utils.exceptions import (
    OrderNotFoundException,
    ProductNotFoundException,
    InsufficientStockException,
)


class OrderService:
    """Order service."""

    @staticmethod
    async def create_order(
        user: User, order_create: OrderCreate, session: AsyncSession
    ) -> Order:
        """
        Create a new order.

        Args:
            user: Current user
            order_create: Order creation data
            session: Database session

        Returns:
            Created order

        Raises:
            ProductNotFoundException: If product not found
            InsufficientStockException: If product stock insufficient
        """
        total_amount = 0.0
        order_items = []

        # Validate and prepare order items
        for item_data in order_create.items:
            result = await session.execute(
                select(Product).where(Product.id == item_data.product_id)
            )
            product = result.scalar_one_or_none()

            if not product:
                raise ProductNotFoundException()

            if product.stock < item_data.quantity:
                raise InsufficientStockException(product.name)

            # Calculate item total
            item_total = float(product.price) * item_data.quantity
            total_amount += item_total

            # Create order item
            order_item = OrderItem(
                id=str(uuid4()),
                product_id=item_data.product_id,
                quantity=item_data.quantity,
                price=product.price,
            )
            order_items.append(order_item)

        # Create order
        order = Order(
            id=str(uuid4()),
            user_id=user.id,
            total_amount=total_amount,
            customer_name=order_create.customer_name or user.name,
            customer_phone=order_create.customer_phone,
            shipping_address=order_create.shipping_address,
            payment_method=order_create.payment_method,
            notes=order_create.notes,
        )

        # Add items to order
        for item in order_items:
            item.order_id = order.id
            order.items.append(item)

        # Reduce stock for each product
        for item_data in order_create.items:
            result = await session.execute(
                select(Product).where(Product.id == item_data.product_id)
            )
            product = result.scalar_one()
            product.stock -= item_data.quantity

        session.add(order)
        await session.commit()
        await session.refresh(order)

        return order

    @staticmethod
    async def get_order_by_id(
        order_id: str, session: AsyncSession
    ) -> Order:
        """
        Get order by ID.

        Args:
            order_id: Order ID
            session: Database session

        Returns:
            Order object

        Raises:
            OrderNotFoundException: If order not found
        """
        result = await session.execute(
            select(Order)
            .where(Order.id == order_id)
            .options(selectinload(Order.items).selectinload(OrderItem.product))
        )
        order = result.scalar_one_or_none()

        if not order:
            raise OrderNotFoundException()

        return order

    @staticmethod
    async def list_user_orders(
        user: User, session: AsyncSession, skip: int = 0, limit: int = 20
    ) -> list[Order]:
        """
        List orders for a user.

        Args:
            user: Current user
            session: Database session
            skip: Number of records to skip
            limit: Maximum records to return

        Returns:
            List of orders
        """
        result = await session.execute(
            select(Order)
            .where(Order.user_id == user.id)
            .options(selectinload(Order.items).selectinload(OrderItem.product))
            .offset(skip)
            .limit(limit)
            .order_by(Order.created_at.desc())
        )
        return result.scalars().unique().all()

    @staticmethod
    async def list_all_orders(
        session: AsyncSession, skip: int = 0, limit: int = 20
    ) -> list[Order]:
        """
        List all orders (admin only).

        Args:
            session: Database session
            skip: Number of records to skip
            limit: Maximum records to return

        Returns:
            List of orders
        """
        result = await session.execute(
            select(Order)
            .options(selectinload(Order.items).selectinload(OrderItem.product))
            .offset(skip)
            .limit(limit)
            .order_by(Order.created_at.desc())
        )
        return result.scalars().unique().all()


__all__ = ["OrderService"]

"""Order routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session, get_current_user, get_admin_user
from app.models.order import Order
from app.models.user import User
from app.schemas.order import OrderCreate, OrderResponse
from app.services.order import OrderService

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_create: OrderCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> Order:
    """
    Create a new order.

    **Request Body:**
    - items: List of order items (product_id and quantity)
    - customer_name: Customer name (optional)
    - customer_phone: Customer phone (optional)
    - shipping_address: Shipping address (optional)
    - payment_method: Payment method (cod, jazzcash, easypaisa, stripe)
    - notes: Order notes (optional)

    **Headers:**
    - Authorization: Bearer {token}

    **Response:** Created order
    """
    return await OrderService.create_order(current_user, order_create, session)


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> Order:
    """
    Get order by ID (user can only see their own orders, admins see all).

    **Path Parameters:**
    - order_id: Order ID

    **Headers:**
    - Authorization: Bearer {token}

    **Response:** Order object
    """
    order = await OrderService.get_order_by_id(order_id, session)

    # Check permission: user can only see their own orders
    if (
        current_user.role.value != "admin"
        and order.user_id != current_user.id
    ):
        from app.utils.exceptions import PermissionDeniedException
        raise PermissionDeniedException()

    return order


@router.get("", response_model=list[OrderResponse])
async def list_orders(
    skip: int = 0,
    limit: int = 20,
    current_user: Annotated[User, Depends(get_current_user)] = None,
    admin: Annotated[User, Depends(get_admin_user)] = None,
    session: Annotated[AsyncSession, Depends(get_session)] = None,
) -> list[Order]:
    """
    List orders.

    For regular users: returns their own orders
    For admins: returns all orders

    **Query Parameters:**
    - skip: Number of orders to skip
    - limit: Maximum orders to return

    **Headers:**
    - Authorization: Bearer {token}

    **Response:** List of orders
    """
    # If user is admin, list all orders
    if admin:
        return await OrderService.list_all_orders(session, skip, limit)

    # Otherwise list user's orders
    return await OrderService.list_user_orders(current_user, session, skip, limit)


__all__ = ["router"]

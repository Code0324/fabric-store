"""Product routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session, get_current_user, get_admin_user
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.services.product import ProductService

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_create: ProductCreate,
    admin: Annotated[User, Depends(get_admin_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> Product:
    """
    Create a new product (admin only).

    **Request Body:**
    - sku: Product SKU (unique)
    - name: Product name
    - brand: Brand name
    - category: Category
    - description: Product description (optional)
    - price: Product price
    - compare_price: Compare price (optional)
    - stock: Stock quantity
    - image: Product image URL (optional)
    - is_featured: Featured status
    - is_active: Active status

    **Headers:**
    - Authorization: Bearer {admin_token}

    **Response:** Created product
    """
    return await ProductService.create_product(product_create, session)


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: str,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> Product:
    """
    Get product by ID.

    **Path Parameters:**
    - product_id: Product ID

    **Response:** Product object
    """
    return await ProductService.get_product_by_id(product_id, session)


@router.get("", response_model=list[ProductResponse])
async def list_products(
    skip: int = 0,
    limit: int = 20,
    session: Annotated[AsyncSession, Depends(get_session)] = None,
) -> list[Product]:
    """
    List all active products.

    **Query Parameters:**
    - skip: Number of products to skip
    - limit: Maximum products to return

    **Response:** List of products
    """
    return await ProductService.list_products(session, skip, limit)


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: str,
    product_update: ProductUpdate,
    admin: Annotated[User, Depends(get_admin_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> Product:
    """
    Update a product (admin only).

    **Path Parameters:**
    - product_id: Product ID

    **Request Body:** Product update data (all fields optional)

    **Headers:**
    - Authorization: Bearer {admin_token}

    **Response:** Updated product
    """
    return await ProductService.update_product(product_id, product_update, session)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: str,
    admin: Annotated[User, Depends(get_admin_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> None:
    """
    Delete a product (soft delete - mark as inactive, admin only).

    **Path Parameters:**
    - product_id: Product ID

    **Headers:**
    - Authorization: Bearer {admin_token}
    """
    await ProductService.delete_product(product_id, session)


__all__ = ["router"]

"""Product service."""
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from app.utils.exceptions import ProductNotFoundException


class ProductService:
    """Product service."""

    @staticmethod
    async def create_product(
        product_create: ProductCreate, session: AsyncSession
    ) -> Product:
        """
        Create a new product.

        Args:
            product_create: Product creation data
            session: Database session

        Returns:
            Created product
        """
        product = Product(
            id=str(uuid4()),
            sku=product_create.sku,
            name=product_create.name,
            brand=product_create.brand,
            category=product_create.category,
            description=product_create.description,
            price=product_create.price,
            compare_price=product_create.compare_price,
            stock=product_create.stock,
            image=product_create.image,
            is_featured=product_create.is_featured,
            is_active=product_create.is_active,
        )

        session.add(product)
        await session.commit()
        await session.refresh(product)

        return product

    @staticmethod
    async def get_product_by_id(product_id: str, session: AsyncSession) -> Product:
        """
        Get product by ID.

        Args:
            product_id: Product ID
            session: Database session

        Returns:
            Product object

        Raises:
            ProductNotFoundException: If product not found
        """
        result = await session.execute(
            select(Product).where(Product.id == product_id)
        )
        product = result.scalar_one_or_none()

        if not product:
            raise ProductNotFoundException()

        return product

    @staticmethod
    async def list_products(
        session: AsyncSession, skip: int = 0, limit: int = 20
    ) -> list[Product]:
        """
        List products with pagination.

        Args:
            session: Database session
            skip: Number of records to skip
            limit: Maximum records to return

        Returns:
            List of products
        """
        result = await session.execute(
            select(Product).where(Product.is_active == True).offset(skip).limit(limit)
        )
        return result.scalars().all()

    @staticmethod
    async def update_product(
        product_id: str, product_update: ProductUpdate, session: AsyncSession
    ) -> Product:
        """
        Update a product.

        Args:
            product_id: Product ID
            product_update: Product update data
            session: Database session

        Returns:
            Updated product

        Raises:
            ProductNotFoundException: If product not found
        """
        product = await ProductService.get_product_by_id(product_id, session)

        # Update only provided fields
        update_data = product_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(product, field, value)

        session.add(product)
        await session.commit()
        await session.refresh(product)

        return product

    @staticmethod
    async def delete_product(product_id: str, session: AsyncSession) -> None:
        """
        Soft delete a product (mark as inactive).

        Args:
            product_id: Product ID
            session: Database session

        Raises:
            ProductNotFoundException: If product not found
        """
        product = await ProductService.get_product_by_id(product_id, session)
        product.is_active = False

        session.add(product)
        await session.commit()


__all__ = ["ProductService"]

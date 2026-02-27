"""Database seed script for initial data."""
import asyncio
from uuid import uuid4

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password
from app.core.config import settings
from app.db.session import async_session, init_db
from app.models.user import User, UserRole
from app.models.product import Product


async def create_admin_user(session: AsyncSession) -> None:
    """Create default admin user."""
    admin = User(
        id=str(uuid4()),
        email="admin@alimanfabrics.com",
        password=hash_password("admin123456"),
        name="Admin User",
        role=UserRole.ADMIN,
        is_active=True,
    )
    session.add(admin)
    await session.commit()
    print("✅ Created admin user: admin@alimanfabrics.com (password: admin123456)")


async def create_sample_products(session: AsyncSession) -> None:
    """Create sample products."""
    products_data = [
        {
            "sku": "KHAADI-001",
            "name": "Khaadi Unstitched Lawn",
            "brand": "Khaadi",
            "category": "Unstitched",
            "description": "Premium quality unstitched lawn suit",
            "price": 3500.00,
            "compare_price": 4500.00,
            "stock": 50,
            "image": "https://images.pexels.com/photos/2797383/pexels-photo-2797383.jpeg",
            "is_featured": True,
            "is_active": True,
        },
        {
            "sku": "GULAHMAD-001",
            "name": "Gul Ahmed Stitched Suit",
            "brand": "Gul Ahmed",
            "category": "Stitched",
            "description": "Beautiful stitched pret suit",
            "price": 5999.00,
            "compare_price": 7999.00,
            "stock": 35,
            "image": "https://images.pexels.com/photos/1638519/pexels-photo-1638519.jpeg",
            "is_featured": True,
            "is_active": True,
        },
        {
            "sku": "JUNAID-001",
            "name": "Junaid Jamshed Luxury Suit",
            "brand": "Junaid Jamshed",
            "category": "Luxury",
            "description": "Luxury embroidered suit collection",
            "price": 12500.00,
            "compare_price": 15000.00,
            "stock": 20,
            "image": "https://images.pexels.com/photos/949281/pexels-photo-949281.jpeg",
            "is_featured": True,
            "is_active": True,
        },
        {
            "sku": "SAYA-001",
            "name": "Saya Casual Shirt",
            "brand": "Saya",
            "category": "Casual",
            "description": "Comfortable casual shirt for daily wear",
            "price": 2499.00,
            "compare_price": 3499.00,
            "stock": 60,
            "image": "https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg",
            "is_featured": False,
            "is_active": True,
        },
        {
            "sku": "BAROQUE-001",
            "name": "Baroque Premium Dress",
            "brand": "Baroque",
            "category": "Formal",
            "description": "Premium formal dress for special occasions",
            "price": 8999.00,
            "compare_price": 11999.00,
            "stock": 25,
            "image": "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg",
            "is_featured": False,
            "is_active": True,
        },
    ]

    for product_data in products_data:
        product = Product(
            id=str(uuid4()),
            **product_data,
        )
        session.add(product)

    await session.commit()
    print(f"✅ Created {len(products_data)} sample products")


async def seed_database() -> None:
    """Seed database with initial data."""
    try:
        # Initialize database tables
        await init_db()
        print("✅ Database tables created")

        # Create session and add data
        async with async_session() as session:
            print("\n📦 Seeding database...")
            await create_admin_user(session)
            await create_sample_products(session)
            print("\n✅ Database seeded successfully!")
            print("\n📝 Test Credentials:")
            print("   Email: admin@alimanfabrics.com")
            print("   Password: admin123456")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(seed_database())

"""
Seed script for Al Imran Fabrics.

Usage (from backend/ directory with venv active):
    python seed_data.py

Reads DATABASE_URL from ../.env (or falls back to SQLite).
Creates brands, categories, and 8 seed products if the DB is empty.
"""

import json
import os
import sys
import uuid
from pathlib import Path

# ── Environment setup ─────────────────────────────────────────────────────────
env_file = Path(__file__).parent.parent / ".env"
if env_file.exists():
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))

# ── SQLAlchemy sync session ───────────────────────────────────────────────────
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./ecommerce.db")
# psycopg2 driver needed for Neon; replace asyncpg if present
DATABASE_URL = DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://")

connect_args = {"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args, echo=False)
SessionLocal = sessionmaker(bind=engine)

# ── Models ────────────────────────────────────────────────────────────────────
sys.path.insert(0, str(Path(__file__).parent))
from app.db.base import Base
import app.models  # registers all metadata

# Auto-create tables
Base.metadata.create_all(bind=engine)
print("✅ Tables verified / created")

from app.models import Brand, Category, Product


# ── Seed data ─────────────────────────────────────────────────────────────────

BRANDS = [
    {"name": "Khaadi", "slug": "khaadi"},
    {"name": "Gul Ahmed", "slug": "gul-ahmed"},
    {"name": "Junaid Jamshed", "slug": "junaid-jamshed"},
    {"name": "Saya", "slug": "saya"},
    {"name": "Baroque", "slug": "baroque"},
]

CATEGORIES = [
    {"name": "Women Unstitched", "slug": "women-unstitched"},
    {"name": "Women Stitched", "slug": "women-stitched"},
    {"name": "Men Shalwar Kameez", "slug": "men-shalwar-kameez"},
    {"name": "Luxury Formal", "slug": "luxury-formal"},
]

PRODUCTS = [
    {
        "sku": "KHD-LAWN-001",
        "name": "Khaadi Embroidered Lawn 3-Piece",
        "slug": "khaadi-embroidered-lawn-3-piece",
        "brand": "Khaadi",
        "category": "Women Unstitched",
        "description": "Premium embroidered lawn suit with contrast dupatta",
        "selling_price": 3990.0,
        "discount_percentage": 10,
        "total_stock": 50,
        "type": "unstitched",
        "piece_type": "3-piece",
        "is_featured": True,
        "is_new_arrival": True,
        "status": "active",
        "images": json.dumps([
            "https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=600&h=750&fit=crop"
        ]),
        "tags": "women,lawn,embroidered,summer",
    },
    {
        "sku": "GA-PRINT-002",
        "name": "Gul Ahmed Digital Print Suit",
        "slug": "gul-ahmed-digital-print-suit",
        "brand": "Gul Ahmed",
        "category": "Women Unstitched",
        "description": "Vibrant digital print unstitched suit",
        "selling_price": 4500.0,
        "discount_percentage": 15,
        "total_stock": 35,
        "type": "unstitched",
        "piece_type": "3-piece",
        "is_featured": True,
        "is_bestseller": True,
        "status": "active",
        "images": json.dumps([
            "https://images.unsplash.com/photo-1618932260643-30f82d9a8444?w=600&h=750&fit=crop"
        ]),
        "tags": "women,digital-print,summer",
    },
    {
        "sku": "JJ-LUXURY-003",
        "name": "Junaid Jamshed Luxury Embroidered",
        "slug": "junaid-jamshed-luxury-embroidered",
        "brand": "Junaid Jamshed",
        "category": "Luxury Formal",
        "description": "Luxury embroidered formal collection",
        "selling_price": 12500.0,
        "discount_percentage": 0,
        "total_stock": 20,
        "type": "stitched",
        "piece_type": "3-piece",
        "is_featured": True,
        "status": "active",
        "images": json.dumps([
            "https://images.unsplash.com/photo-1606529957590-dffbdf47e3a1?w=600&h=750&fit=crop"
        ]),
        "tags": "women,luxury,formal,embroidered",
    },
    {
        "sku": "SAYA-CASUAL-004",
        "name": "Saya Casual Lawn Shirt",
        "slug": "saya-casual-lawn-shirt",
        "brand": "Saya",
        "category": "Women Stitched",
        "description": "Comfortable casual stitched lawn shirt",
        "selling_price": 2499.0,
        "discount_percentage": 20,
        "total_stock": 60,
        "type": "stitched",
        "piece_type": "single",
        "status": "active",
        "images": json.dumps([
            "https://images.unsplash.com/photo-1572804419223-0ac36cb5d85f?w=600&h=750&fit=crop"
        ]),
        "tags": "women,casual,stitched",
    },
    {
        "sku": "BRQ-FORMAL-005",
        "name": "Baroque Formal Chiffon Suit",
        "slug": "baroque-formal-chiffon-suit",
        "brand": "Baroque",
        "category": "Luxury Formal",
        "description": "Elegant chiffon formal suit for special occasions",
        "selling_price": 8999.0,
        "discount_percentage": 0,
        "total_stock": 25,
        "type": "stitched",
        "piece_type": "3-piece",
        "is_featured": True,
        "status": "active",
        "images": json.dumps([
            "https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=750&fit=crop"
        ]),
        "tags": "women,formal,chiffon,luxury",
    },
    {
        "sku": "KHD-MEN-006",
        "name": "Khaadi Men Shalwar Kameez",
        "slug": "khaadi-men-shalwar-kameez",
        "brand": "Khaadi",
        "category": "Men Shalwar Kameez",
        "description": "Classic men kurta shalwar in premium cotton",
        "selling_price": 3200.0,
        "discount_percentage": 0,
        "total_stock": 40,
        "type": "stitched",
        "piece_type": "2-piece",
        "status": "active",
        "images": json.dumps([
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"
        ]),
        "tags": "men,shalwar-kameez,cotton",
    },
    {
        "sku": "GA-EMBR-007",
        "name": "Gul Ahmed Embroidered Winter Suit",
        "slug": "gul-ahmed-embroidered-winter-suit",
        "brand": "Gul Ahmed",
        "category": "Women Unstitched",
        "description": "Embroidered khaddar suit for winter",
        "selling_price": 5500.0,
        "discount_percentage": 10,
        "total_stock": 30,
        "type": "unstitched",
        "piece_type": "3-piece",
        "is_bestseller": True,
        "is_new_arrival": True,
        "status": "active",
        "images": json.dumps([
            "https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=600&h=750&fit=crop"
        ]),
        "tags": "women,khaddar,embroidered,winter",
    },
    {
        "sku": "JJ-MEN-008",
        "name": "Junaid Jamshed Men Kurta",
        "slug": "junaid-jamshed-men-kurta",
        "brand": "Junaid Jamshed",
        "category": "Men Shalwar Kameez",
        "description": "Traditional men kurta with fine embroidery",
        "selling_price": 4800.0,
        "discount_percentage": 5,
        "total_stock": 45,
        "type": "stitched",
        "piece_type": "single",
        "is_featured": True,
        "status": "active",
        "images": json.dumps([
            "https://images.unsplash.com/photo-1618932260643-30f82d9a8444?w=600&h=750&fit=crop"
        ]),
        "tags": "men,kurta,embroidery",
    },
]


def seed():
    db = SessionLocal()
    try:
        # ── Check if already seeded ──────────────────────────────────────────
        existing = db.query(Product).count()
        if existing > 0:
            print(f"ℹ️  Database already has {existing} products — skipping seed.")
            return

        print("🌱 Seeding database...")

        # ── Brands ────────────────────────────────────────────────────────────
        brand_map: dict[str, str] = {}  # name → id
        for b in BRANDS:
            exists = db.query(Brand).filter_by(slug=b["slug"]).first()
            if exists:
                brand_map[b["name"]] = exists.id
            else:
                obj = Brand(id=str(uuid.uuid4()), **b)
                db.add(obj)
                db.flush()
                brand_map[b["name"]] = obj.id
                print(f"  + Brand: {b['name']}")

        # ── Categories ────────────────────────────────────────────────────────
        category_map: dict[str, str] = {}  # name → id
        for c in CATEGORIES:
            exists = db.query(Category).filter_by(slug=c["slug"]).first()
            if exists:
                category_map[c["name"]] = exists.id
            else:
                obj = Category(id=str(uuid.uuid4()), **c)
                db.add(obj)
                db.flush()
                category_map[c["name"]] = obj.id
                print(f"  + Category: {c['name']}")

        # ── Products ──────────────────────────────────────────────────────────
        inserted = 0
        for p in PRODUCTS:
            brand_name = p.pop("brand")
            category_name = p.pop("category")

            brand_id = brand_map.get(brand_name)
            category_id = category_map.get(category_name)

            if not brand_id or not category_id:
                print(f"  ⚠️  Skipping {p['sku']}: brand/category not found")
                continue

            obj = Product(
                id=str(uuid.uuid4()),
                brand_id=brand_id,
                category_id=category_id,
                stock_status="in_stock" if p.get("total_stock", 0) > 0 else "out_of_stock",
                **p,
            )
            db.add(obj)
            inserted += 1
            print(f"  + Product: {obj.name}")

        db.commit()
        print(f"\n✅ Seeded {inserted} products successfully!")

    except Exception as e:
        db.rollback()
        print(f"\n❌ Seed failed: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()

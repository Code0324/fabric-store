#!/usr/bin/env python3
"""
Seeding Script: Zellbury Embroidered Unstitched Suits Collection
This script reads the CSV file and imports products into the database.
Usage: python seed_zellbury_embroidery.py
"""

import csv
import json
import re
import sys
from pathlib import Path
from datetime import datetime

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent))

from app.db.session import SessionLocal, engine
from app.db.base import Base
from app.models import Brand, Category, Product
from sqlalchemy.exc import IntegrityError

def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def clean_price(price_str: str) -> float:
    """Clean price string (remove Rs., commas, etc.)."""
    if not price_str:
        return 0.0
    # Remove 'Rs.', commas, and spaces
    cleaned = re.sub(r'[Rs.,\s]', '', str(price_str))
    try:
        return float(cleaned)
    except ValueError:
        return 0.0

def ensure_brand_and_category(db):
    """Ensure brand and category exist, create if not."""
    # Check if "Multi-Brand (Zellbury Style)" exists
    brand = db.query(Brand).filter_by(name="Multi-Brand (Zellbury Style)").first()
    if not brand:
        brand = Brand(
            name="Multi-Brand (Zellbury Style)",
            slug=slugify("Multi-Brand (Zellbury Style)"),
            description="Premium embroidered unstitched collection inspired by Zellbury"
        )
        db.add(brand)
        db.commit()
        print(f"✓ Created brand: {brand.name}")

    # Check if category exists
    category = db.query(Category).filter_by(name="Women's Embroidered Unstitched").first()
    if not category:
        category = Category(
            name="Women's Embroidered Unstitched",
            slug=slugify("Women's Embroidered Unstitched"),
            description="Premium embroidered unstitched lawn suits for women"
        )
        db.add(category)
        db.commit()
        print(f"✓ Created category: {category.name}")

    return brand, category

def seed_products_from_csv(csv_path: str):
    """
    Read CSV file and seed products into the database.

    Args:
        csv_path: Path to the CSV file
    """
    # Verify CSV exists
    csv_file = Path(csv_path)
    if not csv_file.exists():
        print(f"❌ CSV file not found: {csv_path}")
        return False

    # Create tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Ensure brand and category exist
        brand, category = ensure_brand_and_category(db)

        print(f"\n📝 Reading CSV: {csv_path}")
        print("-" * 70)

        inserted_count = 0
        skipped_count = 0
        error_count = 0
        errors = []

        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)

            for row_num, row in enumerate(reader, start=2):  # Start at 2 (header is row 1)
                try:
                    sku = row.get('SKU', '').strip()

                    # Validate SKU
                    if not sku:
                        skipped_count += 1
                        continue

                    # Check if product already exists
                    existing = db.query(Product).filter_by(sku=sku).first()
                    if existing:
                        skipped_count += 1
                        print(f"⊘ Row {row_num}: SKU {sku} already exists (skipped)")
                        continue

                    # Extract and clean data
                    product_name = row.get('Product_Name', '').strip()
                    pieces = row.get('Pieces', '3-piece').strip()
                    selling_price = clean_price(row.get('Discounted_Price', row.get('Listed_Price', 0)))
                    original_price = clean_price(row.get('Original_Price', 0))
                    discount_percent = int(row.get('Discount_Percent', 0) or 0)
                    status_str = row.get('Status', 'In Stock').strip()
                    stock_qty = int(row.get('Stock_Quantity', 0) or 0)
                    description = row.get('Description', '').strip()
                    tags_str = row.get('Tags', '').strip()
                    image_url = row.get('Image_Placeholder', '').strip()

                    # Determine stock status
                    if status_str.lower() == 'sold out':
                        stock_status = 'out_of_stock'
                        stock_qty = 0
                    elif stock_qty <= 10:
                        stock_status = 'low_stock'
                    else:
                        stock_status = 'in_stock'

                    # Generate slug
                    slug = f"{slugify(product_name)}-{sku.lower()}"

                    # Prepare images JSON
                    images_json = json.dumps([image_url]) if image_url else "[]"

                    # Create product
                    product = Product(
                        sku=sku,
                        name=product_name,
                        slug=slug,
                        brand_id=brand.id,
                        category_id=category.id,
                        type="unstitched",
                        piece_type=pieces,
                        description=description,
                        cost_price=original_price if original_price > 0 else None,
                        selling_price=selling_price,
                        discount_percentage=discount_percent,
                        discount_price=selling_price if discount_percent > 0 else None,
                        total_stock=stock_qty,
                        stock_status=stock_status,
                        images=images_json,
                        tags=tags_str,
                        status="active",
                        seo_title=f"{product_name} | Al Imran Fabrics",
                        seo_description=description[:160] if description else "Premium embroidered unstitched lawn suit",
                        seo_keywords=tags_str
                    )

                    db.add(product)
                    db.commit()

                    inserted_count += 1
                    print(f"✓ Row {row_num}: {sku} - {product_name[:40]}... (Rs.{selling_price})")

                except IntegrityError as e:
                    db.rollback()
                    error_count += 1
                    error_msg = f"Row {row_num}: Integrity error - {str(e).split('DETAIL')[0]}"
                    errors.append(error_msg)
                    print(f"❌ {error_msg}")

                except Exception as e:
                    db.rollback()
                    error_count += 1
                    error_msg = f"Row {row_num}: {type(e).__name__} - {str(e)}"
                    errors.append(error_msg)
                    print(f"❌ {error_msg}")

        # Print summary
        print("\n" + "=" * 70)
        print("🎉 SEEDING SUMMARY")
        print("=" * 70)
        print(f"✓ Inserted: {inserted_count} products")
        print(f"⊘ Skipped: {skipped_count} (duplicates)")
        print(f"❌ Errors: {error_count}")
        print(f"📊 Total: {inserted_count + skipped_count + error_count} rows processed")
        print("=" * 70)

        if errors:
            print("\n⚠️  ERRORS ENCOUNTERED:")
            for error in errors[:5]:  # Show first 5 errors
                print(f"  - {error}")
            if len(errors) > 5:
                print(f"  ... and {len(errors) - 5} more errors")

        return True

    except Exception as e:
        print(f"❌ Fatal error: {type(e).__name__} - {str(e)}")
        return False

    finally:
        db.close()

if __name__ == "__main__":
    import os
    from pathlib import Path

    # Default CSV path
    csv_path = Path(__file__).parent / "data" / "zellbury_embroidery.csv"

    # Allow custom CSV path via command line
    if len(sys.argv) > 1:
        csv_path = sys.argv[1]

    print("\n" + "=" * 70)
    print("🧵 AL IMRAN FABRICS - ZELLBURY COLLECTION SEEDER")
    print("=" * 70)
    print(f"📁 CSV Path: {csv_path}")
    print(f"⏰ Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70 + "\n")

    success = seed_products_from_csv(str(csv_path))
    sys.exit(0 if success else 1)

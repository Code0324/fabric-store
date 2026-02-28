"""
Admin endpoints for product management.
Protected routes requiring admin authentication.
"""

import csv
import json
import re
from io import StringIO
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.db.session import get_db
from app.models import Product, Brand, Category
from app.schemas import ProductCreate, ProductResponse

router = APIRouter(prefix="/admin", tags=["admin"])

def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def clean_price(price_str: str) -> float:
    """Clean price string."""
    if not price_str:
        return 0.0
    cleaned = re.sub(r'[Rs.,\s]', '', str(price_str))
    try:
        return float(cleaned)
    except ValueError:
        return 0.0

def get_current_admin_user():
    """
    Dependency to verify admin user.
    TODO: Implement actual JWT/auth verification
    For now, this is a placeholder that can be integrated with your auth system.
    """
    # In production, extract and validate JWT token
    # verify user role == "admin"
    # This is a stub - integrate with your authentication system
    return {"role": "admin"}

@router.post("/import-embroidered-csv/")
async def import_embroidered_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin_user)
):
    """
    Import embroidered products from CSV file.

    CSV columns expected:
    - SKU, Product_Name, Pieces, Listed_Price, Original_Price, Discounted_Price,
      Discount_Percent, Status, Stock_Quantity, Description, Tags, Image_Placeholder

    Returns:
    - inserted_count: Number of products created
    - skipped_count: Number of duplicate products
    - error_count: Number of errors encountered
    - errors: List of error messages
    """

    try:
        # Validate file type
        if not file.filename.endswith('.csv'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only CSV files are supported"
            )

        # Read file content
        content = await file.read()
        csv_content = content.decode('utf-8')
        csv_reader = csv.DictReader(StringIO(csv_content))

        # Ensure brand and category exist
        brand = db.query(Brand).filter_by(name="Multi-Brand (Zellbury Style)").first()
        if not brand:
            brand = Brand(
                name="Multi-Brand (Zellbury Style)",
                slug=slugify("Multi-Brand (Zellbury Style)"),
                description="Premium embroidered unstitched collection inspired by Zellbury"
            )
            db.add(brand)
            db.commit()

        category = db.query(Category).filter_by(name="Women's Embroidered Unstitched").first()
        if not category:
            category = Category(
                name="Women's Embroidered Unstitched",
                slug=slugify("Women's Embroidered Unstitched"),
                description="Premium embroidered unstitched lawn suits for women"
            )
            db.add(category)
            db.commit()

        # Process CSV rows
        inserted_count = 0
        skipped_count = 0
        error_count = 0
        errors = []

        for row in csv_reader:
            try:
                sku = row.get('SKU', '').strip()

                if not sku:
                    skipped_count += 1
                    continue

                # Check for duplicate
                existing = db.query(Product).filter_by(sku=sku).first()
                if existing:
                    skipped_count += 1
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

                # Prepare images
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
                    seo_description=description[:160] if description else "Premium embroidered suit",
                    seo_keywords=tags_str
                )

                db.add(product)
                db.commit()
                inserted_count += 1

            except IntegrityError as e:
                db.rollback()
                error_count += 1
                errors.append(f"SKU {sku}: Duplicate or constraint violation")

            except Exception as e:
                db.rollback()
                error_count += 1
                errors.append(f"SKU {sku}: {str(e)}")

        return {
            "status": "success",
            "inserted_count": inserted_count,
            "skipped_count": skipped_count,
            "error_count": error_count,
            "total_processed": inserted_count + skipped_count + error_count,
            "errors": errors[:10]  # Return first 10 errors
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process file: {str(e)}"
        )

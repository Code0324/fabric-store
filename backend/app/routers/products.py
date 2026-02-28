"""
Product endpoints.
"""

from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import Product
from app.schemas import ProductResponse, ProductListResponse

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/embroidered", response_model=ProductListResponse)
def get_embroidered_products(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    sort: str = Query("newest", enum=["newest", "price-asc", "price-desc"]),
    sold_out: bool = Query(False)
):
    """Get embroidered collection products with filtering and pagination."""

    # Filter by tags containing "embroidered"
    query = db.query(Product).filter(
        Product.tags.like("%embroidered%"),
        Product.status == "active"
    )

    # Filter sold out
    if not sold_out:
        query = query.filter(Product.stock_status != "out_of_stock")

    # Apply sorting
    if sort == "price-asc":
        query = query.order_by(Product.selling_price.asc())
    elif sort == "price-desc":
        query = query.order_by(Product.selling_price.desc())
    else:  # newest
        query = query.order_by(Product.created_at.desc())

    # Get total count before pagination
    total = query.count()

    # Apply pagination
    offset = (page - 1) * limit
    products = query.offset(offset).limit(limit).all()

    return ProductListResponse(
        items=[ProductResponse.from_orm(p) for p in products],
        total=total,
        page=page,
        limit=limit,
        pages=(total + limit - 1) // limit
    )

@router.get("/", response_model=ProductListResponse)
def list_products(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=500),
    sort: str = Query("newest")
):
    """List all active products with pagination."""

    query = db.query(Product).filter(Product.status == "active")

    # Apply sorting
    if sort == "price-asc":
        query = query.order_by(Product.selling_price.asc())
    elif sort == "price-desc":
        query = query.order_by(Product.selling_price.desc())
    else:
        query = query.order_by(Product.created_at.desc())

    total = query.count()
    products = query.offset(skip).limit(limit).all()
    page = (skip // limit) + 1 if limit > 0 else 1

    return ProductListResponse(
        items=[ProductResponse.from_orm(p) for p in products],
        total=total,
        page=page,
        limit=limit,
        pages=(total + limit - 1) // limit
    )

@router.get("/{sku}", response_model=ProductResponse)
def get_product_by_sku(sku: str, db: Session = Depends(get_db)):
    """Get product details by SKU."""
    product = db.query(Product).filter_by(sku=sku).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with SKU {sku} not found"
        )

    return ProductResponse.from_orm(product)

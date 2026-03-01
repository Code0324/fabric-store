"""
Product endpoints.
"""

from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.db.session import get_db
from app.models import Product
from app.schemas import ProductResponse, ProductListResponse

router = APIRouter(prefix="/products", tags=["products"])


def _to_response(product: Product) -> ProductResponse:
    """Convert ORM Product to ProductResponse using from_orm (reads @property aliases)."""
    return ProductResponse.model_validate(product, from_attributes=True)


def _base_query(db: Session):
    """Active products with brand/category eager-loaded."""
    return (
        db.query(Product)
        .options(
            joinedload(Product.brand_rel),
            joinedload(Product.category_rel),
        )
        .filter(Product.status == "active")
    )


@router.get("/embroidered", response_model=ProductListResponse)
def get_embroidered_products(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    sort: str = Query("newest", enum=["newest", "price-asc", "price-desc"]),
    sold_out: bool = Query(False),
):
    """Get embroidered collection products with filtering and pagination."""
    query = _base_query(db).filter(Product.tags.like("%embroidered%"))

    if not sold_out:
        query = query.filter(Product.stock_status != "out_of_stock")

    if sort == "price-asc":
        query = query.order_by(Product.selling_price.asc())
    elif sort == "price-desc":
        query = query.order_by(Product.selling_price.desc())
    else:
        query = query.order_by(Product.created_at.desc())

    total = query.count()
    offset = (page - 1) * limit
    products = query.offset(offset).limit(limit).all()

    return ProductListResponse(
        items=[_to_response(p) for p in products],
        total=total,
        page=page,
        limit=limit,
        pages=(total + limit - 1) // limit,
    )


@router.get("/", response_model=ProductListResponse)
def list_products(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=500),
    sort: str = Query("newest"),
):
    """List all active products with pagination."""
    query = _base_query(db)

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
        items=[_to_response(p) for p in products],
        total=total,
        page=page,
        limit=limit,
        pages=(total + limit - 1) // limit,
    )


@router.get("/{identifier}", response_model=ProductResponse)
def get_product(identifier: str, db: Session = Depends(get_db)):
    """Get product by UUID or SKU."""
    product = (
        db.query(Product)
        .options(
            joinedload(Product.brand_rel),
            joinedload(Product.category_rel),
        )
        .filter(or_(Product.id == identifier, Product.sku == identifier))
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{identifier}' not found",
        )

    return _to_response(product)

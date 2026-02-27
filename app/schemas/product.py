"""Product schemas."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    """Product creation schema."""

    sku: str = Field(..., min_length=1, max_length=100, description="Product SKU")
    name: str = Field(..., min_length=1, max_length=255, description="Product name")
    brand: str = Field(..., min_length=1, max_length=100, description="Brand name")
    category: str = Field(..., min_length=1, max_length=100, description="Category")
    description: Optional[str] = Field(None, description="Product description")
    price: float = Field(..., gt=0, description="Product price")
    compare_price: Optional[float] = Field(None, ge=0, description="Compare price")
    stock: int = Field(default=0, ge=0, description="Stock quantity")
    image: Optional[str] = Field(None, description="Product image URL")
    is_featured: bool = Field(default=False, description="Featured status")
    is_active: bool = Field(default=True, description="Active status")


class ProductUpdate(BaseModel):
    """Product update schema."""

    name: Optional[str] = Field(None, description="Product name")
    description: Optional[str] = Field(None, description="Product description")
    price: Optional[float] = Field(None, gt=0, description="Product price")
    compare_price: Optional[float] = Field(None, ge=0, description="Compare price")
    stock: Optional[int] = Field(None, ge=0, description="Stock quantity")
    image: Optional[str] = Field(None, description="Product image URL")
    is_featured: Optional[bool] = Field(None, description="Featured status")
    is_active: Optional[bool] = Field(None, description="Active status")


class ProductResponse(BaseModel):
    """Product response schema."""

    id: str = Field(..., description="Product ID")
    sku: str = Field(..., description="Product SKU")
    name: str = Field(..., description="Product name")
    brand: str = Field(..., description="Brand name")
    category: str = Field(..., description="Category")
    description: Optional[str] = Field(None, description="Product description")
    price: float = Field(..., description="Product price")
    compare_price: Optional[float] = Field(None, description="Compare price")
    stock: int = Field(..., description="Stock quantity")
    image: Optional[str] = Field(None, description="Product image URL")
    is_featured: bool = Field(..., description="Featured status")
    is_active: bool = Field(..., description="Active status")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

    class Config:
        from_attributes = True


__all__ = ["ProductCreate", "ProductUpdate", "ProductResponse"]

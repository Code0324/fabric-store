"""Product schemas."""
from typing import List, Optional
from pydantic import BaseModel, field_validator, model_validator
from datetime import datetime
import json


class ProductCreate(BaseModel):
    sku: str
    name: str
    description: Optional[str] = None
    selling_price: float
    discount_percentage: int = 0
    total_stock: int = 0


class ProductResponse(BaseModel):
    # Core identity
    id: str
    sku: str
    name: str
    slug: str
    description: Optional[str] = None
    type: str
    piece_type: str

    # Pricing (backend names)
    selling_price: float
    discount_percentage: int
    discount_price: Optional[float] = None

    # Inventory (backend names)
    total_stock: int
    stock_status: str

    # Flags
    is_featured: bool = False
    is_bestseller: bool = False
    is_new_arrival: bool = False

    # Media
    images: Optional[List[str]] = None
    image_url: Optional[str] = None

    # Tags / SEO
    tags: Optional[str] = None
    status: str

    # Timestamps
    created_at: datetime
    updated_at: Optional[datetime] = None

    # ── Normalised frontend fields ──────────────────────────────────────────
    # These are populated by the model_validator from the backend values above
    # or from the ORM property aliases on the Product model.
    price: float = 0.0
    compare_price: Optional[float] = None
    stock: int = 0
    brand: str = ""
    category: str = ""
    is_active: bool = False

    class Config:
        from_attributes = True

    @field_validator("images", mode="before")
    @classmethod
    def parse_images(cls, v):
        if isinstance(v, str):
            try:
                return json.loads(v)
            except (json.JSONDecodeError, TypeError):
                return [v] if v else None
        return v

    @model_validator(mode="after")
    def populate_derived(self):
        # price / stock aliases
        self.price = self.selling_price
        self.stock = self.total_stock

        # is_active from status
        self.is_active = self.status == "active"

        # compare_price: if not set yet and discount > 0, compute original price
        if self.compare_price is None and self.discount_percentage > 0:
            self.compare_price = round(
                self.selling_price / (1 - self.discount_percentage / 100)
            )

        # image_url: fall back to first image in images list
        if not self.image_url and self.images and isinstance(self.images, list):
            self.image_url = self.images[0]

        return self


class ProductListResponse(BaseModel):
    items: List[ProductResponse]
    total: int
    page: int
    limit: int
    pages: int

    class Config:
        from_attributes = True

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
    id: str
    sku: str
    name: str
    slug: str
    description: Optional[str] = None
    type: str
    piece_type: str
    selling_price: float
    discount_percentage: int
    total_stock: int
    stock_status: str
    images: Optional[List[str]] = None
    image_url: Optional[str] = None
    tags: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

    @field_validator('images', mode='before')
    @classmethod
    def parse_images(cls, v):
        if isinstance(v, str):
            try:
                return json.loads(v)
            except (json.JSONDecodeError, TypeError):
                return [v] if v else None
        return v

    @model_validator(mode='after')
    def set_image_url_from_images(self):
        """Set image_url to first image from images array."""
        if not self.image_url and self.images and isinstance(self.images, list) and len(self.images) > 0:
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

"""Product model."""
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
import uuid

from app.db.base import Base

class Product(Base):
    __tablename__ = "products"

    # Primary Key & Identity
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    sku = Column(String(100), nullable=False, unique=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, unique=True, index=True)

    # Classification
    brand_id = Column(String(36), ForeignKey("brands.id"), nullable=False, index=True)
    category_id = Column(String(36), ForeignKey("categories.id"), nullable=False, index=True)

    # Type & Pieces
    type = Column(String(50), nullable=False, default="unstitched")  # stitched, unstitched
    piece_type = Column(String(20), nullable=False, default="3-piece")  # 2-piece, 3-piece, single

    # Description & Content
    description = Column(Text, nullable=True)
    detailed_description = Column(Text, nullable=True)

    # Pricing
    cost_price = Column(Float, nullable=True)
    selling_price = Column(Float, nullable=False)
    discount_percentage = Column(Integer, default=0)  # 0-100
    discount_price = Column(Float, nullable=True)

    # Inventory
    total_stock = Column(Integer, default=0, index=True)
    low_stock_threshold = Column(Integer, default=10)
    stock_status = Column(String(20), default="in_stock", index=True)  # in_stock, low_stock, out_of_stock

    # Metadata & Display
    is_bestseller = Column(Boolean, default=False, index=True)
    is_featured = Column(Boolean, default=False, index=True)
    is_new_arrival = Column(Boolean, default=False, index=True)
    is_limited_edition = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)

    # Status
    status = Column(String(20), default="draft", index=True)  # draft, active, inactive, archived

    # Images (JSON string with URLs)
    images = Column(Text, nullable=True)  # JSON array of image URLs

    # Tags (comma-separated)
    tags = Column(Text, nullable=True)

    # SEO
    seo_title = Column(String(60), nullable=True)
    seo_description = Column(String(160), nullable=True)
    seo_keywords = Column(Text, nullable=True)  # comma-separated

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Product(id={self.id}, sku={self.sku}, name={self.name})>"

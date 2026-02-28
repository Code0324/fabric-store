"""User model for authentication."""
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime
import uuid

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    # Primary Key
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    # Identity
    email = Column(String(255), nullable=False, unique=True, index=True)
    name = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)

    # Authentication
    password_hash = Column(String(255), nullable=False)

    # Authorization
    role = Column(String(20), nullable=False, default="customer")  # customer, admin, staff

    # Status
    is_active = Column(Boolean, default=True, nullable=False)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"

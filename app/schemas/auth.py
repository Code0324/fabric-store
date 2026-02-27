"""Authentication schemas."""
from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    """Login request payload."""

    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=6, description="User password")


class TokenResponse(BaseModel):
    """Token response payload."""

    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field("bearer", description="Token type")


__all__ = ["LoginRequest", "TokenResponse"]

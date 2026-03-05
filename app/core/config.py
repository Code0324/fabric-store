"""Application configuration settings."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # App
    APP_NAME: str = "AL Imran Ecommerce API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # Database
    DATABASE_URL: str

    # JWT
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24

    # API
    API_V1_STR: str = "/api/v1"
    ALLOWED_HOSTS: list[str] = ["*"]

    # WhatsApp
    WHATSAPP_NUMBER: str = "+92300XXXXXXX"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

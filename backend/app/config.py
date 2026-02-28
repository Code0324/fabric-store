import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(env_path)

class Settings:
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./ecommerce.db"
    )

    # JWT
    JWT_SECRET_KEY: str = os.getenv(
        "JWT_SECRET_KEY",
        "your-super-secret-key-change-this-in-production-min-32-chars-12345"
    )
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRATION_HOURS: int = int(os.getenv("JWT_EXPIRATION_HOURS", "24"))

    # Application
    APP_NAME: str = os.getenv("APP_NAME", "AL Imran Ecommerce API")
    APP_VERSION: str = os.getenv("APP_VERSION", "1.0.0")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

    # API
    API_V1_STR: str = os.getenv("API_V1_STR", "/api/v1")

    # WhatsApp
    WHATSAPP_NUMBER: str = os.getenv("WHATSAPP_NUMBER", "+92300XXXXXXX")

settings = Settings()

"""
Al Imran Fabrics - FastAPI Backend
Multi-brand women's fashion e-commerce platform
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import products, admin, orders, auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler.
    Creates all database tables that do not yet exist on startup.
    This is development-friendly; for production use Alembic migrations.
    """
    from app.db.base import Base
    from app.db.session import engine
    # Import all models so their metadata is registered before create_all
    import app.models  # noqa: F401
    Base.metadata.create_all(bind=engine)
    yield


# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="API for Al Imran Fabrics - Pakistani Fashion E-commerce Platform",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(products.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
app.include_router(orders.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Al Imran Fabrics API",
        "version": settings.APP_VERSION,
        "docs": f"{settings.API_V1_STR}/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

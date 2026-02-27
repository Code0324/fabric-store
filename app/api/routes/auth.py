"""Authentication routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session, get_current_user
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.user import UserCreate, UserResponse
from app.services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_create: UserCreate,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> User:
    """
    Register a new user.

    **Request Body:**
    - email: User email address
    - password: User password (min 8 characters)
    - name: User full name
    - role: User role (admin or customer)

    **Response:** Created user object
    """
    return await AuthService.register(user_create, session)


@router.post("/login", response_model=TokenResponse)
async def login(
    login_data: LoginRequest,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> TokenResponse:
    """
    Authenticate user and receive JWT token.

    **Request Body:**
    - email: User email address
    - password: User password

    **Response:** JWT access token
    """
    return await AuthService.login(login_data, session)


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    """
    Get current user profile.

    **Headers:**
    - Authorization: Bearer {token}

    **Response:** Current user object
    """
    return current_user


__all__ = ["router"]

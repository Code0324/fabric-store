"""Authentication service."""
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User, UserRole
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.user import UserCreate
from app.utils.exceptions import InvalidCredentialsException, UserAlreadyExistsException


class AuthService:
    """Authentication service."""

    @staticmethod
    async def register(user_create: UserCreate, session: AsyncSession) -> User:
        """
        Register a new user.

        Args:
            user_create: User creation data
            session: Database session

        Returns:
            Created user

        Raises:
            UserAlreadyExistsException: If email already exists
        """
        # Check if user exists
        result = await session.execute(
            select(User).where(User.email == user_create.email)
        )
        if result.scalar_one_or_none():
            raise UserAlreadyExistsException()

        # Create new user
        user = User(
            id=str(uuid4()),
            email=user_create.email,
            password=hash_password(user_create.password),
            name=user_create.name,
            role=user_create.role,
        )

        session.add(user)
        await session.commit()
        await session.refresh(user)

        return user

    @staticmethod
    async def login(login_data: LoginRequest, session: AsyncSession) -> TokenResponse:
        """
        Authenticate user and return access token.

        Args:
            login_data: Login credentials
            session: Database session

        Returns:
            Token response

        Raises:
            InvalidCredentialsException: If credentials are invalid
        """
        # Find user by email
        result = await session.execute(
            select(User).where(User.email == login_data.email)
        )
        user = result.scalar_one_or_none()

        if not user or not verify_password(login_data.password, user.password):
            raise InvalidCredentialsException()

        # Create access token
        access_token = create_access_token(subject=user.id)

        return TokenResponse(access_token=access_token)


__all__ = ["AuthService"]

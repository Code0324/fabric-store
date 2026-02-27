"""User service."""
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.utils.exceptions import UserNotFoundException


class UserService:
    """User service."""

    @staticmethod
    async def get_user_by_id(user_id: str, session: AsyncSession) -> User:
        """
        Get user by ID.

        Args:
            user_id: User ID
            session: Database session

        Returns:
            User object

        Raises:
            UserNotFoundException: If user not found
        """
        result = await session.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()

        if not user:
            raise UserNotFoundException()

        return user

    @staticmethod
    async def get_user_by_email(email: str, session: AsyncSession) -> User | None:
        """
        Get user by email.

        Args:
            email: User email
            session: Database session

        Returns:
            User object if found, None otherwise
        """
        result = await session.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    @staticmethod
    async def list_users(session: AsyncSession, skip: int = 0, limit: int = 10) -> list[User]:
        """
        List users with pagination.

        Args:
            session: Database session
            skip: Number of records to skip
            limit: Maximum records to return

        Returns:
            List of users
        """
        result = await session.execute(
            select(User).offset(skip).limit(limit)
        )
        return result.scalars().all()


__all__ = ["UserService"]

"""API dependency injection."""
from typing import Annotated

from fastapi import Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_user_id_from_token
from app.db.session import get_session
from app.models.user import User, UserRole
from app.utils.exceptions import UnauthorizedException, PermissionDeniedException
from sqlalchemy import select


async def get_current_user(
    authorization: Annotated[str | None, Header()] = None,
    session: Annotated[AsyncSession, Depends(get_session)] = None,
) -> User:
    """
    Get current authenticated user from JWT token.

    Args:
        authorization: Authorization header with Bearer token
        session: Database session

    Returns:
        Current user object

    Raises:
        UnauthorizedException: If token is invalid or missing
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise UnauthorizedException()

    token = authorization.replace("Bearer ", "")
    user_id = get_user_id_from_token(token)

    if not user_id:
        raise UnauthorizedException()

    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise UnauthorizedException()

    return user


async def get_admin_user(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    """
    Get current admin user.

    Args:
        current_user: Current authenticated user

    Returns:
        Current admin user

    Raises:
        PermissionDeniedException: If user is not admin
    """
    if current_user.role != UserRole.ADMIN:
        raise PermissionDeniedException()

    return current_user


__all__ = ["get_current_user", "get_admin_user", "get_session"]

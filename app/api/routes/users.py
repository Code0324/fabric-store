"""User routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session, get_current_user, get_admin_user
from app.models.user import User
from app.schemas.user import UserResponse
from app.services.user import UserService

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: str,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> User:
    """
    Get user by ID.

    **Path Parameters:**
    - user_id: User ID

    **Response:** User object
    """
    return await UserService.get_user_by_id(user_id, session)


@router.get("", response_model=list[UserResponse])
async def list_users(
    skip: int = 0,
    limit: int = 10,
    admin: Annotated[User, Depends(get_admin_user)] = None,
    session: Annotated[AsyncSession, Depends(get_session)] = None,
) -> list[User]:
    """
    List all users (admin only).

    **Query Parameters:**
    - skip: Number of users to skip
    - limit: Maximum users to return

    **Headers:**
    - Authorization: Bearer {admin_token}

    **Response:** List of users
    """
    return await UserService.list_users(session, skip, limit)


__all__ = ["router"]

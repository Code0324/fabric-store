"""Custom exceptions."""
from fastapi import HTTPException, status


class InvalidCredentialsException(HTTPException):
    """Raised when login credentials are invalid."""

    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


class UserAlreadyExistsException(HTTPException):
    """Raised when user email already exists."""

    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )


class UserNotFoundException(HTTPException):
    """Raised when user is not found."""

    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )


class ProductNotFoundException(HTTPException):
    """Raised when product is not found."""

    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )


class InsufficientStockException(HTTPException):
    """Raised when product stock is insufficient."""

    def __init__(self, product_name: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Insufficient stock for {product_name}",
        )


class OrderNotFoundException(HTTPException):
    """Raised when order is not found."""

    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )


class UnauthorizedException(HTTPException):
    """Raised when user is not authorized."""

    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )


class PermissionDeniedException(HTTPException):
    """Raised when user doesn't have permission."""

    def __init__(self):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )


__all__ = [
    "InvalidCredentialsException",
    "UserAlreadyExistsException",
    "UserNotFoundException",
    "ProductNotFoundException",
    "InsufficientStockException",
    "OrderNotFoundException",
    "UnauthorizedException",
    "PermissionDeniedException",
]

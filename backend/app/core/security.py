"""Security utilities: password hashing and JWT token management."""
from datetime import datetime, timedelta
from typing import Optional

import bcrypt
from jose import JWTError, jwt

from app.config import settings

# ---------------------------------------------------------------------------
# Password hashing  (bcrypt directly - avoids passlib/bcrypt>=4 compat issue)
# ---------------------------------------------------------------------------

def hash_password(plain_password: str) -> str:
    """Hash a plain-text password using bcrypt and return the hash as a str."""
    password_bytes = plain_password.encode("utf-8")
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain-text password against a stored bcrypt hash.
    Returns False (not an exception) if the hash is invalid.
    """
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8"),
        )
    except Exception:
        return False


# ---------------------------------------------------------------------------
# JWT token management
# ---------------------------------------------------------------------------

_EXPIRATION_HOURS = settings.JWT_EXPIRATION_HOURS


def create_access_token(subject: str, role: str = "customer") -> tuple[str, int]:
    """
    Create a signed JWT access token.

    Parameters
    ----------
    subject : str
        The value stored as the token subject (user id).
    role : str
        The user role embedded in the token payload.

    Returns
    -------
    tuple[str, int]
        (encoded_jwt, expires_in_seconds)
    """
    expires_delta = timedelta(hours=_EXPIRATION_HOURS)
    expire = datetime.utcnow() + expires_delta
    payload = {
        "sub": subject,            # subject (user id)
        "role": role,
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "access",
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return token, int(expires_delta.total_seconds())


def decode_access_token(token: str) -> Optional[dict]:
    """
    Decode and validate a JWT token.

    Returns the decoded payload dict on success, or None if invalid/expired.
    """
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
        if payload.get("type") != "access":
            return None
        return payload
    except JWTError:
        return None

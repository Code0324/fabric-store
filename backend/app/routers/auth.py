"""
Authentication endpoints.

POST /auth/register  - register a new user, return user + JWT
POST /auth/login     - authenticate user, return user + JWT
GET  /auth/me        - return the currently authenticated user (requires JWT)
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse, TokenResponse, AuthResponse
from app.core.security import hash_password, verify_password, create_access_token, decode_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

# HTTP Bearer token scheme used for protected endpoints
_bearer_scheme = HTTPBearer(auto_error=False)


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _get_user_by_email(db: Session, email: str) -> User | None:
    """Return a User row by email, or None."""
    return db.query(User).filter(User.email == email.lower()).first()


def _get_user_by_id(db: Session, user_id: str) -> User | None:
    """Return a User row by primary-key id, or None."""
    return db.query(User).filter(User.id == user_id).first()


def _build_auth_response(user: User, token: str, expires_in: int) -> AuthResponse:
    """Build a combined user + token response."""
    return AuthResponse(
        user=UserResponse.model_validate(user),
        token=TokenResponse(
            access_token=token,
            token_type="bearer",
            expires_in=expires_in,
        ),
    )


# ---------------------------------------------------------------------------
# Reusable dependency: resolve JWT -> current User
# ---------------------------------------------------------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    """
    FastAPI dependency that validates the Bearer JWT and returns the
    corresponding User ORM object.

    Raises HTTP 401 if the token is missing, malformed, expired, or the user
    no longer exists / is inactive.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials. Please log in again.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if credentials is None:
        raise credentials_exception

    payload = decode_access_token(credentials.credentials)
    if payload is None:
        raise credentials_exception

    user_id: str = payload.get("sub")
    if not user_id:
        raise credentials_exception

    user = _get_user_by_id(db, user_id)
    if user is None:
        raise credentials_exception

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been deactivated. Please contact support.",
        )

    return user


def get_current_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Dependency that additionally requires the authenticated user to have the
    'admin' role.  Raises HTTP 403 otherwise.
    """
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access required.",
        )
    return current_user


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user account",
)
def register(payload: UserCreate, db: Session = Depends(get_db)) -> AuthResponse:
    """
    Create a new customer account.

    - Validates email format and password strength (handled by Pydantic schema).
    - Returns HTTP 409 if the email address is already registered.
    - Hashes the password with bcrypt before persistence.
    - Returns the new user object together with a signed JWT access token.
    """
    # Normalise email to lowercase for consistent lookup
    email_lower = payload.email.lower()

    # Check for existing account
    if _get_user_by_email(db, email_lower):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"An account with email '{email_lower}' already exists.",
        )

    # Build and persist the user
    user = User(
        email=email_lower,
        name=payload.name.strip(),
        phone=payload.phone,
        password_hash=hash_password(payload.password),
        role="customer",
        is_active=True,
    )

    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"An account with email '{email_lower}' already exists.",
        )
    except Exception as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating your account. Please try again.",
        ) from exc

    token, expires_in = create_access_token(subject=user.id, role=user.role)
    return _build_auth_response(user, token, expires_in)


@router.post(
    "/login",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
    summary="Log in with email and password",
)
def login(payload: UserLogin, db: Session = Depends(get_db)) -> AuthResponse:
    """
    Authenticate an existing user.

    - Returns HTTP 401 for an unrecognised email **or** wrong password.
      (Same message intentionally avoids email-enumeration attacks.)
    - Returns HTTP 403 if the account is deactivated.
    - Returns the user object together with a signed JWT access token on success.
    """
    _invalid_credentials = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user = _get_user_by_email(db, payload.email.lower())

    # Use a constant-time comparison even when user is None to prevent timing attacks
    if user is None:
        # Perform a dummy verify so timing is consistent
        verify_password(payload.password, "$2b$12$dummyhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        raise _invalid_credentials

    if not verify_password(payload.password, user.password_hash):
        raise _invalid_credentials

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been deactivated. Please contact support.",
        )

    token, expires_in = create_access_token(subject=user.id, role=user.role)
    return _build_auth_response(user, token, expires_in)


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Get the currently authenticated user",
)
def get_me(current_user: User = Depends(get_current_user)) -> UserResponse:
    """
    Return the profile of the currently authenticated user.

    Requires a valid Bearer JWT in the Authorization header.
    """
    return UserResponse.model_validate(current_user)

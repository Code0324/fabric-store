# Use official Python runtime as base image
FROM python:3.12-slim

ARG CACHEBUST=1

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install UV
RUN pip install --upgrade pip uv

# Copy project files
COPY pyproject.toml .

# Install dependencies with UV
RUN uv pip install -e . --system

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app

USER appuser

# Run application (Railway injects $PORT at runtime)
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}

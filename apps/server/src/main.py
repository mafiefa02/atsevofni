from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from src.middlewares import rate_limiter

from .configs import settings
from .routers import app_router

app = FastAPI(
    title=f"{settings.app_name}'s Documentation",
    description=f"Welcome to {settings.app_name}'s documentation page!",
    root_path="/api/v1",
)

app.state.limiter = rate_limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(app_router)

import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from src.database import close_db_connection, connect_to_db
from src.middlewares import rate_limiter

from .configs import settings
from .routers import app_router

app = FastAPI(
    title=f"{settings.app_name}'s Documentation",
    description=f"Welcome to {settings.app_name}'s documentation page!",
    root_path="/api/v1",
)
FastAPICache.init(InMemoryBackend())


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


app.state.limiter = rate_limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.on_event("startup")
def startup_event():
    connect_to_db()


@app.on_event("shutdown")
def shutdown_event():
    close_db_connection()


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin,
    allow_credentials=True,
    allow_methods=["GET"],
)

app.include_router(app_router)

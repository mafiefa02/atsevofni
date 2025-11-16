from fastapi import APIRouter

from src.domains.equities.routers import router as equities_router
from src.domains.transactions.routers import router as transactions_router

from .configs import settings

app_router = APIRouter()

app_router.include_router(
    transactions_router,
    prefix="/transactions",
    tags=["transactions"],
)
app_router.include_router(
    equities_router,
    prefix="/equities",
    tags=["equities"],
)


@app_router.get(settings.app_health_check_route)
def health_check():
    """Return the status of the application"""
    return {"status": "ok"}

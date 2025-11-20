import sqlite3
from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi_cache.decorator import cache
from pydantic import StringConstraints

from src.configs import settings
from src.database import get_db_connection
from src.middlewares import rate_limiter
from src.models import CustomResponse, PaginationParams, SortParams
from src.utils import generate_pagination_metadata, get_current_time

from .models import Equity, EquityBase, EquityFilterParams
from .services import EquityService

router = APIRouter()


def get_equity_service(
    db: Annotated[sqlite3.Connection, Depends(get_db_connection)],
) -> EquityService:
    return EquityService(db)


@router.get("", response_model=CustomResponse[List[EquityBase]])
@cache(expire=180)
@rate_limiter.limit(settings.app_rate_limit)
def get_equities(
    request: Request,
    filter_params: Annotated[EquityFilterParams, Depends()],
    pagination_params: Annotated[PaginationParams, Depends()],
    sorting_params: Annotated[SortParams, Depends()],
    service: Annotated[EquityService, Depends(get_equity_service)],
):
    """Get all equities"""
    return service.list_equities(filter_params, pagination_params, sorting_params)


@router.get("/{id}", response_model=CustomResponse[Equity])
@cache(expire=180)
@rate_limiter.limit(settings.app_rate_limit)
def get_equity_by_portid(
    request: Request,
    id: Annotated[str, StringConstraints(to_upper=True)],
    service: Annotated[EquityService, Depends(get_equity_service)],
):
    """Get detailed equity information by its id"""
    equity = service.get_equity_by_id(id)

    if not equity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Equity with id '{id}' not found.",
        )

    meta = {
        "pagination": generate_pagination_metadata(1, None),
        "last_updated": get_current_time(),
    }

    return {"data": equity, "meta": meta}

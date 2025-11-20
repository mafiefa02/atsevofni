import sqlite3
from typing import Annotated, List

from fastapi import APIRouter, Depends, Query, Request
from fastapi_cache.decorator import cache

from src.configs import settings
from src.database import get_db_connection
from src.domains.transactions.constants import DEFAULT_SORT
from src.middlewares import rate_limiter
from src.models import CustomResponse, PaginationParams, SortParams
from src.utils import (
    apply_sorting_and_pagination,
    generate_pagination_metadata,
    get_current_time,
    get_total_items,
    read_query,
)

from .models import Price, PriceFilterParams
from .utils import apply_filtering

router = APIRouter()


@router.get("", response_model=CustomResponse[List[Price]])
@cache(expire=180)
@rate_limiter.limit(settings.app_rate_limit)
def get_stocks(
    request: Request,
    filter_params: Annotated[PriceFilterParams, Query()],
    pagination_params: Annotated[PaginationParams, Depends()],
    sorting_params: Annotated[SortParams, Depends()],
    db: Annotated[sqlite3.Connection, Depends(get_db_connection)],
):
    """Get all stock prices"""
    if sorting_params.sort_by is None:
        sorting_params.sort_by = DEFAULT_SORT

    cursor = db.cursor()

    base_query = read_query("get_transactions.sql")
    filtered_query, params = apply_filtering(base_query, filter_params)

    total_items = get_total_items(cursor, filtered_query, params)

    final_query, final_params = apply_sorting_and_pagination(
        filtered_query, params, sorting_params, pagination_params
    )

    cursor.execute(final_query, final_params)
    transactions = [dict(row) for row in cursor.fetchall()]

    meta = {
        "pagination": generate_pagination_metadata(total_items, pagination_params),
        "last_updated": get_current_time(),
    }

    return {
        "data": transactions,
        "meta": meta,
    }

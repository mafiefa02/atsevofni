from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import StringConstraints

from src.configs import settings
from src.database import get_db_connection
from src.middlewares import rate_limiter
from src.models import PaginationParams, Response, SortParams
from src.utils import (
    apply_sorting_and_pagination,
    generate_pagination_metadata,
    get_total_items,
    read_query,
)

from .models import Equity, EquityBase, EquityFilterParams
from .utils import apply_filtering

router = APIRouter()


@router.get("", response_model=Response[List[EquityBase]])
@rate_limiter.limit(settings.app_rate_limit)
def get_equities(
    request: Request,
    filter_params: Annotated[EquityFilterParams, Depends()],
    pagination_params: Annotated[PaginationParams, Depends()],
    sorting_params: Annotated[SortParams, Depends()],
):
    """Get all equities"""
    conn = get_db_connection()
    cursor = conn.cursor()

    base_query = read_query("get_equities.sql")
    filtered_query, params = apply_filtering(base_query, filter_params)

    total_items = get_total_items(cursor, filtered_query, params)

    final_query, final_params = apply_sorting_and_pagination(
        filtered_query, params, sorting_params, pagination_params
    )

    cursor.execute(final_query, final_params)
    equities = [dict(row) for row in cursor.fetchall()]
    conn.close()

    meta = {"pagination": generate_pagination_metadata(total_items, pagination_params)}

    return {"data": equities, "meta": meta}


@router.get("/{id}", response_model=Response[Equity])
@rate_limiter.limit(settings.app_rate_limit)
def get_equity_by_portid(
    request: Request,
    id: Annotated[str, StringConstraints(to_upper=True)],
    pagination_params: Annotated[PaginationParams, Depends()],
):
    """Get detailed equity information by its id"""
    conn = get_db_connection()
    cursor = conn.cursor()

    query = read_query("get_equity_by_id.sql")
    cursor.execute(query, (id,))
    equity = cursor.fetchone()
    conn.close()

    if not equity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Equity with id '{id}' not found.",
        )

    meta = {"pagination": generate_pagination_metadata(1, None)}

    return {"data": dict(equity), "meta": meta}

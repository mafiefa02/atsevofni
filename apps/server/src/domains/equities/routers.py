from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from pydantic import StringConstraints

from src.configs import settings
from src.constants import ExceptionMessages
from src.loaders import df_equities
from src.middlewares import rate_limiter
from src.models import PaginationParams, Response, SortParams
from src.utils import (
    get_paginated_data,
    get_response_meta,
    sort_data,
)

from .models import Equity, EquityFilterParams
from .utils import filter_data

router = APIRouter()


@router.get("", response_model=Response[List[Equity]])
@rate_limiter.limit(settings.app_rate_limit)
def get_equities(
    request: Request,
    filter_params: Annotated[EquityFilterParams, Query()],
    pagination_params: Annotated[PaginationParams, Depends()],
    sorting_params: Annotated[SortParams, Depends()],
):
    """Get all equities"""
    data = df_equities

    if data is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ExceptionMessages.DATA_LOADING_FAILED,
        )

    data = filter_data(data, filter_params)
    data = sort_data(data, sorting_params)

    returned_data = get_paginated_data(data, pagination_params).to_dict("records")

    return {
        "data": returned_data,
        "meta": get_response_meta(data, pagination_params=pagination_params),
    }


@router.get("/{portid}", response_model=Response[Equity])
@rate_limiter.limit(settings.app_rate_limit)
def get_equity_by_portid(
    request: Request, portid: Annotated[str, StringConstraints(to_upper=True)]
):
    """Get detailed equity information by its portid"""
    data = df_equities

    if data is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ExceptionMessages.DATA_LOADING_FAILED,
        )

    data = data[data["portid"] == portid]
    returned_data = data.to_dict("records")

    if not returned_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Equity with portid '{portid}' not found.",
        )

    return {
        "data": returned_data[0],
        "meta": get_response_meta(data),
    }

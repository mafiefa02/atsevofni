from typing import Annotated, List

import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status

from src.configs import settings
from src.constants import ExceptionMessages
from src.loaders import df_equities, df_price_history
from src.middlewares import rate_limiter
from src.models import PaginationParams, Response, SortParams
from src.utils import get_paginated_data, get_response_meta, sort_data

from .models import Price, PriceFilterParams
from .utils import filter_data

router = APIRouter()


@router.get("", response_model=Response[List[Price]])
@rate_limiter.limit(settings.app_rate_limit)
def get_stocks(
    request: Request,
    filter_params: Annotated[PriceFilterParams, Query()],
    pagination_params: Annotated[PaginationParams, Depends()],
    sorting_params: Annotated[SortParams, Depends()],
):
    """Get all stock prices"""
    data = pd.merge(df_price_history, df_equities, on="portid")

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

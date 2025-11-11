import math
from typing import Any, Dict, List, Optional, Union

import pandas as pd

from .models import PaginationParams, ResponseMeta, SortParams


def load_csv_data(
    filepath: str, parse_dates: Optional[List[str]] = None
) -> Optional[pd.DataFrame]:
    """Load respective data from a CSV file into a pandas DataFrame."""
    try:
        df = pd.read_csv(filepath, parse_dates=parse_dates)
        return df
    except FileNotFoundError:
        print(f"Error: File not found at {filepath}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def generate_pagination_metadata(
    data: Optional[Any],
    pagination_params: Optional[PaginationParams] = None,
) -> Dict[str, int]:
    """Generate metadata for pagination."""
    if data is None:
        return {"total_items": 0, "total_pages": 1}

    total_items = len(data) if isinstance(data, Union[pd.DataFrame, List]) else 1
    total_pages = (
        math.ceil(total_items / pagination_params.limit)
        if pagination_params is not None and total_items != 0
        else 1
    )

    return {"total_items": total_items, "total_pages": total_pages}


def get_paginated_data(
    dataframe: pd.DataFrame, pagination_params: PaginationParams
) -> pd.DataFrame:
    """Return paginated data for a certain page and limit."""
    skip = (pagination_params.page - 1) * pagination_params.limit
    data = dataframe.iloc[skip : skip + pagination_params.limit]

    return data


def sort_data(dataframe: pd.DataFrame, sort: SortParams) -> pd.DataFrame:
    """Sort a pandas DataFrame based on SortParams."""
    if sort.sort_by:
        return dataframe.sort_values(
            by=sort.sort_by, ascending=sort.order == "asc", inplace=False
        )
    return dataframe


def get_response_meta(
    data: Optional[Any], pagination_params: Optional[PaginationParams] = None
) -> ResponseMeta:
    pagination_meta = generate_pagination_metadata(data, pagination_params)
    return {
        "pagination": pagination_params,
        **pagination_meta,
    }

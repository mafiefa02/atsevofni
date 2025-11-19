import math
from datetime import datetime
from typing import Optional

from src.models import PaginationMeta, PaginationParams, SortParams


def read_query(filename: str) -> str:
    if not filename.endswith(".sql"):
        raise ValueError("Please point to the .sql file query!")
    with open(f"sql/query/{filename}", "r") as f:
        return f.read()


def generate_pagination_metadata(
    total_items: int, params: Optional[PaginationParams]
) -> PaginationMeta:
    """Generate metadata for pagination."""
    if params is None or not params.enable_pagination:
        return None
    total_pages = math.ceil(total_items / params.limit) if total_items > 0 else 1
    return {"params": params, "total_items": total_items, "total_pages": total_pages}


def get_total_items(cursor, filtered_query: str, params: list) -> int:
    count_query = "SELECT COUNT(*) FROM ({})".format(filtered_query)
    cursor.execute(count_query, params)
    return cursor.fetchone()[0]


def apply_sorting_and_pagination(
    base_query: str,
    params: list,
    sorting_params: SortParams,
    pagination_params: PaginationParams,
) -> tuple[str, list]:
    if sorting_params.sort_by:
        base_query += f" ORDER BY {sorting_params.sort_by} {sorting_params.order}"

    if pagination_params.enable_pagination:
        base_query += " LIMIT ? OFFSET ?"
        params.extend(
            [
                pagination_params.limit,
                (pagination_params.page - 1) * pagination_params.limit,
            ]
        )
    return base_query, params


def get_current_time():
    return datetime.now()

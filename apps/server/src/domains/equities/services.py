import sqlite3
from typing import Any, Dict, Optional

from src.models import PaginationParams, SortParams
from src.utils import (
    apply_sorting_and_pagination,
    generate_pagination_metadata,
    get_current_time,
    get_total_items,
    read_query,
)

from .models import EquityFilterParams


class EquityService:
    def __init__(self, db: sqlite3.Connection):
        self.db = db

    def _apply_filtering(
        self, base_query: str, filter_params: EquityFilterParams
    ) -> tuple[str, list]:
        params = []
        conditions = []

        if filter_params.search:
            conditions.append("(e.name LIKE ? OR e.id LIKE ?)")
            params.extend([f"%{filter_params.search}%", f"%{filter_params.search}%"])

        if filter_params.sector:
            conditions.append("(es.name LIKE ? OR es.code LIKE ?)")
            params.extend([f"%{filter_params.sector}%", f"%{filter_params.sector}%"])

        if filter_params.subsector:
            conditions.append("(ess.name LIKE ? OR ess.code LIKE ?)")
            params.extend(
                [f"%{filter_params.subsector}%", f"%{filter_params.subsector}%"]
            )

        if conditions:
            base_query += " WHERE " + " AND ".join(conditions)

        return base_query, params

    def list_equities(
        self,
        filter_params: EquityFilterParams,
        pagination_params: PaginationParams,
        sorting_params: SortParams,
    ) -> Dict[str, Any]:
        """Fetches paginated equity listing."""
        cursor = self.db.cursor()

        base_query = read_query("get_equities.sql")
        filtered_query, params = self._apply_filtering(base_query, filter_params)

        total_items = get_total_items(cursor, filtered_query, params)

        final_query, final_params = apply_sorting_and_pagination(
            filtered_query, params, sorting_params, pagination_params
        )

        cursor.execute(final_query, final_params)
        equities = [dict(row) for row in cursor.fetchall()]

        meta = {
            "pagination": generate_pagination_metadata(total_items, pagination_params),
            "last_updated": get_current_time(),
        }

        return {"data": equities, "meta": meta}

    def get_equity_by_id(self, equity_id: str) -> Optional[Dict[str, Any]]:
        """Fetches a single equity by ID. Returns None if not found."""
        cursor = self.db.cursor()
        query = read_query("get_equity_by_id.sql")

        cursor.execute(query, (equity_id,))
        row = cursor.fetchone()

        return dict(row) if row else None

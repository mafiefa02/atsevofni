import sqlite3
from typing import Any, Dict, List

from src.models import PaginationParams, SortParams
from src.utils import (
    apply_sorting_and_pagination,
    generate_pagination_metadata,
    get_current_time,
    get_total_items,
    read_query,
)

from .constants import SORT_MAPPING
from .models import GeneratePDFRequest, PriceFilterParams


class TransactionService:
    def __init__(self, db: sqlite3.Connection):
        self.db = db

    def _apply_filtering(
        self, base_query: str, filter_params: PriceFilterParams
    ) -> tuple[str, list]:
        params = []
        conditions = []

        needs_joins = any([filter_params.sector, filter_params.subsector])

        if needs_joins:
            base_query += """
            JOIN "Equity" e ON t."equityId" = e.id
            LEFT JOIN "EquitySector" es ON e."sectorId" = es.id
            LEFT JOIN "EquitySubsector" ess ON e."subsectorId" = ess.id
            """

        if filter_params.equities:
            placeholders = ",".join("?" for _ in filter_params.equities)
            conditions.append(f't."equityId" IN ({placeholders})')
            params.extend(filter_params.equities)

        if filter_params.sector:
            conditions.append("es.code = ?")
            params.append(filter_params.sector)

        if filter_params.subsector:
            conditions.append("ess.code = ?")
            params.append(filter_params.subsector)

        if filter_params.start_date:
            conditions.append("t.tradeDate >= ?")
            params.append(str(filter_params.start_date))

        if filter_params.end_date:
            conditions.append("t.tradeDate <= ?")
            params.append(str(filter_params.end_date))

        if conditions:
            base_query += " WHERE " + " AND ".join(conditions)

        return base_query, params

    def list_stocks(
        self,
        filter_params: PriceFilterParams,
        pagination_params: PaginationParams,
        sorting_params: SortParams,
    ) -> Dict[str, Any]:
        """Fetches paginated stock data and generates metadata."""
        cursor = self.db.cursor()
        base_query = read_query("get_transactions.sql")

        filtered_query, params = self._apply_filtering(base_query, filter_params)
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

        return {"data": transactions, "meta": meta}

    def get_report_data(self, payload: GeneratePDFRequest) -> List[Dict[str, Any]]:
        """Fetches raw data for PDF generation."""
        sort_column = SORT_MAPPING.get(payload.sort.sort_by, "tradeDate")
        cursor = self.db.cursor()

        base_query = read_query("get_transactions.sql")
        filtered_query, params = self._apply_filtering(base_query, payload.filters)

        sort_clause = (
            f" ORDER BY equityId ASC, {sort_column} {payload.sort.order.upper()}"
        )
        final_query = filtered_query + sort_clause

        cursor.execute(final_query, params)
        return [dict(row) for row in cursor.fetchall()]

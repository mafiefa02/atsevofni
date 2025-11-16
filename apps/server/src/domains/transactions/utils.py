from .models import PriceFilterParams


def apply_filtering(
    base_query: str, filter_params: PriceFilterParams
) -> tuple[str, list]:
    params = []
    conditions = []

    if filter_params.portids:
        placeholders = ",".join("?" for _ in filter_params.portids)
        conditions.append(f"e.id IN ({placeholders})")
        params.extend(filter_params.portids)

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

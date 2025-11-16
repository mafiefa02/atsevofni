from .models import EquityFilterParams


def apply_filtering(
    base_query: str, filter_params: EquityFilterParams
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
        params.extend([f"%{filter_params.subsector}%", f"%{filter_params.subsector}%"])

    if conditions:
        base_query += " WHERE " + " AND ".join(conditions)

    return base_query, params

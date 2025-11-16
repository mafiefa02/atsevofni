from .models import PriceFilterParams


def apply_filtering(
    base_query: str, filter_params: PriceFilterParams
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

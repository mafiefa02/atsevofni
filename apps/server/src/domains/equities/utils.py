import pandas as pd

from .models import EquityFilterParams


def filter_data(df: pd.DataFrame, filters: EquityFilterParams) -> pd.DataFrame:
    """Filter equities data based on search (portid and portname), sector, and subsector."""
    if filters.search:
        df = df[
            df["portname"].str.contains(filters.search, case=False)
            | df["portid"].str.contains(filters.search, case=False)
        ]

    if filters.sector:
        df = df[df["sector"] == filters.sector]

    if filters.subsector:
        df = df[df["subsector"] == filters.subsector]

    return df

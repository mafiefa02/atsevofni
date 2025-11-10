import pandas as pd

from .models import PriceFilterParams


def filter_data(
    data: pd.DataFrame,
    filters: PriceFilterParams,
) -> pd.DataFrame:
    if filters.portids:
        data = data[data["portid"].isin(filters.portids)]

    if filters.sector:
        data = data[data["sector"] == filters.sector]

    if filters.subsector:
        data = data[data["subsector"] == filters.subsector]

    if filters.latest:
        data = data.loc[data.groupby("portid")["portdate"].idxmax()]
    else:
        if filters.start_date:
            data = data[data["portdate"] >= pd.to_datetime(filters.start_date)]

        if filters.end_date:
            data = data[data["portdate"] <= pd.to_datetime(filters.end_date)]

    return data

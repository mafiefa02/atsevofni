from .utils import load_csv_data

df_price_history = load_csv_data("data/price-history.csv", parse_dates=["portdate"])
df_equities = load_csv_data("data/equities.csv", parse_dates=["listeddate"])

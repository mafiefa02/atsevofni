DEFAULT_SORT = "tradeDate"

SORT_MAPPING = {
    "ticker": "equityId",
    "date": "tradeDate",
    "opening": "opening",
    "high": "high",
    "low": "low",
    "closing": "closing",
    "bid": "bid",
    "offer": "offer",
    "volume": "volume",
}

# (display name, DB column key, width weight)
PDF_COLUMNS = [
    ("Date", "tradeDate", 2),
    ("Opening", "opening", 2.2),
    ("High", "high", 2.2),
    ("Low", "low", 2.2),
    ("Closing", "closing", 2.2),
    ("Bid", "bid", 2.2),
    ("Offer", "offer", 2.2),
    ("Volume", "volume", 2.5),
]

PDF_PRICE_COLS = {"bid", "closing", "high", "low", "offer", "opening"}
PDF_VOLUME_COLS = {"volume"}

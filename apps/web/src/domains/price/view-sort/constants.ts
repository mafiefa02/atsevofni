import type { SortOrder } from "-/lib/types";

import type { PriceResponse } from "../types";
import type { PriceSortKey } from "./types";

export const priceSortKeyToParamMap: Record<PriceSortKey, keyof PriceResponse> =
  {
    no: "txtno",
    equityId: "portid",
    date: "portdate",
    bid: "bid",
    closing: "closing",
    high: "high",
    low: "low",
    offer: "offer",
    opening: "opening",
    values: "values",
    volume: "volume",
  };

export const priceSortKeyToLabel: Record<PriceSortKey, string> = {
  no: "Number",
  equityId: "Equity ID",
  date: "Date",
  bid: "Bid",
  closing: "Closing",
  high: "High",
  low: "Low",
  offer: "Offer",
  opening: "Opening",
  values: "Values",
  volume: "Volume",
};

export const VALID_SORT_KEYS = new Set(Object.keys(priceSortKeyToLabel));

export const sortKeyOrderLabel: Record<
  PriceSortKey,
  Record<SortOrder, string>
> = {
  no: { asc: "Low to high", desc: "High to low" },
  equityId: { asc: "Ascending", desc: "Descending" },
  date: { asc: "Earliest to latest", desc: "Latest to earliest" },
  bid: { asc: "Low to high", desc: "High to low" },
  closing: { asc: "Low to high", desc: "High to low" },
  high: { asc: "Low to high", desc: "High to low" },
  low: { asc: "Low to high", desc: "High to low" },
  offer: { asc: "Low to high", desc: "High to low" },
  opening: { asc: "Low to high", desc: "High to low" },
  values: { asc: "Low to high", desc: "High to low" },
  volume: { asc: "Low to high", desc: "High to low" },
};

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

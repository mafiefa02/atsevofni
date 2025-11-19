import type { Currency, FormattableDate, Quantity } from "-/lib/models";
import type { Params, PriceEquityId } from "-/lib/types";

import type { PriceFilter } from "./views/filters/types";
import type { PriceSortKey } from "./views/sort/types";

export interface PriceResponse {
  equityId: string;
  tradeDate: string;
  opening: number;
  high: number;
  low: number;
  closing: number;
  bid: number;
  offer: number;
  volume: number;
}

export interface Price {
  equityId: PriceEquityId;
  date: FormattableDate;
  opening: Currency;
  high: Currency;
  low: Currency;
  closing: Currency;
  bid: Currency;
  offer: Currency;
  volume: Quantity;
}

export type PriceParams = Params<PriceFilter, PriceSortKey>;

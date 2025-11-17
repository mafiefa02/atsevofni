import type { FormattableDate, FormattableNumber } from "-/lib/models";
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
  opening: FormattableNumber;
  high: FormattableNumber;
  low: FormattableNumber;
  closing: FormattableNumber;
  bid: FormattableNumber;
  offer: FormattableNumber;
  volume: FormattableNumber;
}

export type PriceParams = Params<PriceFilter, PriceSortKey>;

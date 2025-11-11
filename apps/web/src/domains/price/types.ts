import type { FormattableDate, FormattableNumber } from "-/lib/models";
import type { PriceEquityId, UniqueBrand } from "-/lib/types";

export interface PriceResponse {
  txtno: number;
  portid: string;
  portdate: string;
  opening: number;
  high: number;
  low: number;
  closing: number;
  bid: number;
  offer: number;
  volume: number;
  values: number;
}

type PriceNo = UniqueBrand<number>;
export interface Price {
  no: PriceNo;
  equityId: PriceEquityId;
  date: FormattableDate;
  opening: FormattableNumber;
  high: FormattableNumber;
  low: FormattableNumber;
  closing: FormattableNumber;
  bid: FormattableNumber;
  offer: FormattableNumber;
  volume: FormattableNumber;
  values: FormattableNumber;
}

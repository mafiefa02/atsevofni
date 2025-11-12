import { parse } from "date-fns";

import { FormattableDate, FormattableNumber } from "-/lib/models";

import type { Price, PriceResponse } from "./types";

export const priceResponseToPrice = (response: PriceResponse): Price => {
  return {
    no: response.txtno,
    equityId: response.portid,
    date: new FormattableDate(
      parse(response.portdate, "yyyy-MM-dd", new Date()),
    ),
    bid: new FormattableNumber(response.bid),
    closing: new FormattableNumber(response.closing),
    high: new FormattableNumber(response.high),
    low: new FormattableNumber(response.low),
    offer: new FormattableNumber(response.offer),
    opening: new FormattableNumber(response.opening),
    values: new FormattableNumber(response.values),
    volume: new FormattableNumber(response.volume),
  } as Price;
};

export const priceToPriceResponse = (price: Price): PriceResponse => {
  return {
    txtno: price.no,
    portid: price.equityId,
    portdate: price.date.format(),
    bid: price.bid.valueOf(),
    closing: price.closing.valueOf(),
    high: price.high.valueOf(),
    low: price.low.valueOf(),
    offer: price.offer.valueOf(),
    opening: price.opening.valueOf(),
    values: price.values.valueOf(),
    volume: price.volume.valueOf(),
  } as PriceResponse;
};

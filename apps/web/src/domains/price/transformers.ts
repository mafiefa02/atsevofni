import { parse } from "date-fns";

import { Currency, FormattableDate, Quantity } from "-/lib/models";

import type { Price, PriceResponse } from "./types";

export const priceResponseToPrice = (response: PriceResponse): Price => {
  return {
    equityId: response.equityId,
    date: new FormattableDate(
      parse(response.tradeDate, "yyyy-MM-dd", new Date()),
    ),
    bid: new Currency(response.bid),
    closing: new Currency(response.closing),
    high: new Currency(response.high),
    low: new Currency(response.low),
    offer: new Currency(response.offer),
    opening: new Currency(response.opening),
    volume: new Quantity(response.volume),
  } as Price;
};

export const priceToPriceResponse = (price: Price): PriceResponse => {
  return {
    equityId: price.equityId,
    tradeDate: price.date.format(),
    bid: price.bid.valueOf(),
    closing: price.closing.valueOf(),
    high: price.high.valueOf(),
    low: price.low.valueOf(),
    offer: price.offer.valueOf(),
    opening: price.opening.valueOf(),
    volume: price.volume.valueOf(),
  } as PriceResponse;
};

import { parse } from "date-fns";

import { FormattableDate, FormattableNumber } from "-/lib/models";

import type { Price, PriceFilter, PriceResponse } from "./types";

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

export const priceFiltersToFilterParam = (
  filters: PriceFilter,
): Record<string, string | string[]> => {
  const queryParams: Record<string, string | string[]> = {};

  if (filters.ids && filters.ids.length > 0) {
    queryParams.portids = filters.ids;
  }

  if (filters.sector) {
    queryParams.sector = filters.sector;
  }

  if (filters.subsector) {
    queryParams.subsector = filters.subsector;
  }

  if (typeof filters.latest === "boolean") {
    queryParams.latest = String(filters.latest);
  }

  if (filters.startDate) {
    queryParams.start_date = filters.startDate.format();
  }

  if (filters.endDate) {
    queryParams.end_date = filters.endDate.format();
  }

  return queryParams;
};

import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

import { parseAsFormattableDate, parseAsSetOf } from "-/lib/utils";

import type { PriceFilter } from "./types";

export const filterQueryStates = {
  equities: parseAsSetOf(parseAsString),
  equitySector: parseAsString,
  equitySubsector: parseAsString,
  startDate: parseAsFormattableDate,
  endDate: parseAsFormattableDate,
  latest: parseAsBoolean,
} satisfies Record<keyof PriceFilter, unknown>;

export const usePriceViewFilters = () =>
  useQueryStates(filterQueryStates, { history: "replace" });

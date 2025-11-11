import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  useQueryStates,
} from "nuqs";

import { parseAsFormattableDate } from "-/lib/utils";

import type { PriceFilter } from "./types";

export const filterQueryStates = {
  equities: parseAsArrayOf(parseAsString),
  equitySector: parseAsString,
  equitySubsector: parseAsString,
  startDate: parseAsFormattableDate,
  endDate: parseAsFormattableDate,
  latest: parseAsBoolean,
} satisfies Record<keyof PriceFilter, unknown>;

export const usePriceViewFilters = () =>
  useQueryStates(filterQueryStates, { history: "replace" });

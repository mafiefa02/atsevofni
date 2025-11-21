import {
  type UseQueryStateOptions,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { createContext, useCallback, useContext } from "react";

import { parseAsFormattableDate } from "-/lib/utils";

import type { PriceFilter } from "./types";

const filterQueryStates = {
  equities: parseAsArrayOf(parseAsString),
  equitySector: parseAsString,
  equitySubsector: parseAsString,
  startDate: parseAsFormattableDate,
  endDate: parseAsFormattableDate,
  latest: parseAsBoolean,
} satisfies Record<keyof PriceFilter, unknown>;

type PriceFilterSetter = (
  updater:
    | Partial<PriceFilter>
    | null
    | ((prev: PriceFilter) => Partial<PriceFilter> | null),
) => void;

export const PriceFilterLocalContext = createContext<
  [PriceFilter, PriceFilterSetter] | null
>(null);

export const useSetFiltersAdapter = (
  setFilters: React.Dispatch<React.SetStateAction<PriceFilter>>,
) =>
  useCallback(
    (
      updater:
        | Partial<PriceFilter>
        | null
        | ((prev: PriceFilter) => Partial<PriceFilter> | null),
    ) => {
      setFilters((prev) => {
        const newValues =
          typeof updater === "function" ? updater(prev) : updater;

        if (newValues === null) return prev;

        return { ...prev, ...newValues };
      });
    },
    [setFilters],
  );

export const usePriceViewFilters = (
  limitUrlUpdates?: UseQueryStateOptions<PriceFilter>["limitUrlUpdates"],
) => {
  const localContext = useContext(PriceFilterLocalContext);

  const urlState = useQueryStates(filterQueryStates, {
    history: "replace",
    limitUrlUpdates,
  });

  if (localContext) return localContext;

  return urlState;
};

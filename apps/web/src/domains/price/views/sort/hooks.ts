import { useQueryClient } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryStates } from "nuqs";
import { createContext, useCallback, useContext } from "react";

import { DEFAULT_SORT_ORDER } from "-/lib/constants";
import { useHoverDelayedTrigger } from "-/lib/hooks";
import { services } from "-/lib/services";
import type { SortParams } from "-/lib/types";

import { usePriceViewFilters } from "../filters/hooks";
import { usePriceViewPagination } from "../pagination/hooks";
import { priceSortKeyToLabel } from "./constants";
import type { PriceSortKey } from "./types";

const sortQueryStates = {
  sortBy: parseAsStringLiteral<PriceSortKey>(
    Object.keys(priceSortKeyToLabel) as PriceSortKey[],
  ),
  order: parseAsStringLiteral(["asc", "desc"]).withDefault(DEFAULT_SORT_ORDER),
} satisfies Record<keyof SortParams<PriceSortKey>, unknown>;

type PriceSortSetter = (
  updater:
    | Partial<SortParams<PriceSortKey>>
    | null
    | ((
        prev: SortParams<PriceSortKey>,
      ) => Partial<SortParams<PriceSortKey>> | null),
) => void;

export const PriceSortLocalContext = createContext<
  [SortParams<PriceSortKey>, PriceSortSetter] | null
>(null);

export const useSetSortAdapter = (
  setSort: React.Dispatch<React.SetStateAction<SortParams<PriceSortKey>>>,
) =>
  useCallback(
    (
      updater:
        | Partial<SortParams<PriceSortKey>>
        | null
        | ((
            prev: SortParams<PriceSortKey>,
          ) => Partial<SortParams<PriceSortKey>> | null),
    ) => {
      setSort((prev) => {
        const newValues =
          typeof updater === "function" ? updater(prev) : updater;
        return { ...prev, ...newValues };
      });
    },
    [setSort],
  );

export const usePriceViewSort = () => {
  const localContext = useContext(PriceSortLocalContext);

  const urlState = useQueryStates(sortQueryStates, {
    history: "replace",
  });

  if (localContext) return localContext;

  return urlState;
};

interface UsePrefetchSortProps {
  options?: {
    delayMs?: number;
  };
}

export const usePrefetchSort = ({
  options = { delayMs: 100 },
}: UsePrefetchSortProps = {}) => {
  const queryClient = useQueryClient();
  const [filters] = usePriceViewFilters();
  const [pagination] = usePriceViewPagination();
  const [sort] = usePriceViewSort();

  const prefetchAction = useCallback(
    (params: Partial<SortParams<PriceSortKey>>) => {
      const queryOptions = services.price.query.getAllPrices({
        filters,
        pagination,
        sort: { ...sort, ...params },
      });
      queryClient.prefetchQuery(queryOptions);
    },
    [queryClient, filters, pagination, sort],
  );

  const {
    onMouseEnter: rawOnMouseEnter,
    restartTimer: rawRestartTimer,
    onMouseLeave,
  } = useHoverDelayedTrigger<Partial<SortParams<PriceSortKey>>>({
    onTrigger: prefetchAction,
    options,
  });

  const onMouseEnter = useCallback(
    (params: Partial<SortParams<PriceSortKey>>) => rawOnMouseEnter(params),
    [rawOnMouseEnter],
  );

  const restartTimer = useCallback(
    (params: Partial<SortParams<PriceSortKey>>) => rawRestartTimer(params),
    [rawRestartTimer],
  );

  return {
    onMouseEnter,
    onMouseLeave,
    restartTimer,
  };
};

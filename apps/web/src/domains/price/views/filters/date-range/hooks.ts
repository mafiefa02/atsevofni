import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Matcher } from "react-day-picker";

import { useHoverDelayedTrigger } from "-/lib/hooks";
import { FormattableDate } from "-/lib/models";
import { services } from "-/lib/services";

import { usePriceViewPagination } from "../../pagination/hooks";
import { usePriceViewSort } from "../../sort/hooks";
import { usePriceViewFilters } from "../hooks";
import type { DateRangeType } from "./types";

export const useGetDisabledDates = (key?: DateRangeType): Matcher => {
  const [{ startDate, endDate }] = usePriceViewFilters();

  if (key === "startDate") {
    const after = endDate ? new Date(endDate) : new Date();
    return { after };
  }

  if (key === "endDate") {
    const before = startDate ? new Date(startDate) : undefined;
    return before ? { before } : false;
  }

  const before = startDate ? new Date(startDate) : undefined;
  const after = endDate ? new Date(endDate) : undefined;

  if (before && after) return { before, after };
  if (after) return { after };
  if (before) return { before };

  return false;
};

interface UsePrefetchDateProps {
  name: DateRangeType;
  options?: {
    delayMs?: number;
  };
}

export const usePrefetchDate = ({
  name,
  options = { delayMs: 200 },
}: UsePrefetchDateProps) => {
  const queryClient = useQueryClient();
  const [filters] = usePriceViewFilters();
  const [pagination] = usePriceViewPagination();
  const [sort] = usePriceViewSort();

  const prefetchAction = useCallback(
    (date?: Date) => {
      const newRangeOption = date
        ? { [name]: new FormattableDate(date) }
        : { [name]: null };

      const queryOptions = services.price.query.getAllPrices({
        filters: { ...filters, ...newRangeOption },
        pagination,
        sort,
      });
      queryClient.prefetchQuery(queryOptions);
    },
    [queryClient, filters, pagination, sort, name],
  );

  const {
    onMouseEnter: rawOnMouseEnter,
    restartTimer: rawRestartTimer,
    onMouseLeave,
  } = useHoverDelayedTrigger({ onTrigger: prefetchAction, options });

  const onMouseEnter = useCallback(
    (date?: Date) => rawOnMouseEnter(date),
    [rawOnMouseEnter],
  );

  const restartTimer = useCallback(
    (date?: Date) => rawRestartTimer(date),
    [rawRestartTimer],
  );

  return {
    onMouseEnter,
    onMouseLeave,
    restartTimer,
  };
};

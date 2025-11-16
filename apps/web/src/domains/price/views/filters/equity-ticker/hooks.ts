import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import type { BaseEquityModel } from "-/domains/equity/models";
import { useHoverDelayedTrigger } from "-/lib/hooks";
import { services } from "-/lib/services";

import { usePriceViewPagination } from "../../pagination/hooks";
import { usePriceViewSort } from "../../sort/hooks";
import { usePriceViewFilters } from "../hooks";

interface UsePrefetchEquityProps {
  options?: {
    delayMs?: number;
  };
}

export const usePrefetchEquity = ({
  options = { delayMs: 100 },
}: UsePrefetchEquityProps = {}) => {
  const queryClient = useQueryClient();
  const [filters] = usePriceViewFilters();
  const [pagination] = usePriceViewPagination();
  const [sort] = usePriceViewSort();

  const prefetchAction = useCallback(
    (equity: BaseEquityModel) => {
      const equityId = equity.getEquity("id");
      const { equities: prev, ...restFilters } = filters;
      const equities = new Set(prev);

      if (equities.has(equityId)) {
        equities.delete(equityId);
      } else {
        equities.add(equityId);
      }

      const newEquities = equities.size > 0 ? Array.from(equities) : null;

      const queryOptions = services.price.query.getAllPrices({
        sort,
        filters: { ...restFilters, equities: newEquities },
        pagination: { ...pagination, page: 1 },
      });
      queryClient.prefetchQuery(queryOptions);
    },
    [queryClient, filters, pagination, sort],
  );

  const {
    onMouseEnter: rawOnMouseEnter,
    restartTimer: rawRestartTimer,
    onMouseLeave,
  } = useHoverDelayedTrigger<BaseEquityModel>({
    onTrigger: prefetchAction,
    options,
  });

  const onMouseEnter = useCallback(
    (equity: BaseEquityModel) => rawOnMouseEnter(equity),
    [rawOnMouseEnter],
  );

  const restartTimer = useCallback(
    (equity: BaseEquityModel) => rawRestartTimer(equity),
    [rawRestartTimer],
  );

  return {
    onMouseEnter,
    onMouseLeave,
    restartTimer,
  };
};

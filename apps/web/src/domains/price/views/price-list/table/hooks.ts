import { useMemo } from "react";

import { usePrefetchOnHover } from "-/lib/hooks";
import { services } from "-/lib/services";
import type { PaginationParams } from "-/lib/types";

import { usePriceViewFilters } from "../../filters/hooks";
import { usePriceViewPagination } from "../../pagination/hooks";
import { usePriceViewSort } from "../../sort/hooks";

export const usePrefetchPagination = (options: Partial<PaginationParams>) => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const nextQueryOptions = useMemo(
    () =>
      services.price.query.getAllPrices({
        filters,
        sort,
        pagination: { ...pagination, ...options },
      }),
    [filters, sort, pagination, options],
  );

  return usePrefetchOnHover({ queryOptions: nextQueryOptions });
};

import { useMemo } from "react";

import { usePrefetchOnHover } from "-/lib/hooks";
import { services } from "-/lib/services";

import { usePriceViewFilters } from "../view-filters/hooks";
import { usePriceViewPagination } from "../view-pagination/hooks";
import { usePriceViewSort } from "../view-sort/hooks";

export const usePrefetchPage = (page: number) => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const queryOptions = useMemo(
    () =>
      services.price.query.getAllPrices({
        filters,
        sort,
        pagination: { ...pagination, page, limit: 10 },
      }),
    [filters, sort, pagination, page],
  );

  return usePrefetchOnHover({ queryOptions });
};

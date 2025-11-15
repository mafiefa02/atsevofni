import { useMemo } from "react";

import { usePrefetchOnHover } from "-/lib/hooks";
import { services } from "-/lib/services";

import { usePriceViewFilters } from "../../filters/hooks";
import { usePriceViewPagination } from "../../pagination/hooks";
import { usePriceViewSort } from "../../sort/hooks";

export const usePrefetchPage = (page: number) => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const nextQueryOptions = useMemo(
    () =>
      services.price.query.getAllPrices({
        filters,
        sort,
        pagination: { ...pagination, page },
      }),
    [filters, sort, pagination, page],
  );

  return usePrefetchOnHover({ queryOptions: nextQueryOptions });
};

import { useMemo } from "react";

import type { PriceParams } from "-/domains/price/types";
import { usePrefetchOnHover } from "-/lib/hooks";
import { services } from "-/lib/services";

import { usePriceViewFilters } from "../../filters/hooks";
import { usePriceViewPagination } from "../../pagination/hooks";
import { usePriceViewSort } from "../../sort/hooks";

type PriceParamsOverride = {
  filters?: Partial<PriceParams["filters"]>;
  sort?: Partial<PriceParams["sort"]>;
  pagination?: Partial<PriceParams["pagination"]>;
};

export const usePrefetchPrice = (options: PriceParamsOverride) => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const nextQueryOptions = useMemo(() => {
    const {
      filters: overrideFilters,
      sort: overrideSort,
      pagination: overridePagination,
    } = options;

    return services.price.query.getAllPrices({
      filters: { ...filters, ...overrideFilters },
      sort: { ...sort, ...overrideSort },
      pagination: { ...pagination, ...overridePagination },
    });
  }, [filters, sort, pagination, options]);

  return usePrefetchOnHover({ queryOptions: nextQueryOptions });
};

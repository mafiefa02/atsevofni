import { useSuspenseQuery } from "@tanstack/react-query";

import { usePriceViewFilters } from "-/domains/price/view-filters/hooks";
import { usePriceViewPagination } from "-/domains/price/view-pagination/hooks";
import { usePriceViewSort } from "-/domains/price/view-sort/hooks";
import { services } from "-/lib/services";

import { PriceListTableNavigation } from "./navigation";

export const PriceListTablePagination = () => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const { data: prices } = useSuspenseQuery(
    services.price.query.getAllPrices({
      filters,
      sort,
      pagination: { ...pagination, limit: 10 },
    }),
  );

  if (pagination.enablePagination === false || prices.meta.totalItems === 0)
    return;

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <p className="text-muted-foreground">
        Total {prices.meta.totalItems} items found
      </p>
      <PriceListTableNavigation
        currentPage={pagination.page ?? 1}
        totalPage={prices.meta.totalPage}
      />
    </div>
  );
};

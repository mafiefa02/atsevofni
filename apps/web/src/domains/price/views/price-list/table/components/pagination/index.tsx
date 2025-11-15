import { useSuspenseQuery } from "@tanstack/react-query";

import { usePriceViewFilters } from "-/domains/price/views/filters/hooks";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";
import { usePriceViewSort } from "-/domains/price/views/sort/hooks";
import { services } from "-/lib/services";

import { PriceListTableControl } from "./control";
import { PriceListTableNavigation } from "./navigation";

export const PriceListTablePagination = () => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const { data: prices } = useSuspenseQuery(
    services.price.query.getAllPrices({ filters, sort, pagination }),
  );

  if (prices.meta.totalItems === 0) return;

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <PriceListTableNavigation
        currentPage={pagination.page ?? 1}
        totalPage={prices.meta.totalPage}
      />
      <PriceListTableControl />
    </div>
  );
};

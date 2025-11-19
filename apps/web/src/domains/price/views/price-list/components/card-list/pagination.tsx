import { useSuspenseQuery } from "@tanstack/react-query";

import { usePriceViewFilters } from "-/domains/price/views/filters/hooks";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";
import { usePriceViewSort } from "-/domains/price/views/sort/hooks";
import { services } from "-/lib/services";

import { PaginationControl } from "../../../pagination/components/control";
import { PaginationNavigation } from "../../../pagination/components/navigation";
import { PriceLastUpdated } from "../last-updated";

export const PriceCardListPagination = () => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const { data: prices } = useSuspenseQuery(
    services.price.query.getAllPrices({ filters, sort, pagination }),
  );

  if (prices.meta.pagination === null) return null;

  return (
    <div className="flex w-full flex-col items-center gap-4 text-sm">
      <PaginationNavigation
        currentPage={pagination.page ?? 1}
        totalPage={prices.meta.pagination.totalPage}
        variant="card"
      />
      <div className="flex w-full items-center justify-between gap-4">
        <PriceLastUpdated />
        <PaginationControl />
      </div>
    </div>
  );
};

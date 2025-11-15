import { useCallback, useMemo } from "react";

import { TableSortableHead } from "-/components/ui/table";
import { usePriceViewFilters } from "-/domains/price/view-filters/hooks";
import { usePriceViewSort } from "-/domains/price/view-sort/hooks";
import type { PriceSortKey } from "-/domains/price/view-sort/types";
import { usePrefetchOnHover } from "-/lib/hooks";
import { services } from "-/lib/services";
import { getNextSortState } from "-/lib/utils";

import { usePriceViewPagination } from "../../view-pagination/hooks";

interface PriceListTableHeadProps {
  sortKey: PriceSortKey;
  label: string;
}

export const PriceListTableHead = ({
  sortKey,
  label,
}: PriceListTableHeadProps) => {
  const [filters] = usePriceViewFilters();
  const [sortParams, setSort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const nextQueryOptions = useMemo(() => {
    return services.price.query.getAllPrices({
      filters,
      sort: getNextSortState(sortParams.sortBy, sortParams.order, sortKey),
      pagination: { ...pagination, limit: 10 },
    });
  }, [filters, sortParams, sortKey, pagination]);

  const { onMouseEnter, onMouseLeave, restartPrefetchTimer } =
    usePrefetchOnHover({
      queryOptions: nextQueryOptions,
    });

  const handleSort = useCallback(() => {
    setSort((prev) => getNextSortState(prev.sortBy, prev.order, sortKey));
    restartPrefetchTimer();
  }, [sortKey, setSort, restartPrefetchTimer]);

  return (
    <TableSortableHead
      sortKey={sortKey}
      currentParams={sortParams}
      onClick={handleSort}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label}
    </TableSortableHead>
  );
};

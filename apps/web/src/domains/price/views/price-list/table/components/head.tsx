import { useCallback, useMemo } from "react";

import { TableSortableHead } from "-/components/ui/table";
import { usePrefetchOnHover } from "-/lib/hooks";
import { services } from "-/lib/services";
import { getNextSortState } from "-/lib/utils";

import { usePriceViewFilters } from "../../../filters/hooks";
import { usePriceViewPagination } from "../../../pagination/hooks";
import { usePriceViewSort } from "../../../sort/hooks";
import type { PriceSortKey } from "../../../sort/types";

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

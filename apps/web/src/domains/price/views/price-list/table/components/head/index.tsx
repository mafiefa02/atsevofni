import { useCallback } from "react";

import { TableSortableHead } from "-/components/ui/table";
import { usePrefetchPrice } from "-/domains/price/views/hooks";
import { usePriceViewSort } from "-/domains/price/views/sort/hooks";
import type { PriceSortKey } from "-/domains/price/views/sort/types";
import { getNextSortState } from "-/lib/utils";

interface PriceListTableHeadProps {
  sortKey: PriceSortKey;
  label: string;
}

export const PriceListTableHead = ({
  sortKey,
  label,
}: PriceListTableHeadProps) => {
  const [sort, setSort] = usePriceViewSort();

  const { onMouseEnter, onMouseLeave, restartTimer } = usePrefetchPrice({
    sort: getNextSortState(sort.sortBy, sort.order, sortKey),
  });

  const handleSort = useCallback(() => {
    setSort((prev) => getNextSortState(prev.sortBy, prev.order, sortKey));
    restartTimer();
  }, [sortKey, setSort, restartTimer]);

  return (
    <TableSortableHead
      sortKey={sortKey}
      currentParams={sort}
      onClick={handleSort}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={onMouseLeave}
    >
      {label}
    </TableSortableHead>
  );
};

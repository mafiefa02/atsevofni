import { Skeleton } from "-/components/ui/skeleton";
import { TableRow, TableSpanningRowCell } from "-/components/ui/table";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";
import { generateUniqueRandomIntArray } from "-/lib/utils";

import { NUM_OF_COLUMNS } from "../../constants";

export const PriceListContentLoading = () => {
  const [{ limit }] = usePriceViewPagination();
  // subtracting by one helps reduce layout shifts
  const skeletons = generateUniqueRandomIntArray(limit - 1, limit - 1);

  return skeletons.map((skeleton) => (
    <TableRow key={`${skeleton}-skeleton-pricelistcontent`}>
      <TableSpanningRowCell className="p-0 py-1" numOfColumn={NUM_OF_COLUMNS}>
        <Skeleton className="h-8 w-full" />
      </TableSpanningRowCell>
    </TableRow>
  ));
};

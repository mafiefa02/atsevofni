import { Skeleton } from "-/components/ui/skeleton";
import { TableRow, TableSpanningRowCell } from "-/components/ui/table";
import { generateUniqueRandomIntArray } from "-/lib/utils";

import { NUM_OF_COLUMNS } from "../../constants";

export const PriceListContentLoading = () => {
  const skeletons = generateUniqueRandomIntArray(5, 10);
  return skeletons.map((skeleton) => (
    <TableRow key={`${skeleton}-skeleton-pricelistcontent`}>
      <TableSpanningRowCell className="p-0 py-1" numOfColumn={NUM_OF_COLUMNS}>
        <Skeleton className="h-8 w-full" />
      </TableSpanningRowCell>
    </TableRow>
  ));
};

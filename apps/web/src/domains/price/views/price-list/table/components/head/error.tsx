import { TableRow, TableSpanningRowCell } from "-/components/ui/table";

import { NUM_OF_COLUMNS } from "../../constants";

export const PriceListTableHeadError = () => {
  return (
    <TableRow>
      <TableSpanningRowCell numOfColumn={NUM_OF_COLUMNS}>
        Error
      </TableSpanningRowCell>
    </TableRow>
  );
};

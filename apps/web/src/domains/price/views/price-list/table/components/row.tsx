import { TableCell, TableRow } from "-/components/ui/table";
import type { PriceModel } from "-/domains/price/models";

import { TABLE_COLUMN_KEYS } from "../constants";
import { formatCell } from "../utils";

interface PriceListTableRowProps {
  price: PriceModel;
}

export const PriceListTableRow = ({ price }: PriceListTableRowProps) => {
  return (
    <TableRow>
      {TABLE_COLUMN_KEYS.map((key) => (
        <TableCell key={`${price.getPrice("no")}-${key}`}>
          {formatCell(price.getPrice(key))}
        </TableCell>
      ))}
    </TableRow>
  );
};

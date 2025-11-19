import { EquityIcon } from "-/components/equity-icon";
import { TableCell, TableRow } from "-/components/ui/table";
import type { PriceModel } from "-/domains/price/models";
import { cn } from "-/lib/utils";

import { TABLE_COLUMN_KEYS } from "../constants";
import { formatCell } from "../utils";

interface PriceListTableRowProps {
  price: PriceModel;
}

export const PriceListTableRow = ({ price }: PriceListTableRowProps) => {
  return (
    <TableRow>
      {TABLE_COLUMN_KEYS.map((key) => (
        <TableCell key={`${price.getUniqueId()}-cell-${key}`}>
          <div
            className={cn(
              key === "equityId" ? "flex" : "contents",
              "items-center gap-2",
            )}
          >
            {key === "equityId" && (
              <EquityIcon
                className="size-4"
                equityId={price.getPrice("equityId")}
              />
            )}
            {formatCell(key, price.getPrice(key))}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
};

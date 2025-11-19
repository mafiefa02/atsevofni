import emptyBox from "-/assets/empty-box.png";
import { usePriceViewFilters } from "-/domains/price/views/filters/hooks";

import { ArrowClockwiseIcon } from "../icons/arrow-clockwise";
import { Button } from "../ui/button";
import { TableRow, TableSpanningRowCell } from "../ui/table";

interface EmptyTableRowProps extends React.ComponentProps<"tr"> {
  numOfColumn: number;
}

export const EmptyTableRow = ({
  numOfColumn,
  className,
  ...props
}: EmptyTableRowProps) => {
  const [, setFilters] = usePriceViewFilters();
  const reset = () => setFilters(null);
  return (
    <TableRow className={className} {...props}>
      <TableSpanningRowCell
        className="place-items-center space-y-4"
        numOfColumn={numOfColumn}
      >
        <img
          className="pointer-events-none size-36 dark:grayscale"
          src={emptyBox}
        />
        <strong className="text-base">No data found!</strong>
        <p className="mt-1">
          We can&apos;t find the data you&apos;re looking for.
        </p>
        <Button onClick={reset}>
          <ArrowClockwiseIcon /> Reset filter
        </Button>
      </TableSpanningRowCell>
    </TableRow>
  );
};

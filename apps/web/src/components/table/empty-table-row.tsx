import emptyBox from "-/assets/empty-box.png";

import { TableRow, TableSpanningRowCell } from "../ui/table";

interface EmptyTableRowProps extends React.ComponentProps<"tr"> {
  numOfColumn: number;
}

export const EmptyTableRow = ({
  numOfColumn,
  className,
  ...props
}: EmptyTableRowProps) => {
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
      </TableSpanningRowCell>
    </TableRow>
  );
};

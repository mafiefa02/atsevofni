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
      <TableSpanningRowCell numOfColumn={numOfColumn}>
        <strong className="text-base">No data found!</strong>
        <p className="mt-1">
          We can&apos;t find the data you&apos;re looking for.
        </p>
      </TableSpanningRowCell>
    </TableRow>
  );
};

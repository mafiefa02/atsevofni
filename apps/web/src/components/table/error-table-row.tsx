import { TableRow, TableSpanningRowCell } from "../ui/table";

interface ErrorTableRowProps extends React.ComponentProps<"tr"> {
  numOfColumn: number;
}

export const ErrorTableRow = ({
  numOfColumn,
  className,
  ...props
}: ErrorTableRowProps) => {
  return (
    <TableRow className={className} {...props}>
      <TableSpanningRowCell numOfColumn={numOfColumn}>
        <strong className="text-base">Something went wrong!</strong>
        <p className="mt-1">
          Unexpected error has occured, please try reloading the page.
        </p>
      </TableSpanningRowCell>
    </TableRow>
  );
};

import { SelectItem } from "-/components/ui/select";
import { usePrefetchPrice } from "-/domains/price/views/hooks";

interface PaginationControlItemProps {
  value: string;
  children: React.ReactNode;
}

export const PaginationControlItem = ({
  value,
  children,
}: PaginationControlItemProps) => {
  const limit = isNaN(Number(value)) ? null : Number(value);
  const { onMouseEnter, onMouseLeave } = usePrefetchPrice({
    pagination: { limit },
  });
  return (
    <SelectItem
      value={value}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      {children}
    </SelectItem>
  );
};

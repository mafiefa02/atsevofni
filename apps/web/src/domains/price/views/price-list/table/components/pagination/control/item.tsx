import { SelectItem } from "-/components/ui/select";

import { usePrefetchPrice } from "../../../hooks";

interface PriceListTableControlItemProps {
  value: string;
  children: React.ReactNode;
}

export const PriceListTableControlItem = ({
  value,
  children,
}: PriceListTableControlItemProps) => {
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

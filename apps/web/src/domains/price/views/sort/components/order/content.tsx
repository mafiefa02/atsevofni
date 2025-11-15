import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "-/components/ui/select";

import { sortKeyOrderLabel } from "../../constants";
import { usePriceViewSort } from "../../hooks";

export const PriceViewSortOrderContent = () => {
  const [{ sortBy }] = usePriceViewSort();

  if (!sortBy) return;

  const items = Object.entries(sortKeyOrderLabel[sortBy]);

  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Order</SelectLabel>
        {items.map(([value, label]) => (
          <SelectItem value={value} key={value}>
            {label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  );
};

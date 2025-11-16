import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "-/components/ui/select";
import type { SortOrder } from "-/lib/types";

import { sortKeyOrderLabel } from "../../constants";
import { usePrefetchSort, usePriceViewSort } from "../../hooks";

export const PriceViewSortOrderContent = () => {
  const [{ sortBy }] = usePriceViewSort();
  const { onMouseEnter, onMouseLeave, restartTimer } = usePrefetchSort();

  if (!sortBy) return null;

  const items = Object.entries(sortKeyOrderLabel[sortBy]);

  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Order</SelectLabel>
        {items.map(([value, label]) => (
          <SelectItem
            onMouseEnter={() => onMouseEnter({ order: value as SortOrder })}
            onMouseLeave={onMouseLeave}
            onClick={() => restartTimer({ order: value as SortOrder })}
            value={value}
            key={value}
          >
            {label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  );
};

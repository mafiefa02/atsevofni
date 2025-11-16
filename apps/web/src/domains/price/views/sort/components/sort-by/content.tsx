import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "-/components/ui/select";

import { priceSortKeyToLabel } from "../../constants";
import { usePrefetchSort } from "../../hooks";
import type { PriceSortKey } from "../../types";

export const PriceViewSortByContent = () => {
  const items = Object.entries(priceSortKeyToLabel);
  const { onMouseEnter, onMouseLeave, restartTimer } = usePrefetchSort();
  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fields to sort by</SelectLabel>
        {items.map(([value, label]) => (
          <SelectItem
            onMouseEnter={() => onMouseEnter({ sortBy: value as PriceSortKey })}
            onMouseLeave={onMouseLeave}
            onClick={() => restartTimer({ sortBy: value as PriceSortKey })}
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

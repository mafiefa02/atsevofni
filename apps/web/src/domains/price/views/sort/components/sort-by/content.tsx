import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "-/components/ui/select";

import { priceSortKeyToLabel } from "../../constants";

export const PriceViewSortByContent = () => {
  const items = Object.entries(priceSortKeyToLabel);
  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fields to sort by</SelectLabel>
        {items.map(([value, label]) => (
          <SelectItem value={value} key={value}>
            {label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  );
};

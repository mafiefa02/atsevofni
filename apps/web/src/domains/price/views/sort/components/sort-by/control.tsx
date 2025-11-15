import { useCallback } from "react";

import { Select } from "-/components/ui/select";

import { VALID_SORT_KEYS } from "../../constants";
import { usePriceViewSort } from "../../hooks";
import type { PriceSortKey } from "../../types";

interface PriceViewSortByControlProps {
  children: React.ReactNode;
}

export const PriceViewSortByControl = ({
  children,
}: PriceViewSortByControlProps) => {
  const [{ sortBy }, setSort] = usePriceViewSort();

  const handleChange = useCallback(
    (value: string) => {
      if (VALID_SORT_KEYS.has(value)) {
        setSort({ sortBy: value as PriceSortKey });
      }
    },
    [setSort],
  );

  return (
    <Select value={sortBy ?? ""} onValueChange={handleChange}>
      {children}
    </Select>
  );
};

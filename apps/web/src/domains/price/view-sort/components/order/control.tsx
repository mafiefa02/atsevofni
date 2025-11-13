import { useCallback } from "react";

import { Select } from "-/components/ui/select";
import type { SortOrder } from "-/lib/types";

import { usePriceViewSort } from "../../hooks";

interface PriceViewSortOrderControlProps {
  children: React.ReactNode;
}

export const PriceViewSortOrderControl = ({
  children,
}: PriceViewSortOrderControlProps) => {
  const [{ sortBy, order }, setSort] = usePriceViewSort();

  const handleChange = useCallback(
    (value: string) => {
      setSort({ order: value as SortOrder });
    },
    [setSort],
  );

  if (!sortBy) return;

  return (
    <Select value={order ?? "desc"} onValueChange={handleChange}>
      {children}
    </Select>
  );
};

import { useCallback } from "react";

import { ArrowCounterClockwiseIcon } from "-/components/icons/arrow-counter-clockwise";
import { Button } from "-/components/ui/button";

import { usePriceViewSort } from "../hooks";

export const PriceViewSortReset = () => {
  const [{ sortBy }, setSort] = usePriceViewSort();

  const clearState = useCallback(
    () => setSort({ sortBy: null, order: null }),
    [setSort],
  );

  if (!sortBy) return;

  return (
    <Button onClick={clearState} variant="outline" size="icon-sm">
      <ArrowCounterClockwiseIcon />
    </Button>
  );
};

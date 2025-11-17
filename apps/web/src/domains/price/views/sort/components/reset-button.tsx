import { useCallback, useMemo } from "react";

import { ArrowCounterClockwiseIcon } from "-/components/icons/arrow-counter-clockwise";
import { Button } from "-/components/ui/button";

import { usePrefetchSort, usePriceViewSort } from "../hooks";

export const PriceViewSortReset = () => {
  const [{ sortBy }, setSort] = usePriceViewSort();
  const { onMouseEnter, onMouseLeave, restartTimer } = usePrefetchSort();
  const defaultParams = useMemo(() => ({ sortBy: null, order: null }), []);

  const clearState = useCallback(() => {
    restartTimer(defaultParams);
    setSort(defaultParams);
  }, [restartTimer, setSort, defaultParams]);

  if (!sortBy) return null;

  return (
    <Button
      onMouseEnter={() => onMouseEnter(defaultParams)}
      onMouseLeave={onMouseLeave}
      onClick={clearState}
      variant="outline"
      size="icon-sm"
    >
      <ArrowCounterClockwiseIcon />
    </Button>
  );
};

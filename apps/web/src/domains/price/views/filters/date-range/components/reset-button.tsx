import { useCallback } from "react";

import { ArrowCounterClockwiseIcon } from "-/components/icons/arrow-counter-clockwise";
import { Button } from "-/components/ui/button";

import { usePriceViewFilters } from "../../hooks";
import { usePrefetchDate } from "../hooks";
import type { DateRangeType } from "../types";

interface DateRangeResetButtonProps {
  name: DateRangeType;
}

export const DateRangeResetButton = ({ name }: DateRangeResetButtonProps) => {
  const [{ [name]: date }, setFilter] = usePriceViewFilters();
  const { onMouseEnter, onMouseLeave, restartTimer } = usePrefetchDate({
    name,
  });

  const clearState = useCallback(() => {
    restartTimer();
    setFilter({ [name]: null });
  }, [name, setFilter, restartTimer]);

  if (!date) return null;

  return (
    <Button
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={onMouseLeave}
      onClick={clearState}
      variant="outline"
      size="icon-sm"
    >
      <ArrowCounterClockwiseIcon />
    </Button>
  );
};

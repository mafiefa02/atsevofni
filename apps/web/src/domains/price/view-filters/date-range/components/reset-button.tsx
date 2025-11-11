import { RotateCcwIcon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "-/components/ui/button";

import { usePriceViewFilters } from "../../hooks";
import type { DateRangeType } from "../types";

interface DateRangeResetButtonProps {
  name: DateRangeType;
}

export const DateRangeResetButton = ({ name }: DateRangeResetButtonProps) => {
  const [{ [name]: date }, setFilter] = usePriceViewFilters();

  const clearState = useCallback(
    () => setFilter({ [name]: null }),
    [name, setFilter],
  );

  if (!date) return;

  return (
    <Button onClick={clearState} variant="outline" size="icon-sm">
      <RotateCcwIcon />
    </Button>
  );
};

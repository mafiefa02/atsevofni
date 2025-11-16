import { useCallback, useState } from "react";

import { Calendar } from "-/components/ui/calendar";
import { Popover, PopoverContent } from "-/components/ui/popover";
import { FormattableDate } from "-/lib/models";

import { usePriceViewPagination } from "../../../pagination/hooks";
import { usePriceViewFilters } from "../../hooks";
import { useGetDisabledDates, usePrefetchDate } from "../hooks";
import type { DateRangeType } from "../types";

interface DateRangeControlProps {
  name: DateRangeType;
  children: React.ReactNode;
  shouldCloseAfterSelect?: boolean;
}

export const DateRangeControl = ({
  name,
  children,
  shouldCloseAfterSelect = true,
}: DateRangeControlProps) => {
  const [open, setOpen] = useState(false);

  const handleAfterSelect = useCallback(
    () => (shouldCloseAfterSelect ? setOpen(false) : null),
    [shouldCloseAfterSelect],
  );

  const [{ [name]: date }, setFilter] = usePriceViewFilters();
  const [, setPagination] = usePriceViewPagination();
  const disabledDates = useGetDisabledDates(name);

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) {
        setFilter({ [name]: null });
        setPagination({ page: 1 });
        return;
      }
      const dateModel = new FormattableDate(date);
      setFilter({ [name]: dateModel });
      setPagination({ page: 1 });
    },
    [name, setFilter, setPagination],
  );

  const { onMouseEnter, onMouseLeave, restartTimer } = usePrefetchDate({
    name,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {children}
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          captionLayout="dropdown"
          onSelect={(date) => {
            restartTimer(date);
            handleSelect(date);
            handleAfterSelect();
          }}
          onDayMouseEnter={onMouseEnter}
          onDayMouseLeave={onMouseLeave}
          disabled={disabledDates}
        />
      </PopoverContent>
    </Popover>
  );
};

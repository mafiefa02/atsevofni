import { useCallback, useState } from "react";

import { Calendar } from "-/components/ui/calendar";
import { Popover, PopoverContent } from "-/components/ui/popover";
import { FormattableDate } from "-/lib/models";

import { usePriceViewFilters } from "../../hooks";
import { useGetDisabledDates } from "../hooks";
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
  const disabledDates = useGetDisabledDates(name);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {children}
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (!date) return setFilter({ [name]: null });

            const dateModel = new FormattableDate(date);
            setFilter({ [name]: dateModel });

            handleAfterSelect();
          }}
          disabled={disabledDates}
        />
      </PopoverContent>
    </Popover>
  );
};

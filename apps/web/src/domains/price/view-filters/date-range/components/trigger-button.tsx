import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "-/components/ui/button";
import { PopoverTrigger } from "-/components/ui/popover";
import { cn } from "-/lib/utils";

import { usePriceViewFilters } from "../../hooks";
import type { DateRangeType } from "../types";

interface DateRangeTriggerButtonProps {
  name: DateRangeType;
  placeholder?: string;
  className?: string;
}

export const DateRangeTriggerButton = ({
  name,
  className,
  placeholder = "Select Date",
}: DateRangeTriggerButtonProps) => {
  const [{ [name]: date }] = usePriceViewFilters();

  return (
    <PopoverTrigger asChild>
      <Button
        id={name}
        variant="outline"
        className={cn(
          "w-full justify-between font-normal",
          !date && "text-muted-foreground",
          className,
        )}
      >
        {date ? format(date, "PP") : placeholder}
        <ChevronDownIcon />
      </Button>
    </PopoverTrigger>
  );
};

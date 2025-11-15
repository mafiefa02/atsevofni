import { FieldGroup } from "-/components/ui/field";

import { DateRangeFilter } from "../date-range/components/date-range-filter";
import { EquityTickerFilter } from "../equity-ticker/components/equity-ticker-filter";

export const PriceViewFilters = () => {
  return (
    <FieldGroup>
      <DateRangeFilter />
      <EquityTickerFilter />
    </FieldGroup>
  );
};

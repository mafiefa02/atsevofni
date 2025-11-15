import { FieldGroup, FieldLegend, FieldSet } from "-/components/ui/field";

import { PriceViewSortOrder } from "./order/order-select";
import { PriceViewSortBy } from "./sort-by/price-view-sort";

export const PriceViewSort = () => {
  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Sorting</FieldLegend>
        <PriceViewSortBy />
        <PriceViewSortOrder />
      </FieldSet>
    </FieldGroup>
  );
};

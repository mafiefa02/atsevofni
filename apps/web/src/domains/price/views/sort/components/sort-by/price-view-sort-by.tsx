import { Field, FieldLabel } from "-/components/ui/field";
import { SelectTrigger, SelectValue } from "-/components/ui/select";

import { PriceViewSortReset } from "../reset-button";
import { PriceViewSortByContent } from "./content";
import { PriceViewSortByControl } from "./control";

export const PriceViewSortBy = () => {
  return (
    <Field>
      <FieldLabel htmlFor="price-view-sort">Sort by</FieldLabel>
      <PriceViewSortByControl>
        <div className="flex w-full items-center gap-2">
          <SelectTrigger id="price-view-sort" size="sm" className="flex-1">
            <SelectValue placeholder="Sort the data by field" />
          </SelectTrigger>
          <PriceViewSortReset />
        </div>
        <PriceViewSortByContent />
      </PriceViewSortByControl>
    </Field>
  );
};

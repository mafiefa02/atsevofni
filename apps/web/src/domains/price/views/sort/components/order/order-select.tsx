import { Field } from "-/components/ui/field";
import { SelectTrigger, SelectValue } from "-/components/ui/select";

import { PriceViewSortOrderContent } from "./content";
import { PriceViewSortOrderControl } from "./control";

export const PriceViewSortOrder = () => {
  return (
    <PriceViewSortOrderControl>
      <Field>
        <div className="flex w-full items-center gap-2">
          <SelectTrigger id="price-view-sort" size="sm" className="flex-1">
            <SelectValue />
          </SelectTrigger>
        </div>
        <PriceViewSortOrderContent />
      </Field>
    </PriceViewSortOrderControl>
  );
};

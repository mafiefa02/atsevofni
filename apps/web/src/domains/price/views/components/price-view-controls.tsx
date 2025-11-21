import { PriceViewFilters } from "../filters/components/price-view-filters";
import { PriceViewSort } from "../sort/components/price-view-sort";

export const PriceViewControls = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <PriceViewSort />
      <PriceViewFilters />
    </div>
  );
};

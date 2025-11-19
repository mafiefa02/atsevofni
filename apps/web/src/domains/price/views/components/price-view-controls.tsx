import { PriceViewFilters } from "../filters/components/price-view-filters";
import { PriceViewSort } from "../sort/components/price-view-sort";

export const PriceViewControls = () => {
  return (
    <div className="flex h-[200dvh] w-full flex-col gap-7">
      <PriceViewSort />
      <PriceViewFilters />
    </div>
  );
};

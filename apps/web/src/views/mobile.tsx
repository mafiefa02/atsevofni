import { AppTitle } from "-/components/app-title";
import { PriceCardList } from "-/domains/price/views/price-list/components/card-list/price-card-list";

export const MobileView = () => {
  return (
    <div className="flex flex-col gap-5">
      <AppTitle />
      <PriceCardList />
    </div>
  );
};

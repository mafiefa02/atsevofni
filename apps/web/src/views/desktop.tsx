import { AppTitle } from "-/components/app-title";
import { PriceListTable } from "-/domains/price/views/price-list/table/components/price-list-table";

export const DesktopView = () => {
  return (
    <div className="flex flex-col gap-5">
      <AppTitle />
      {/* TODO: Close price visualization*/}
      <PriceListTable />
    </div>
  );
};

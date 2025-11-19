import { AppTitle } from "-/components/app-title";
import { PriceChartVis } from "-/domains/price/views/chart-vis/components/price-chart-vis";
import { PriceListTable } from "-/domains/price/views/price-list/table/components/price-list-table";

export const DesktopView = () => {
  return (
    <div className="flex flex-col gap-5">
      <AppTitle />
      <PriceChartVis />
      <PriceListTable />
    </div>
  );
};

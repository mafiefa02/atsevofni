import { PriceListTable } from "-/domains/price/views/price-list/table/components/price-list-table";

export const DesktopDashboardView = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* TODO: Close price visualization*/}
      <PriceListTable />
    </div>
  );
};

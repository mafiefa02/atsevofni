import { PriceListTable } from "../../price-list-table/components/price-list-table";

export const PriceList = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* TODO: Close price visualization*/}
      <PriceListTable />
    </div>
  );
};

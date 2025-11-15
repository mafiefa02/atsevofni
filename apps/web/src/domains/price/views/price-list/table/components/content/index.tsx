import { useSuspenseQuery } from "@tanstack/react-query";

import { EmptyTableRow } from "-/components/table/empty-table-row";
import { ErrorTableRow } from "-/components/table/error-table-row";
import { usePriceViewFilters } from "-/domains/price/views/filters/hooks";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";
import { usePriceViewSort } from "-/domains/price/views/sort/hooks";
import { services } from "-/lib/services";

import { NUM_OF_COLUMNS } from "../../constants";
import { PriceListTableRow } from "../row";

export const PriceListTableContent = () => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const { data: prices, isError } = useSuspenseQuery(
    services.price.query.getAllPrices({ filters, sort, pagination }),
  );

  if (isError) return <ErrorTableRow numOfColumn={NUM_OF_COLUMNS} />;
  if (!prices.data || prices.data.length === 0)
    return <EmptyTableRow numOfColumn={NUM_OF_COLUMNS} />;

  return prices.data.map((price) => (
    <PriceListTableRow key={price.getPrice("no")} price={price} />
  ));
};

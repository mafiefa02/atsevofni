import { useSuspenseQuery } from "@tanstack/react-query";

import { services } from "-/lib/services";

import { usePriceViewFilters } from "../../view-filters/hooks";
import { usePriceViewSort } from "../../view-sort/hooks";
import { PriceListEmpty } from "./empty";
import { PriceListError } from "./error";

export const PriceList = () => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();

  const { data: prices, isError } = useSuspenseQuery(
    services.price.query.getAllPrices({ filters, sort }),
  );

  if (isError) return <PriceListError />;
  if (prices.data.length === 0) return <PriceListEmpty />;

  return JSON.stringify(prices.data);
};

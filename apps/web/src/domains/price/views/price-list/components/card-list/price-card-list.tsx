import { useSuspenseQuery } from "@tanstack/react-query";

import { services } from "-/lib/services";

import { usePriceViewFilters } from "../../../filters/hooks";
import { usePriceViewPagination } from "../../../pagination/hooks";
import { usePriceViewSort } from "../../../sort/hooks";
import { PriceCardListCard } from "./card";
import { PriceCardListPagination } from "./pagination";

export const PriceCardList = () => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();
  const { data: result } = useSuspenseQuery(
    services.price.query.getAllPrices({ filters, sort, pagination }),
  );
  return (
    <div className="flex flex-col gap-2">
      <PriceCardListPagination withMeta={false} />
      <div className="grid gap-2 md:grid-cols-2 [&>*:last-child:nth-child(odd)]:md:col-span-2">
        {result.data.map((price) => (
          <PriceCardListCard key={price.getUniqueId()} price={price} />
        ))}
      </div>
      <PriceCardListPagination />
    </div>
  );
};

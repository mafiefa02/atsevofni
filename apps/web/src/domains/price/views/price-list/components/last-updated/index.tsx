import { useSuspenseQuery } from "@tanstack/react-query";

import { usePriceViewFilters } from "-/domains/price/views/filters/hooks";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";
import { usePriceViewSort } from "-/domains/price/views/sort/hooks";
import { services } from "-/lib/services";

export const PriceLastUpdated = () => {
  const [filters] = usePriceViewFilters();
  const [sort] = usePriceViewSort();
  const [pagination] = usePriceViewPagination();

  const {
    data: { meta },
  } = useSuspenseQuery(
    services.price.query.getAllPrices({ filters, sort, pagination }),
  );

  return (
    <p className="text-muted-foreground text-sm">
      <span className="hidden sm:inline">
        Updated at {meta.lastUpdated.format("PPp")}
      </span>
      <span className="sm:hidden">
        Updated at {meta.lastUpdated.format("p")}
      </span>
    </p>
  );
};

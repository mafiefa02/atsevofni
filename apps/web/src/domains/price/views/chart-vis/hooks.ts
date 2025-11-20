import { useSuspenseQuery } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction, useMemo, useState } from "react";

import { services } from "-/lib/services";

import { usePriceViewFilters } from "../filters/hooks";
import type { XDomain } from "./types";

export const useGetChartData = () => {
  const [globalFilters] = usePriceViewFilters();
  const query = useSuspenseQuery(
    services.price.query.getAllPrices({
      filters: {
        ...globalFilters,
        equitySector: null,
        equitySubsector: null,
        latest: false,
      },
      pagination: { enablePagination: false, limit: null, page: null },
      sort: { sortBy: "date", order: "asc" },
    }),
  );

  return query;
};

export const useGetActiveXDomain = (
  globalXDomain: XDomain[],
): [
  XDomain[],
  Dispatch<SetStateAction<{ start: XDomain | null; end: XDomain | null }>>,
] => {
  const [xRange, setXRange] = useState<{
    start: XDomain | null;
    end: XDomain | null;
  }>({
    start: null,
    end: null,
  });

  const activeDomain = useMemo(() => {
    if (xRange.start === null || xRange.end === null) {
      return globalXDomain;
    }
    return [xRange.start, xRange.end];
  }, [globalXDomain, xRange.start, xRange.end]);

  return [activeDomain, setXRange];
};

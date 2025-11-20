import { useSuspenseQuery } from "@tanstack/react-query";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { services } from "-/lib/services";

import type { PriceModel } from "../../models";
import { usePriceViewFilters } from "../filters/hooks";
import type { XDomain } from "./types";
import { accessors, bisectDate, getTimestamp } from "./utils";

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

export const useSeriesValue = (data: Record<string, PriceModel[]>) => {
  return useCallback(
    (key: string, hoveredDate: Date | null) => {
      if (!hoveredDate) return null;

      const seriesData = data[key];
      if (!seriesData?.length) return null;

      const index = bisectDate(seriesData, hoveredDate);
      const point = seriesData[index];

      if (point && getTimestamp(point) === hoveredDate.getTime()) {
        return accessors.yAccessor(point);
      }

      return null;
    },
    [data],
  );
};

import type { Matcher } from "react-day-picker";

import { usePriceViewFilters } from "../hooks";
import type { DateRangeType } from "./types";

export const useGetDisabledDates = (key?: DateRangeType): Matcher => {
  const [{ startDate, endDate }] = usePriceViewFilters();

  if (key === "startDate") {
    const after = endDate ? new Date(endDate) : undefined;
    return after ? { after } : false;
  }

  if (key === "endDate") {
    const before = startDate ? new Date(startDate) : undefined;
    return before ? { before } : false;
  }

  const before = startDate ? new Date(startDate) : undefined;
  const after = endDate ? new Date(endDate) : undefined;

  if (before && after) return { before, after };
  if (after) return { after };
  if (before) return { before };

  return false;
};

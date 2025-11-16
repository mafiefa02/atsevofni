import type { PriceFilter } from "./types";

/** Maps the frontend query param name to what the backend expects. */
export const priceFilterKeyNameMap: Record<keyof PriceFilter, string> = {
  equities: "equities",
  equitySector: "sector",
  equitySubsector: "subsector",
  startDate: "start_date",
  endDate: "end_date",
  latest: "latest",
};

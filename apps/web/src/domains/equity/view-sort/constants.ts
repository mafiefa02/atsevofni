import type { EquityResponse } from "../types";
import type { EquitySortKey } from "./types";

export const equitySortKeyToParamMap: Record<
  EquitySortKey,
  keyof EquityResponse
> = {
  equityId: "portid",
  equityName: "portname",
  equityDateListed: "listeddate",
  equitySectorId: "sectorid",
  equitySectorName: "sector",
  equitySubsectorId: "subsectorid",
  equitySubsectorName: "subsector",
};

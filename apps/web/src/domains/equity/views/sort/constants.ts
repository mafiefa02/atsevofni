import type { EquityResponse } from "../../types";
import type { EquitySortKey } from "./types";

export const equitySortKeyToParamMap: Record<
  EquitySortKey,
  keyof EquityResponse
> = {
  equityId: "id",
  equityName: "name",
  equityDateListed: "listedDate",
  equitySectorId: "sectorId",
  equitySectorName: "sector",
  equitySubsectorId: "subsectorId",
  equitySubsectorName: "subsector",
};

import { parse } from "date-fns";

import { FormattableDate } from "-/lib/models";

import type {
  Equity,
  EquityResponse,
  EquitySector,
  EquitySubsector,
} from "./types";

export const equityResponseToEquitySector = (
  response: Pick<EquityResponse, "sector" | "sectorid">,
): EquitySector => {
  return {
    id: response.sectorid,
    name: response.sector,
  } as EquitySector;
};

export const equityResponseToEquitySubsector = (
  response: Pick<EquityResponse, "subsector" | "subsectorid">,
): EquitySubsector => {
  return {
    id: response.subsectorid,
    name: response.subsector,
  } as EquitySubsector;
};

export const equityResponseToEquity = (response: EquityResponse): Equity => {
  return {
    id: response.portid,
    name: response.portname,
    dateListed: new FormattableDate(
      parse(response.listeddate, "yyyy-MM-dd", new Date()),
    ),
  } as Equity;
};

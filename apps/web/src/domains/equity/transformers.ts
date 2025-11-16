import { parse } from "date-fns";

import { FormattableDate } from "-/lib/models";

import type {
  BaseEquityResponse,
  Equity,
  EquityResponse,
  EquitySector,
  EquitySubsector,
} from "./types";

export const equityResponseToEquitySector = (
  response: EquityResponse,
): EquitySector => {
  return {
    id: response.sectorId,
    name: response.sector,
  } as EquitySector;
};

export const equityResponseToEquitySubsector = (
  response: EquityResponse,
): EquitySubsector => {
  return {
    id: response.subsectorId,
    name: response.subsector,
  } as EquitySubsector;
};

export const equityResponseToEquity = (
  response: BaseEquityResponse,
): Equity => {
  return {
    id: response.id,
    name: response.name,
    dateListed: new FormattableDate(
      parse(response.listedDate, "yyyy-MM-dd", new Date()),
    ),
  } as Equity;
};

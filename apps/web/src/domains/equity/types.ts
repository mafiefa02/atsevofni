import type { FormattableDate } from "-/lib/models";
import type { UniqueBrand } from "-/lib/types";

export interface EquityResponse {
  portid: string;
  portname: string;
  sectorid: string;
  sector: string;
  subsectorid: string;
  subsector: string;
  listeddate: string;
}

export type EquitySectorId = UniqueBrand<string>;
export type EquitySectorName = UniqueBrand<string>;
export interface EquitySector {
  id: EquitySectorId;
  name: EquitySectorName;
}

export type EquitySubsectorId = UniqueBrand<string>;
export type EquitySubsectorName = UniqueBrand<string>;
export interface EquitySubsector {
  id: EquitySubsectorId;
  name: EquitySubsectorName;
}

export type EquityId = UniqueBrand<string>;
export type EquityName = UniqueBrand<string>;
export interface Equity {
  id: EquityId;
  name: EquityName;
  dateListed: FormattableDate;
}

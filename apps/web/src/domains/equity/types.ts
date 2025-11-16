import type { FormattableDate } from "-/lib/models";
import type { Params, UniqueBrand } from "-/lib/types";

import type { EquityFilter } from "./views/filters/types";
import type { EquitySortKey } from "./views/sort/types";

export interface BaseEquityResponse {
  id: string;
  name: string;
  listedDate: string;
}

export interface EquityResponse extends BaseEquityResponse {
  sectorId: EquitySectorId;
  sector: EquitySectorName;
  subsectorId: EquitySubsectorId;
  subsector: EquitySubsectorName;
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

export type EquityParams = Params<EquityFilter, EquitySortKey>;

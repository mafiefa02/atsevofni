import {
  equityResponseToEquity,
  equityResponseToEquitySector,
  equityResponseToEquitySubsector,
} from "./transformers";
import type {
  BaseEquityResponse,
  Equity,
  EquityResponse,
  EquitySector,
  EquitySubsector,
} from "./types";

export class BaseEquityModel {
  private readonly equity: Equity;

  constructor(response: BaseEquityResponse) {
    this.equity = equityResponseToEquity(response);
  }

  public getEquity = <K extends keyof Equity>(key: K): Equity[K] => {
    return this.equity[key];
  };
}

export class EquityModel extends BaseEquityModel {
  private readonly sector: EquitySector;
  private readonly subsector: EquitySubsector;

  constructor(response: EquityResponse) {
    super(response);
    this.sector = equityResponseToEquitySector(response);
    this.subsector = equityResponseToEquitySubsector(response);
  }

  public getEquitySector = <K extends keyof EquitySector>(
    key: K,
  ): EquitySector[K] => {
    return this.sector[key];
  };

  public getEquitySubsector = <K extends keyof EquitySubsector>(
    key: K,
  ): EquitySubsector[K] => {
    return this.subsector[key];
  };
}

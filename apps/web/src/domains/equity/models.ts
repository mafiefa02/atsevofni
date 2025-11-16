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
  readonly equity: Equity;

  constructor(response: BaseEquityResponse) {
    this.equity = equityResponseToEquity(response);
  }

  public getEquity = <K extends keyof Equity>(key: K) => {
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

  public getEquity = <K extends keyof Equity>(key: K) => {
    return this.equity[key];
  };

  public getEquitySector = <K extends keyof EquitySector>(key: K) => {
    return this.sector[key];
  };

  public getEquitySubsector = <K extends keyof EquitySubsector>(key: K) => {
    return this.subsector[key];
  };
}

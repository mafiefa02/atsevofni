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

  public getEquity = (key: keyof Equity) => {
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

  public getEquitySector = (key: keyof EquitySector) => {
    return this.sector[key];
  };

  public getEquitySubsector = (key: keyof EquitySubsector) => {
    return this.subsector[key];
  };
}

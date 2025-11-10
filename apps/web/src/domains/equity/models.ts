import {
  equityResponseToEquity,
  equityResponseToEquitySector,
  equityResponseToEquitySubsector,
} from "./transformers";
import type {
  Equity,
  EquityResponse,
  EquitySector,
  EquitySubsector,
} from "./types";

export class EquityModel {
  private readonly equity: Equity;
  private readonly sector: EquitySector;
  private readonly subsector: EquitySubsector;

  constructor(response: EquityResponse) {
    this.equity = equityResponseToEquity(response);
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

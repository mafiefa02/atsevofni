import { EquityServices } from "-/domains/equity/services";
import { PriceServices } from "-/domains/price/services";

export class APIServices {
  private priceServices: PriceServices;
  private equityServices: EquityServices;

  constructor(baseUrl: string) {
    this.priceServices = new PriceServices(baseUrl);
    this.equityServices = new EquityServices(baseUrl);
  }

  public get price() {
    return this.priceServices;
  }

  public get equity() {
    return this.equityServices;
  }
}

export const services = new APIServices(import.meta.env.VITE_API_BASE_URL);

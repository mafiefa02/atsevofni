import { PriceServices } from "-/domains/price/services";

export class APIServices {
  private priceServices: PriceServices;

  constructor(baseUrl: string) {
    this.priceServices = new PriceServices(baseUrl);
  }

  public get price() {
    return this.priceServices;
  }
}

export const services = new APIServices(import.meta.env.VITE_API_BASE_URL);

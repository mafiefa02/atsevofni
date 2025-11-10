import { priceResponseToPrice } from "./transformers";
import type { Price, PriceResponse } from "./types";

export class PriceModel {
  private readonly price: Price;

  constructor(response: PriceResponse) {
    this.price = priceResponseToPrice(response);
  }

  public getPrice = <K extends keyof Price>(key: K) => {
    return this.price[key];
  };
}

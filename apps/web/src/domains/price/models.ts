import { priceResponseToPrice } from "./transformers";
import type { Price, PriceResponse } from "./types";

export class PriceModel {
  private readonly price: Price;

  constructor(response: PriceResponse) {
    this.price = priceResponseToPrice(response);
  }

  public getUniqueId = () =>
    `${this.price.equityId}-${this.price.date.format()}`;

  public getPrice = <K extends keyof Price>(key: K): Price[K] => {
    return this.price[key];
  };
}

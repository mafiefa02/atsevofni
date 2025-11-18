import { priceResponseToPrice } from "./transformers";
import type { Price, PriceResponse } from "./types";

export class PriceModel {
  private readonly price: Price;

  constructor(response: PriceResponse) {
    this.price = priceResponseToPrice(response);
  }

  public getPrice = (key: keyof Price) => {
    return this.price[key];
  };
}

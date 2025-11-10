import { queryOptions } from "@tanstack/react-query";

import { responseToModel } from "-/lib/transformers";
import type { Params, Response } from "-/lib/types";

import { PriceModel } from "./models";
import { priceFiltersToFilterParam } from "./transformers";
import type { PriceFilter, PriceResponse } from "./types";

export class PriceServices {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private generateFilterSearchParams(filters?: PriceFilter): string {
    if (!filters) return "";

    const filterParams = priceFiltersToFilterParam(filters);
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined) {
        params.set(key, String(value));
      }
    }

    return params.toString();
  }

  private getAllPrices = async (
    params?: Params<PriceFilter>,
  ): Promise<Response<PriceModel[]>> => {
    const filterSearchParams = this.generateFilterSearchParams(params?.filters);
    const response = await fetch(
      `${this.baseUrl}/prices?${filterSearchParams}`,
    );

    if (!response.ok) {
      const error = new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`,
      );
      throw error;
    }

    const result: Response<PriceResponse[]> = await response.json();

    return responseToModel(result, PriceModel);
  };

  public get query() {
    return {
      getAllPrices: (params?: Params<PriceFilter>) =>
        queryOptions({
          queryKey: ["prices", params],
          queryFn: () => this.getAllPrices(params),
        }),
    };
  }
}

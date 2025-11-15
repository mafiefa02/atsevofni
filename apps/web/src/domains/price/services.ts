import { type QueryKey, queryOptions } from "@tanstack/react-query";

import {
  paginationParamsToParams,
  paramsToStringParams,
  responseToModel,
  sortParamsToParams,
  transformRawResponse,
} from "-/lib/transformers";
import type { APIRawResponse, APIResponse, Params } from "-/lib/types";

import { PriceModel } from "./models";
import type { PriceResponse } from "./types";
import { priceFiltersToParams } from "./view-filters/transformers";
import type { PriceFilter } from "./view-filters/types";
import { priceSortKeyToParamMap } from "./view-sort/constants";
import type { PriceSortKey } from "./view-sort/types";

export class PriceServices {
  private readonly url: string;

  constructor(baseUrl: string) {
    this.url = `${baseUrl}/prices`;
  }

  private getAllPrices = async (
    params?: Params<PriceFilter, PriceSortKey>,
  ): Promise<APIResponse<PriceModel[]>> => {
    const filterSearchParams = priceFiltersToParams(params?.filters);
    const paginationParams = paginationParamsToParams(params?.pagination);
    const sortParams = sortParamsToParams(params?.sort, priceSortKeyToParamMap);

    const queryParams = paramsToStringParams({
      filters: filterSearchParams,
      pagination: paginationParams,
      sort: sortParams,
    });

    const response = await fetch(`${this.url}?${queryParams}`);

    if (!response.ok) {
      const error = new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`,
      );
      throw error;
    }

    const result: APIRawResponse<PriceResponse[]> = await response.json();
    const transformedResponse = transformRawResponse(result);

    return responseToModel(transformedResponse, PriceModel);
  };

  public get query() {
    return {
      getAllPrices: (params?: Params<PriceFilter, PriceSortKey>) =>
        queryOptions({
          queryKey: ["prices", params] as QueryKey,
          queryFn: () => this.getAllPrices(params),
        }),
    };
  }
}

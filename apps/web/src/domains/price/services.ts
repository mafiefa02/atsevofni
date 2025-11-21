import {
  type QueryKey,
  mutationOptions,
  queryOptions,
} from "@tanstack/react-query";

import {
  paginationParamsToParams,
  paramsToStringParams,
  responseToModel,
  sortParamsToParams,
  transformRawResponse,
} from "-/lib/transformers";
import type { APIRawResponse, APIResponse } from "-/lib/types";

import { PriceModel } from "./models";
import type { PriceParams, PriceResponse } from "./types";
import {
  priceFiltersToBody,
  priceFiltersToParams,
} from "./views/filters/transformers";
import { priceSortKeyToParamMap } from "./views/sort/constants";

export class PriceServices {
  private readonly url: string;

  constructor(baseUrl: string) {
    this.url = `${baseUrl}/transactions`;
  }

  private getAllPrices = async (
    params?: PriceParams,
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

  private generatePricesPdf = async (
    params?: Omit<PriceParams, "pagination">,
  ): Promise<{ blob: Blob; filename: string }> => {
    const filters = priceFiltersToBody(params?.filters);

    const body = { filters, sort: params?.sort };

    const response = await fetch(`${this.url}/generate`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`,
      );
      throw error;
    }

    const blob = await response.blob();

    const filename =
      response.headers.get("Content-Disposition")?.split("filename=")[1] ||
      "download.pdf";

    return { blob, filename };
  };

  public get mutation() {
    return {
      generatePricesPdf: (params?: Omit<PriceParams, "pagination">) =>
        mutationOptions({
          mutationFn: () => this.generatePricesPdf(params),
        }),
    };
  }

  public get query() {
    return {
      getAllPrices: (params?: PriceParams) =>
        queryOptions({
          queryKey: ["prices", params] as QueryKey,
          queryFn: () => this.getAllPrices(params),
        }),
    };
  }
}

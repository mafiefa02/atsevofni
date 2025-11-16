import { type QueryKey, queryOptions } from "@tanstack/react-query";

import {
  paginationParamsToParams,
  paramsToStringParams,
  responseToModel,
  sortParamsToParams,
  transformRawResponse,
} from "-/lib/transformers";
import type { APIRawResponse, APIResponse } from "-/lib/types";

import { BaseEquityModel, EquityModel } from "./models";
import type {
  BaseEquityResponse,
  EquityId,
  EquityParams,
  EquityResponse,
} from "./types";
import { equityFiltersToParams } from "./views/filters/transformers";
import { equitySortKeyToParamMap } from "./views/sort/constants";

export class EquityServices {
  private readonly url: string;

  constructor(baseUrl: string) {
    this.url = `${baseUrl}/equities`;
  }

  private getAllEquities = async (
    params?: EquityParams,
  ): Promise<APIResponse<BaseEquityModel[]>> => {
    const filterSearchParams = equityFiltersToParams(params?.filters);
    const paginationParams = paginationParamsToParams(params?.pagination);
    const sortParams = sortParamsToParams(
      params?.sort,
      equitySortKeyToParamMap,
    );

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

    const result: APIRawResponse<BaseEquityResponse[]> = await response.json();
    const transformedResponse = transformRawResponse(result);

    return responseToModel(transformedResponse, BaseEquityModel);
  };

  private getEquityById = async (
    id: EquityId,
  ): Promise<APIResponse<EquityModel>> => {
    const response = await fetch(`${this.url}/${id}`);

    if (!response.ok) {
      const error = new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`,
      );
      throw error;
    }

    const result: APIRawResponse<EquityResponse> = await response.json();
    const transformedResponse = transformRawResponse(result);

    return responseToModel(transformedResponse, EquityModel);
  };

  public get query() {
    return {
      getAllEquities: (params?: EquityParams) =>
        queryOptions({
          queryKey: ["equities", params] as QueryKey,
          queryFn: () => this.getAllEquities(params),
        }),
      getEquityById: (id: EquityId) =>
        queryOptions({
          queryKey: ["equities", id] as QueryKey,
          queryFn: () => this.getEquityById(id),
        }),
    };
  }
}

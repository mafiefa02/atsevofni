import { type QueryKey, queryOptions } from "@tanstack/react-query";

import {
  paginationParamsToParams,
  paramsToStringParams,
  responseToModel,
  sortParamsToParams,
  transformRawResponse,
} from "-/lib/transformers";
import type { APIRawResponse, APIResponse, Params } from "-/lib/types";

import { EquityModel } from "./models";
import type { EquityResponse } from "./types";
import { equityFiltersToParams } from "./views/filters/transformers";
import type { EquityFilter } from "./views/filters/types";
import { equitySortKeyToParamMap } from "./views/sort/constants";
import type { EquitySortKey } from "./views/sort/types";

export class EquityServices {
  private readonly url: string;

  constructor(baseUrl: string) {
    this.url = `${baseUrl}/equities`;
  }

  private getAllEquities = async (
    params?: Params<EquityFilter, EquitySortKey>,
  ): Promise<APIResponse<EquityModel[]>> => {
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

    const result: APIRawResponse<EquityResponse[]> = await response.json();
    const transformedResponse = transformRawResponse(result);

    return responseToModel(transformedResponse, EquityModel);
  };

  public get query() {
    return {
      getAllEquities: (params?: Params<EquityFilter, EquitySortKey>) =>
        queryOptions({
          queryKey: ["equities", params] as QueryKey,
          queryFn: () => this.getAllEquities(params),
        }),
    };
  }
}

import { queryOptions } from "@tanstack/react-query";

import {
  paginationParamsToParams,
  paramsToStringParams,
  responseToModel,
  sortParamsToParams,
} from "-/lib/transformers";
import type { APIResponse, Params } from "-/lib/types";

import { EquityModel } from "./models";
import type { EquityResponse } from "./types";
import { equityFiltersToParams } from "./view-filters/transformers";
import type { EquityFilter } from "./view-filters/types";
import { equitySortKeyToParamMap } from "./view-sort/constants";
import type { EquitySortKey } from "./view-sort/types";

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
      equitySortKeyToParamMap,
      params?.sort,
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

    const result: APIResponse<EquityResponse[]> = await response.json();

    return responseToModel(result, EquityModel);
  };

  public get query() {
    return {
      getAllEquities: (params?: Params<EquityFilter, EquitySortKey>) =>
        queryOptions({
          queryKey: ["equities", params],
          queryFn: () => this.getAllEquities(params),
        }),
    };
  }
}

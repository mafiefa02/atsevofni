import { queryOptions } from "@tanstack/react-query";

import {
  paginationParamsToParams,
  paramsToStringParams,
  responseToModel,
} from "-/lib/transformers";
import type { Params, Response } from "-/lib/types";

import { EquityModel } from "./models";
import type { EquityResponse } from "./types";
import { equityFiltersToParams } from "./view-filters/transformers";
import type { EquityFilter } from "./view-filters/types";

export class EquityServices {
  private readonly url: string;

  constructor(baseUrl: string) {
    this.url = `${baseUrl}/equities`;
  }

  private getAllEquities = async (
    params?: Params<EquityFilter>,
  ): Promise<Response<EquityModel[]>> => {
    const filterSearchParams = equityFiltersToParams(params?.filters);
    const paginationParams = paginationParamsToParams(params?.pagination);

    const queryParams = paramsToStringParams({
      filters: filterSearchParams,
      pagination: paginationParams,
      sort: null,
    });

    const response = await fetch(`${this.url}?${queryParams}`);

    if (!response.ok) {
      const error = new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`,
      );
      throw error;
    }

    const result: Response<EquityResponse[]> = await response.json();

    return responseToModel(result, EquityModel);
  };

  public get query() {
    return {
      getAllEquities: (params?: Params<EquityFilter>) =>
        queryOptions({
          queryKey: ["equities", params],
          queryFn: () => this.getAllEquities(params),
        }),
    };
  }
}

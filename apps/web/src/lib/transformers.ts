import { paginationParamsKeyNameMap, sortParamsKeyNameMap } from "./constants";
import { FormattableDate } from "./models";
import type {
  APIRawResponse,
  APIResponse,
  ModelConstructor,
  PaginationParams,
  Params,
  SortParams,
} from "./types";
import { createValueGetter } from "./utils";

export function responseToModel<T, D>(
  response: APIResponse<D>,
  Model: ModelConstructor<T, D>,
  ...args: unknown[]
): APIResponse<T>;
export function responseToModel<T, D>(
  response: APIResponse<D[]>,
  Model: ModelConstructor<T, D>,
  ...args: unknown[]
): APIResponse<T[]>;
export function responseToModel<T, D>(
  response: APIResponse<D | D[]>,
  Model: ModelConstructor<T, D>,
  ...args: unknown[]
): APIResponse<T | T[]> {
  return {
    ...response,
    data:
      response.data instanceof Array
        ? response.data.map((data) => new Model(data, ...args))
        : new Model(response.data, ...args),
  };
}

export function transformRawResponse<D>(
  response: APIRawResponse<D>,
): APIResponse<D> {
  if (response.meta.pagination === null) {
    return {
      data: response.data,
      meta: {
        pagination: null,
        lastUpdated: new FormattableDate(response.meta.last_updated),
      },
    };
  }
  return {
    data: response.data,
    meta: {
      pagination: {
        params: response.meta.pagination.params,
        totalItems: response.meta.pagination.total_items,
        totalPage: response.meta.pagination.total_pages,
      },
      lastUpdated: new FormattableDate(response.meta.last_updated),
    },
  };
}

export const paginationParamsToParams = (
  pagination: PaginationParams | undefined,
): URLSearchParams => {
  const params = new URLSearchParams();
  const getParamName = createValueGetter(paginationParamsKeyNameMap);

  if (!pagination) return params;

  if (typeof pagination.enablePagination === "boolean") {
    params.set(
      getParamName("enablePagination"),
      String(pagination.enablePagination),
    );
  }

  if (pagination.page && !isNaN(pagination.page)) {
    params.set(getParamName("page"), String(pagination.page));
  }

  if (pagination.limit && !isNaN(pagination.limit)) {
    params.set(getParamName("limit"), String(pagination.limit));
  }

  return params;
};

export const sortParamsToParams = <D, T extends keyof D>(
  sort: SortParams<T> | undefined,
  keyMap: D,
): URLSearchParams => {
  const params = new URLSearchParams();
  const getParamName = createValueGetter(sortParamsKeyNameMap);

  if (!sort) return params;

  if (sort.order) {
    params.set(getParamName("order"), sort.order);
  }

  if (sort.sortBy) {
    params.set(getParamName("sortBy"), String(keyMap[sort.sortBy]));
  }

  return params;
};

export const paramsToStringParams = <F, S>(
  arg: Record<keyof Params<F, S>, URLSearchParams | null>,
) => {
  return Object.values(arg)
    .filter((param) => param !== null)
    .map((param) => param.toString())
    .filter(Boolean)
    .join("&");
};

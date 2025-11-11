import { paginationParamsKeyNameMap } from "./constants";
import type {
  ModelConstructor,
  PaginationParams,
  Params,
  Response,
} from "./types";
import { createValueGetter } from "./utils";

export function responseToModel<T, D>(
  response: Response<D>,
  Model: ModelConstructor<T, D>,
  ...args: unknown[]
): Response<T>;
export function responseToModel<T, D>(
  response: Response<D[]>,
  Model: ModelConstructor<T, D>,
  ...args: unknown[]
): Response<T[]>;
export function responseToModel<T, D>(
  response: Response<D | D[]>,
  Model: ModelConstructor<T, D>,
  ...args: unknown[]
): Response<T | T[]> {
  return {
    ...response,
    data:
      response.data instanceof Array
        ? response.data.map((data) => new Model(data, ...args))
        : new Model(response.data, ...args),
  };
}

export const paginationParamsToParams = (
  pagination?: PaginationParams,
): URLSearchParams => {
  const params = new URLSearchParams();
  const getParamName = createValueGetter(paginationParamsKeyNameMap);

  if (!pagination) return params;

  if (typeof pagination.disable === "boolean") {
    params.set(getParamName("disable"), String(pagination.disable));
  }

  if (pagination.page && !isNaN(pagination.page)) {
    params.set(getParamName("page"), String(pagination.page));
  }

  if (pagination.limit && !isNaN(pagination.limit)) {
    params.set(getParamName("limit"), String(pagination.limit));
  }

  return params;
};

export const paramsToStringParams = <T>(
  arg: Record<keyof Params<T>, URLSearchParams | null>,
) => {
  return Object.values(arg)
    .filter((param) => param !== null)
    .map((param) => param.toString())
    .filter(Boolean)
    .join("&");
};

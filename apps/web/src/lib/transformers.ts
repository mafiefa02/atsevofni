import type { ModelConstructor, Response } from "./types";

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

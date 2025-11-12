import type { PaginationParams, SortParams } from "./types";

export const IS_SERVER = typeof window === "undefined";

export const paginationParamsKeyNameMap: Record<
  keyof PaginationParams,
  string
> = {
  enablePagination: "enable_pagination",
  limit: "limit",
  page: "page",
};

export const sortParamsKeyNameMap: Record<keyof SortParams, string> = {
  order: "order",
  ""
}

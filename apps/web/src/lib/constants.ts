import type { PaginationParams, SortOrder, SortParams } from "./types";

export const IS_SERVER = typeof window === "undefined";

export const paginationParamsKeyNameMap: Record<
  keyof PaginationParams,
  string
> = {
  enablePagination: "enable_pagination",
  limit: "limit",
  page: "page",
};

export const sortParamsKeyNameMap: Record<keyof SortParams<unknown>, string> = {
  order: "order",
  sortBy: "sort_by",
};

export const sortOrderLabelMap: Record<SortOrder, string> = {
  asc: "Ascending",
  desc: "Descending",
};

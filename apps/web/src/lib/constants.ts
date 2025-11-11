import type { PaginationParams } from "./types";

export const IS_SERVER = typeof window === "undefined";

export const paginationParamsKeyNameMap: Record<
  keyof PaginationParams,
  string
> = {
  disable: "disable",
  limit: "limit",
  page: "page",
};

import type { EquityId } from "-/domains/equity/types";
import type { PriceFilter } from "-/domains/price/view-filters/types";

// Helper types
export type UniqueBrand<T> = T & { readonly __brand: unique symbol };
export type ModelConstructor<T, D> = new (data: D, ...args: unknown[]) => T;

// General types
export interface APIResponseMeta {
  pagination: PaginationParams;
  totalItems: number;
  totalPage: number;
}

export interface APIResponse<Data> {
  data: Data;
  meta: APIResponseMeta;
}

export interface PaginationParams {
  enablePagination?: boolean;
  page?: number;
  limit?: number;
}

export interface SortParams<SortKey> {
  sortBy?: SortKey;
  order?: "asc" | "desc";
}

export interface Params<FilterParams, SortFields> {
  filters?: FilterParams;
  sort?: SortParams<SortFields>;
  pagination?: PaginationParams;
}

// Domain relationship types
export type PriceEquityId = EquityId;
export type PriceViewFilterKey = keyof PriceFilter;

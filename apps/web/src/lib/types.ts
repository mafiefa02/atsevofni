import type { EquityId } from "-/domains/equity/types";
import type { PriceFilter } from "-/domains/price/views/filters/types";

// Helper types
export type UniqueBrand<T> = T & { readonly __brand: unique symbol };
export type ModelConstructor<T, D> = new (data: D, ...args: unknown[]) => T;

// General types
export interface APIRawResponse<Data> {
  data: Data;
  meta: {
    pagination: {
      enable_pagination: boolean;
      page: number;
      limit: number;
    };
    total_items: number;
    total_pages: number;
  };
}

export interface APIResponseMeta {
  pagination: Record<
    keyof PaginationParams,
    NonNullable<PaginationParams[keyof PaginationParams]>
  >;
  totalItems: number;
  totalPage: number;
}

export interface APIResponse<Data> {
  data: Data;
  meta: APIResponseMeta;
}

export interface PaginationParams {
  enablePagination: boolean | null;
  page: number | null;
  limit: number | null;
}

export type SortOrder = "asc" | "desc";

export interface SortParams<SortKey> {
  sortBy: SortKey | null;
  order: SortOrder | null;
}

export interface Params<FilterParams, SortFields> {
  filters?: FilterParams;
  sort?: SortParams<SortFields>;
  pagination?: PaginationParams;
}

// Domain relationship types
export type PriceEquityId = EquityId;
export type PriceViewFilterKey = keyof PriceFilter;

// General component prop types
export interface IconProps extends React.ComponentPropsWithRef<"svg"> {
  size?: number;
  color?: string;
  background?: string;
  opacity?: number;
  rotation?: number;
  shadow?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  padding?: number;
  className?: string;
}

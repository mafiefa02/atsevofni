import { parseAsBoolean, parseAsInteger, useQueryStates } from "nuqs";

import { DEFAULT_PAGINATION_LIMIT } from "-/lib/constants";
import type { PaginationParams } from "-/lib/types";

const paginationQueryStates = {
  enablePagination: parseAsBoolean,
  page: parseAsInteger,
  limit: parseAsInteger.withDefault(DEFAULT_PAGINATION_LIMIT),
} satisfies Record<keyof PaginationParams, unknown>;

export const usePriceViewPagination = () =>
  useQueryStates(paginationQueryStates, {
    history: "replace",
  });

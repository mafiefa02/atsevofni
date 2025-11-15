import { parseAsBoolean, parseAsInteger, useQueryStates } from "nuqs";

import type { PaginationParams } from "-/lib/types";

const paginationQueryStates = {
  enablePagination: parseAsBoolean,
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
} satisfies Record<keyof PaginationParams, unknown>;

export const usePriceViewPagination = () =>
  useQueryStates(paginationQueryStates, {
    history: "replace",
  });

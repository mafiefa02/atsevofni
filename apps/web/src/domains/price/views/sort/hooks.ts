import { parseAsStringLiteral, useQueryStates } from "nuqs";

import { DEFAULT_SORT_ORDER } from "-/lib/constants";
import type { SortParams } from "-/lib/types";

import { priceSortKeyToLabel } from "./constants";
import type { PriceSortKey } from "./types";

const sortQueryStates = {
  sortBy: parseAsStringLiteral<PriceSortKey>(
    Object.keys(priceSortKeyToLabel) as PriceSortKey[],
  ),
  order: parseAsStringLiteral(["asc", "desc"]).withDefault(DEFAULT_SORT_ORDER),
} satisfies Record<keyof SortParams<PriceSortKey>, unknown>;

export const usePriceViewSort = () =>
  useQueryStates(sortQueryStates, {
    history: "replace",
  });

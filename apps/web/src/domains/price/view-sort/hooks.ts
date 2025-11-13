import { parseAsStringLiteral, useQueryStates } from "nuqs";

import type { SortParams } from "-/lib/types";

import { priceSortKeyToLabel } from "./constants";
import type { PriceSortKey } from "./types";

const sortQueryStates = {
  sortBy: parseAsStringLiteral<PriceSortKey>(
    Object.keys(priceSortKeyToLabel) as PriceSortKey[],
  ),
  order: parseAsStringLiteral(["asc", "desc"]),
} satisfies Record<keyof SortParams<PriceSortKey>, unknown>;

export const usePriceViewSort = () =>
  useQueryStates(sortQueryStates, {
    history: "replace",
  });

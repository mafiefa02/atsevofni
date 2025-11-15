import { priceSortKeyToLabel } from "../../sort/constants";
import type { PriceSortKey } from "../../sort/types";

export const TABLE_COLUMN_KEYS = Object.keys(
  priceSortKeyToLabel,
) as PriceSortKey[];

export const NUM_OF_COLUMNS = TABLE_COLUMN_KEYS.length;

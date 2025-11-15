import { createValueGetter } from "-/lib/utils";

import { equityFilterKeyNameMap } from "./constants";
import type { EquityFilter } from "./types";

export const equityFiltersToParams = (
  filter?: EquityFilter,
): URLSearchParams => {
  const params = new URLSearchParams();
  const getParamName = createValueGetter(equityFilterKeyNameMap);

  if (!filter) return params;

  if (filter.search) {
    params.set(getParamName("search"), filter.search);
  }

  if (filter.sector) {
    params.set(getParamName("sector"), filter.sector);
  }

  if (filter.subsector) {
    params.set(getParamName("subsector"), filter.subsector);
  }

  return params;
};

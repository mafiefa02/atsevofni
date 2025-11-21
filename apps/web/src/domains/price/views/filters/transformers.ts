import { createValueGetter } from "-/lib/utils";

import { priceFilterKeyNameMap } from "./constants";
import type { PriceFilter } from "./types";

export const priceFiltersToParams = (
  filter: PriceFilter | undefined,
): URLSearchParams => {
  const params = new URLSearchParams();
  const getParamName = createValueGetter(priceFilterKeyNameMap);

  if (!filter) return params;

  if (filter.equities && filter.equities.length > 0) {
    filter.equities.forEach((equity) =>
      params.append(getParamName("equities"), equity),
    );
  }

  if (filter.equitySector) {
    params.set(getParamName("equitySector"), filter.equitySector);
  }

  if (filter.equitySubsector) {
    params.set(getParamName("equitySubsector"), filter.equitySubsector);
  }

  if (typeof filter.latest === "boolean") {
    params.set(getParamName("latest"), String(filter.latest));
  }

  if (filter.startDate) {
    params.set(getParamName("startDate"), filter.startDate.format());
  }

  if (filter.endDate) {
    params.set(getParamName("endDate"), filter.endDate.format());
  }

  return params;
};

export const priceFiltersToBody = (
  filter: PriceFilter | undefined,
): Record<string, unknown> => {
  const body: Record<string, unknown> = {};
  const getParamName = createValueGetter(priceFilterKeyNameMap);

  if (!filter) return body;

  if (filter.equities && filter.equities.length > 0) {
    body[getParamName("equities")] = filter.equities;
  }

  if (filter.equitySector) {
    body[getParamName("equitySector")] = filter.equitySector;
  }

  if (filter.equitySubsector) {
    body[getParamName("equitySubsector")] = filter.equitySubsector;
  }

  if (typeof filter.latest === "boolean") {
    body[getParamName("latest")] = filter.latest;
  }

  if (filter.startDate) {
    body[getParamName("startDate")] = filter.startDate.format();
  }

  if (filter.endDate) {
    body[getParamName("endDate")] = filter.endDate.format();
  }

  return body;
};

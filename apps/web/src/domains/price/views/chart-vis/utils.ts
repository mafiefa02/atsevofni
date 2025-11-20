import { extent } from "@visx/vendor/d3-array";
import type { ScaleOrdinal, ScaleTime } from "@visx/vendor/d3-scale";
import type { TooltipData } from "@visx/xychart";

import type { PriceModel } from "../../models";
import type { XDomain, YDomain } from "./types";

export const accessors = {
  xAccessor: (d: PriceModel) => d.getPrice("date"),
  yAccessor: (d: PriceModel) => d.getPrice("closing").valueOf(),
  openAccessor: (d: PriceModel) => d.getPrice("opening").valueOf(),
  highAccessor: (d: PriceModel) => d.getPrice("high").valueOf(),
  lowAccessor: (d: PriceModel) => d.getPrice("low").valueOf(),
  closeAccessor: (d: PriceModel) => d.getPrice("closing").valueOf(),
};

export const groupByEquity = (data: PriceModel[] | undefined) => {
  const groups: Record<string, PriceModel[]> = {};
  if (!data) return groups;

  data.forEach((model) => {
    const equityId = String(model.getPrice("equityId"));
    if (!groups[equityId]) groups[equityId] = [];
    groups[equityId].push(model);
  });
  return groups;
};

export const getGlobalDomain = (data: PriceModel[]): [XDomain[], YDomain[]] => {
  const [xMin, xMax] = extent(data, accessors.xAccessor);
  const [yMin, yMax] = extent(data, accessors.yAccessor);

  const xDomain = xMin && xMax ? [xMin, xMax] : [new Date(), new Date()];
  const yDomain = [Math.max(0, (yMin || 0) * 0.85), (yMax || 100) * 1.15];

  return [xDomain, yDomain];
};

export const getBarAndWickWidth = (xScale: ScaleTime<number, number>) => {
  const [startDate, endDate] = xScale.domain();

  const xRange = xScale.range();

  const currentChartWidth = xRange[1] - xRange[0];

  const msInView = endDate.valueOf() - startDate.valueOf();

  const msPerDay = 1000 * 60 * 60 * 24;

  const daysInView = Math.max(1, msInView / msPerDay);

  const barWidth = Math.max(3, (currentChartWidth / daysInView) * 0.65);
  const wickWidth = Math.min(12, Math.max(2, barWidth * 0.15));

  const halfWidth = barWidth / 2;

  return { barWidth, wickWidth, halfWidth };
};

export const getTooltipItem = (
  tooltipData: TooltipData<PriceModel>,
  colorScale: ScaleOrdinal<string, string, never> | undefined,
) => {
  return Object.entries(tooltipData.datumByKey)
    .map(([key, entry]) => {
      if (!entry) return null;
      return {
        key: key,
        price: accessors.yAccessor(entry.datum),
        color: colorScale ? colorScale(key) : "var(--foreground)",
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => b.price - a.price);
};

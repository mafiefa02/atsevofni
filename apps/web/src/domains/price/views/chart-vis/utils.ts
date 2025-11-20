import { localPoint } from "@visx/event";
import type { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { bisector } from "@visx/vendor/d3-array";
import type {
  ScaleLinear,
  ScaleOrdinal,
  ScaleTime,
} from "@visx/vendor/d3-scale";
import type { TooltipData } from "@visx/xychart";

import type { PriceModel } from "../../models";
import { MAX_WICK_WIDTH, MIN_BAR_WIDTH, MS_PER_DAY } from "./constants";
import type {
  GraphSize,
  Margin,
  TooltipDataPayload,
  XDomain,
  YDomain,
} from "./types";

export const isCompact = (width: number): boolean => width < 768;

export const accessors = {
  xAccessor: (d: PriceModel) => d.getPrice("date"),
  yAccessor: (d: PriceModel) => d.getPrice("closing").valueOf(),
  openAccessor: (d: PriceModel) => d.getPrice("opening").valueOf(),
  highAccessor: (d: PriceModel) => d.getPrice("high").valueOf(),
  lowAccessor: (d: PriceModel) => d.getPrice("low").valueOf(),
  closeAccessor: (d: PriceModel) => d.getPrice("closing").valueOf(),
};

export const getTimestamp = (d: PriceModel) => accessors.xAccessor(d).getTime();
export const bisectDate = bisector<PriceModel, Date>(accessors.xAccessor).left;

export const groupByEquity = (data: PriceModel[] | undefined) => {
  const groups: Record<string, PriceModel[]> = {};
  if (!data || data.length === 0) return groups;

  for (let i = 0; i < data.length; i++) {
    const model = data[i];
    const equityId = String(model.getPrice("equityId"));

    if (groups[equityId] === undefined) {
      groups[equityId] = [];
    }
    groups[equityId].push(model);
  }

  return groups;
};

export const getGraphInnerSize = (size: GraphSize, margin: Margin) => ({
  innerWidth: size.width - margin.left - margin.right,
  innerHeight: size.height - margin.top - margin.bottom,
});

export const getGlobalDomain = (data: PriceModel[]): [XDomain[], YDomain[]] => {
  if (data.length === 0) {
    const now = new Date();
    return [
      [now, now],
      [0, 100],
    ];
  }

  let xMin = accessors.xAccessor(data[0]);
  let xMax = xMin;
  let yMin = accessors.yAccessor(data[0]);
  let yMax = yMin;

  for (let i = 1; i < data.length; i++) {
    const d = data[i];
    const xVal = accessors.xAccessor(d);
    const yVal = accessors.yAccessor(d);

    if (xVal < xMin) xMin = xVal;
    if (xVal > xMax) xMax = xVal;
    if (yVal < yMin) yMin = yVal;
    if (yVal > yMax) yMax = yVal;
  }

  return [
    [xMin, xMax],
    [Math.max(0, yMin * 0.85), yMax * 1.15],
  ];
};

export const getBarAndWickWidth = (xScale: ScaleTime<number, number>) => {
  const [startDate, endDate] = xScale.domain();
  const [rangeMin, rangeMax] = xScale.range();

  const currentChartWidth = rangeMax - rangeMin;
  const msInView = endDate.valueOf() - startDate.valueOf();
  const daysInView = Math.max(1, msInView / MS_PER_DAY);

  const barWidth = Math.max(
    MIN_BAR_WIDTH,
    (currentChartWidth / daysInView) * 0.65,
  );
  const wickWidth = Math.min(MAX_WICK_WIDTH, Math.max(2, barWidth * 0.15));

  return { barWidth, wickWidth, halfWidth: barWidth / 2 };
};

export const getTooltipItem = (
  tooltipData: TooltipData<PriceModel>,
  colorScale: ScaleOrdinal<string, string, never> | undefined,
) => {
  return Object.entries(tooltipData.datumByKey)
    .filter(
      (entry): entry is [string, TooltipDataPayload["nearestDatum"]] =>
        !!entry[1],
    )
    .map(([key, entry]) => ({
      key,
      price: accessors.yAccessor(entry.datum),
      color: colorScale ? colorScale(key) : "var(--foreground)",
    }))
    .sort((a, b) => b.price - a.price);
};

export const getTooltipPayload = ({
  tooltipData,
  data,
}: {
  tooltipData?: PriceModel;
  data: Record<string, PriceModel[]>;
}): TooltipDataPayload | null => {
  if (!tooltipData) return null;

  const currentDate = accessors.xAccessor(tooltipData);
  const datumByKey: TooltipDataPayload["datumByKey"] = {};

  for (const key in data) {
    const series = data[key];
    const index = bisectDate(series, currentDate, 1);
    const d = series[index - 1];

    if (d) {
      datumByKey[key] = {
        datum: d,
        index: index - 1,
        key,
      };
    }
  }

  return {
    nearestDatum: {
      datum: tooltipData,
      index: 0,
      key: "current",
      distance: 0,
    },
    datumByKey,
  };
};

export const handleChartTooltip = ({
  event,
  data,
  xScale,
  yScale,
  showTooltip,
}: {
  event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>;
  data: Record<string, PriceModel[]>;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  showTooltip: WithTooltipProvidedProps<PriceModel>["showTooltip"];
}) => {
  const { x } = localPoint(event) || { x: 0 };
  const x0 = xScale.invert(x);

  let dataArr: PriceModel[] | undefined;
  for (const key in data) {
    dataArr = data[key];
    break;
  }

  if (!dataArr || dataArr.length === 0) return;

  const index = bisectDate(dataArr, x0, 1);
  const d0 = dataArr[index - 1];
  const d1 = dataArr[index];

  let d = d0;

  if (d1) {
    const x0Val = x0.valueOf();
    const d0Val = accessors.xAccessor(d0).valueOf();
    const d1Val = accessors.xAccessor(d1).valueOf(); // Cache execution

    const dLeft = x0Val - d0Val;
    const dRight = d1Val - x0Val;

    if (dLeft > dRight) {
      d = d1;
    }
  }

  const snapX = xScale(accessors.xAccessor(d));
  const snapY = yScale(accessors.yAccessor(d));

  showTooltip({
    tooltipData: d,
    tooltipLeft: snapX,
    tooltipTop: snapY,
  });
};

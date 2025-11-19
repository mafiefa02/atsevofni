import { useSuspenseQuery } from "@tanstack/react-query";
import { Brush } from "@visx/brush";
import type BaseBrush from "@visx/brush/lib/BaseBrush";
import type { Bounds } from "@visx/brush/lib/types";
import { Group } from "@visx/group";
import { LegendOrdinal } from "@visx/legend";
import { PatternLines } from "@visx/pattern";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleOrdinal, scaleTime } from "@visx/scale";
import { AreaClosed } from "@visx/shape";
import { extent, max, min } from "@visx/vendor/d3-array";
import { Axis, LineSeries, Tooltip, XYChart } from "@visx/xychart";
import { useId, useMemo, useRef, useState } from "react";

import type { PriceModel } from "-/domains/price/models";
import { Currency, FormattableDate } from "-/lib/models";
import { services } from "-/lib/services";

import { usePriceViewFilters } from "../../../filters/hooks";
import { CandlestickSeries } from "./candlestick";
import { BrushHandle } from "./handle";
import { PriceChartTooltip } from "./tooltip";

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

const accessors = {
  xAccessor: (d: PriceModel) => d.getPrice("date"),
  yAccessor: (d: PriceModel) => d.getPrice("closing").valueOf(),
  openAccessor: (d: PriceModel) => d.getPrice("opening").valueOf(),
  highAccessor: (d: PriceModel) => d.getPrice("high").valueOf(),
  lowAccessor: (d: PriceModel) => d.getPrice("low").valueOf(),
  closeAccessor: (d: PriceModel) => d.getPrice("closing").valueOf(),
};

const chartMargin = { top: 20, right: 20, bottom: 20, left: 65 };

export const PriceChart = () => {
  const [globalFilters] = usePriceViewFilters();
  const [filteredDateRange, setFilteredDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const brushRef = useRef<BaseBrush | null>(null);
  const clipPathId = useId();
  const brushPatternId = useId();

  const { data: queryResult } = useSuspenseQuery(
    services.price.query.getAllPrices({
      filters: {
        ...globalFilters,
        equitySector: null,
        equitySubsector: null,
        latest: false,
      },
      pagination: { enablePagination: false, limit: null, page: null },
      sort: { sortBy: "date", order: "asc" },
    }),
  );

  const groupedData = useMemo(() => {
    const groups: Record<string, PriceModel[]> = {};
    if (!queryResult?.data) return groups;

    queryResult.data.forEach((model) => {
      const equityId = String(model.getPrice("equityId"));
      if (!groups[equityId]) groups[equityId] = [];
      groups[equityId].push(model);
    });
    return groups;
  }, [queryResult.data]);

  const allData = useMemo(() => queryResult?.data || [], [queryResult?.data]);
  const dataKeys = useMemo(() => Object.keys(groupedData), [groupedData]);

  const colorScale = useMemo(
    () => scaleOrdinal({ domain: dataKeys, range: COLORS }),
    [dataKeys],
  );

  const globalXDomain = useMemo(() => {
    const [min, max] = extent(allData, accessors.xAccessor);
    return min && max ? [min, max] : [new Date(), new Date()];
  }, [allData]);

  const activeXDomain = useMemo(() => {
    if (filteredDateRange.start && filteredDateRange.end) {
      return [filteredDateRange.start, filteredDateRange.end];
    }
    return globalXDomain;
  }, [filteredDateRange.start, filteredDateRange.end, globalXDomain]);

  const yDomain = useMemo(() => {
    const maxValue = max(allData, accessors.yAccessor);
    const minValue = min(allData, accessors.yAccessor);
    return [Math.max(0, (minValue || 0) * 0.85), (maxValue || 100) * 1.15];
  }, [allData]);

  const onBrushChange = (domain: Bounds | null) => {
    if (!domain) return;
    const { x0, x1 } = domain;

    setFilteredDateRange({
      start: new FormattableDate(x0),
      end: new FormattableDate(x1),
    });
  };

  const onBrushClear = () => {
    setFilteredDateRange({
      start: null,
      end: null,
    });

    if (brushRef.current) {
      brushRef.current.reset();
    }
  };

  if (allData.length === 0) {
    return (
      <div className="text-muted-foreground flex size-full items-center justify-center">
        No Data
      </div>
    );
  }

  return (
    <div className="relative flex size-full flex-col gap-4">
      <div className="relative min-h-0 flex-1">
        <div className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 items-center justify-between gap-2 px-3 text-sm">
          <LegendOrdinal scale={colorScale} labelFormat={(label) => label}>
            {(labels) => (
              <div className="bg-background flex flex-row gap-4 rounded px-3 py-1">
                {labels.map((label, i) => (
                  <div key={`legend-${i}`} className="flex items-center">
                    <div
                      style={{ backgroundColor: label.value }}
                      className="mr-2 size-3 rounded-full"
                    />
                    <span className="text-xs font-medium">
                      {label.text.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </LegendOrdinal>
        </div>

        <ParentSize debounceTime={15}>
          {({ width, height }) => {
            if (width < 1 || height < 1) return null;

            const innerWidth = width - chartMargin.left - chartMargin.right;
            const innerHeight = height - chartMargin.top - chartMargin.bottom;

            return (
              <XYChart
                height={height}
                width={width}
                margin={chartMargin}
                xScale={{ type: "time", domain: activeXDomain }}
                yScale={{ type: "linear", zero: false, domain: yDomain }}
              >
                <defs>
                  <clipPath id={clipPathId}>
                    <rect
                      x={chartMargin.left}
                      y={chartMargin.top}
                      width={innerWidth}
                      height={innerHeight}
                    />
                  </clipPath>
                </defs>
                {Object.entries(groupedData).map(([equityId, models]) => (
                  <CandlestickSeries
                    key={`candle-${equityId}`}
                    data={models}
                    equityId={equityId}
                    accessors={accessors}
                    clipPath={`url(#${clipPathId})`}
                    color={colorScale(equityId)}
                  />
                ))}
                {Object.entries(groupedData).map(([equityId, models]) => (
                  <LineSeries
                    key={equityId}
                    dataKey={equityId}
                    data={models}
                    stroke={colorScale(equityId)}
                    clipPath={`url(#${clipPathId})`}
                    {...accessors}
                  />
                ))}
                <Axis
                  orientation="left"
                  tickLabelProps={{ fill: "var(--foreground)" }}
                  stroke={"var(--border)"}
                  tickStroke={"var(--border)"}
                  tickFormat={(value) => {
                    if (typeof value !== "number") return String(value);
                    return new Currency(value).format();
                  }}
                />
                <Axis
                  orientation="bottom"
                  numTicks={width < 800 ? 3 : 6}
                  tickLabelProps={{ fill: "var(--foreground)" }}
                  stroke={"var(--border)"}
                  tickStroke={"var(--border)"}
                />
                <Tooltip<PriceModel>
                  snapTooltipToDatumX
                  snapTooltipToDatumY
                  showVerticalCrosshair
                  showSeriesGlyphs
                  unstyled={true}
                  applyPositionStyle={true}
                  style={{ position: "absolute", pointerEvents: "none" }}
                  verticalCrosshairStyle={{
                    stroke: "var(--foreground)",
                    strokeDasharray: "4,4",
                    strokeOpacity: 0.5,
                  }}
                  renderTooltip={(props) => (
                    <PriceChartTooltip {...props} accessors={accessors} />
                  )}
                />
              </XYChart>
            );
          }}
        </ParentSize>
      </div>

      <div className="h-24 w-full shrink-0">
        <ParentSize debounceTime={15}>
          {({ width, height }) => {
            if (width < 1 || height < 1) return null;

            const brushDateScale = scaleTime({
              range: [0, width],
              domain: globalXDomain,
            });

            const brushYScale = scaleLinear({
              range: [height, 0],
              domain: yDomain,
            });

            let initialBrushPosition = undefined;
            if (filteredDateRange.start && filteredDateRange.end) {
              initialBrushPosition = {
                start: { x: brushDateScale(filteredDateRange.start) },
                end: { x: brushDateScale(filteredDateRange.end) },
              };
            }
            return (
              <svg width={width} height={height}>
                <PatternLines
                  id={brushPatternId}
                  height={12}
                  width={12}
                  stroke="var(--foreground)"
                  strokeWidth={1}
                  orientation={["diagonal"]}
                />
                <Group>
                  {Object.entries(groupedData).map(([equityId, models]) => (
                    <AreaClosed
                      key={equityId}
                      data={models}
                      x={(d) => brushDateScale(accessors.xAccessor(d)) ?? 0}
                      y={(d) => brushYScale(accessors.yAccessor(d)) ?? 0}
                      yScale={brushYScale}
                      stroke={colorScale(equityId)}
                      fill={colorScale(equityId)}
                      fillOpacity={0.1}
                      strokeOpacity={0.4}
                    />
                  ))}
                </Group>
                <Brush
                  key={`brush-${width}-${height}`}
                  xScale={brushDateScale}
                  yScale={brushYScale}
                  width={width}
                  height={height}
                  initialBrushPosition={initialBrushPosition}
                  onChange={onBrushChange}
                  onClick={onBrushClear}
                  handleSize={8}
                  resizeTriggerAreas={["left", "right"]}
                  brushDirection="horizontal"
                  selectedBoxStyle={{
                    fill: `url(#${brushPatternId})`,
                    stroke: "var(--foreground)",
                    fillOpacity: 0.4,
                  }}
                  useWindowMoveEvents
                  renderBrushHandle={(props) => <BrushHandle {...props} />}
                />
              </svg>
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
};

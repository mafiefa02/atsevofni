import { ParentSize } from "@visx/responsive";
import { scaleOrdinal } from "@visx/scale";
import { AreaSeries, Axis, Tooltip, XYChart } from "@visx/xychart";
import { useId, useMemo } from "react";

import type { PriceModel } from "-/domains/price/models";
import { Currency } from "-/lib/models";

import { CHART_MARGIN, COLORS, THEME } from "../../constants";
import { useGetActiveXDomain, useGetChartData } from "../../hooks";
import { accessors, getGlobalDomain, groupByEquity } from "../../utils";
import { ChartBrush } from "./brush";
import { CandlestickSeries } from "./candlestick";
import { ChartEmpty } from "./empty";
import { ChartLegend } from "./legend";
import { PriceChartTooltip } from "./tooltip";

export const PriceChart = () => {
  const clipPathId = useId();

  const { data: queryResult } = useGetChartData();

  const allData = queryResult.data;
  const groupedData = useMemo(() => groupByEquity(allData), [allData]);

  const colorScale = useMemo(() => {
    const dataKeys = Object.keys(groupedData);
    return scaleOrdinal({ domain: dataKeys, range: COLORS });
  }, [groupedData]);

  const [xDomain, yDomain] = useMemo(() => getGlobalDomain(allData), [allData]);
  const [activeXDomain, setActiveXDomain] = useGetActiveXDomain(xDomain);

  if (allData.length === 0) return <ChartEmpty />;

  return (
    <div className="relative flex size-full flex-col gap-4 overflow-hidden">
      <div className="relative min-h-0 flex-1">
        <ChartLegend colorScale={colorScale} />

        <ParentSize debounceTime={0}>
          {({ width, height }) => {
            const isCompact = width < 768;

            if (isCompact) return null;

            const innerWidth = width - CHART_MARGIN.left - CHART_MARGIN.right;
            const innerHeight = height - CHART_MARGIN.top - CHART_MARGIN.bottom;

            return (
              <XYChart
                theme={THEME}
                height={height}
                width={width}
                margin={CHART_MARGIN}
                xScale={{ type: "time", domain: activeXDomain }}
                yScale={{ type: "linear", zero: false, domain: yDomain }}
              >
                <defs>
                  <clipPath id={clipPathId}>
                    <rect
                      x={CHART_MARGIN.left}
                      y={CHART_MARGIN.top}
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
                  <AreaSeries
                    key={equityId}
                    dataKey={equityId}
                    data={models}
                    clipPath={`url(#${clipPathId})`}
                    lineProps={{
                      clipPath: `url(#${clipPathId})`,
                    }}
                    fillOpacity={0.15}
                    xAccessor={accessors.xAccessor}
                    yAccessor={accessors.yAccessor}
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
                  unstyled
                  snapTooltipToDatumX
                  snapTooltipToDatumY
                  showVerticalCrosshair
                  applyPositionStyle={true}
                  showSeriesGlyphs={!isCompact}
                  renderTooltip={PriceChartTooltip}
                  verticalCrosshairStyle={{
                    stroke: "var(--foreground)",
                    strokeDasharray: "4,4",
                    strokeOpacity: 0.5,
                  }}
                />
              </XYChart>
            );
          }}
        </ParentSize>
      </div>

      <div className="absolute bottom-0 flex h-12 w-full opacity-60">
        <ParentSize debounceTime={0}>
          {(props) => (
            <ChartBrush
              {...props}
              setRange={setActiveXDomain}
              data={groupedData}
              colorScale={colorScale}
              domain={[xDomain, yDomain]}
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};

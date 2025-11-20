import type { ParentSizeProvidedProps } from "@visx/responsive/lib/components/ParentSize";
import type { ScaleOrdinal } from "@visx/vendor/d3-scale";
import { AreaSeries, Axis, Tooltip, XYChart } from "@visx/xychart";
import { useId, useMemo } from "react";

import type { PriceModel } from "-/domains/price/models";
import { Currency } from "-/lib/models";

import { CHART_MARGIN, THEME } from "../../constants";
import type { XDomain, YDomain } from "../../types";
import { accessors } from "../../utils";
import { CandlestickSeries } from "./candlestick";
import { PriceChartTooltip } from "./tooltip";

interface DesktopChartProps extends ParentSizeProvidedProps {
  colorScale: ScaleOrdinal<string, string, never>;
  domain: [XDomain[], YDomain[]];
  data: Record<string, PriceModel[]>;
}

export const DesktopChart = ({
  width,
  height,
  colorScale,
  domain,
  data,
}: DesktopChartProps) => {
  const clipPathId = useId();
  const clipPath = `url(#${clipPathId})`;

  const [activeXDomain, yDomain] = domain;

  const innerWidth = width - CHART_MARGIN.left - CHART_MARGIN.right;
  const innerHeight = height - CHART_MARGIN.top - CHART_MARGIN.bottom;

  const xScale = { type: "time" as const, domain: activeXDomain };
  const yScale = { type: "linear" as const, zero: false, domain: yDomain };

  const entries = useMemo(() => Object.entries(data), [data]);

  return (
    <XYChart
      theme={THEME}
      height={height}
      width={width}
      margin={CHART_MARGIN}
      xScale={xScale}
      yScale={yScale}
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
      {entries.map(([equityId, models]) => (
        <CandlestickSeries
          key={`candle-${equityId}`}
          data={models}
          equityId={equityId}
          accessors={accessors}
          clipPath={clipPath}
          color={colorScale(equityId)}
        />
      ))}
      {entries.map(([equityId, models]) => (
        <AreaSeries
          key={equityId}
          dataKey={equityId}
          data={models}
          clipPath={clipPath}
          lineProps={{ clipPath }}
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
        renderTooltip={PriceChartTooltip}
        verticalCrosshairStyle={{
          stroke: "var(--foreground)",
          strokeDasharray: "4,4",
          strokeOpacity: 0.5,
        }}
      />
    </XYChart>
  );
};

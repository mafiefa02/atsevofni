import type { ParentSizeProvidedProps } from "@visx/responsive/lib/components/ParentSize";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Bar, Line } from "@visx/shape";
import { TooltipWithBounds, withTooltip } from "@visx/tooltip";
import type { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import type { ScaleOrdinal } from "@visx/vendor/d3-scale";
import { AreaSeries, Axis, XYChart } from "@visx/xychart";
import { useCallback, useId, useMemo } from "react";

import type { PriceModel } from "-/domains/price/models";
import { Currency } from "-/lib/models";

import { CHART_MARGIN, THEME } from "../../constants";
import type { XDomain, YDomain } from "../../types";
import {
  accessors,
  getGraphInnerSize,
  getTooltipPayload,
  handleChartTooltip,
} from "../../utils";
import { CandlestickSeries } from "./candlestick";
import { PriceChartTooltip } from "./tooltip";

interface DesktopChartProps extends ParentSizeProvidedProps {
  colorScale: ScaleOrdinal<string, string, never>;
  domain: [XDomain[], YDomain[]];
  data: Record<string, PriceModel[]>;
}

const DesktopChartBase = ({
  width,
  height,
  colorScale,
  domain,
  data,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
}: DesktopChartProps & WithTooltipProvidedProps<PriceModel>) => {
  const clipPathId = useId();
  const clipPath = `url(#${clipPathId})`;

  const [activeXDomain, yDomain] = domain;

  const { innerHeight, innerWidth } = useMemo(
    () => getGraphInnerSize({ width, height }, CHART_MARGIN),
    [width, height],
  );

  const xScaleConfig = useMemo(
    () => ({ type: "time" as const, domain: activeXDomain }),
    [activeXDomain],
  );

  const yScaleConfig = useMemo(
    () => ({ type: "linear" as const, zero: false, domain: yDomain }),
    [yDomain],
  );

  const entries = useMemo(() => Object.entries(data), [data]);

  const xScale = useMemo(
    () =>
      scaleTime({
        range: [CHART_MARGIN.left, width - CHART_MARGIN.right],
        domain: activeXDomain,
      }),
    [width, activeXDomain],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height - CHART_MARGIN.bottom, CHART_MARGIN.top],
        domain: yDomain,
      }),
    [height, yDomain],
  );

  const handleTooltip = useCallback(
    (
      event:
        | React.TouchEvent<SVGRectElement>
        | React.MouseEvent<SVGRectElement>,
    ) => {
      handleChartTooltip({
        event,
        data,
        xScale,
        yScale,
        showTooltip,
      });
    },
    [showTooltip, xScale, yScale, data],
  );

  const renderTickFormat = useCallback((value: number) => {
    if (typeof value !== "number") return String(value);
    return new Currency(value).format();
  }, []);

  const tooltipPayload = useMemo(
    () => getTooltipPayload({ tooltipData, data }),
    [tooltipData, data],
  );

  const numTicks = width < 800 ? 3 : 6;

  return (
    <div className="relative">
      <XYChart
        theme={THEME}
        height={height}
        width={width}
        margin={CHART_MARGIN}
        xScale={xScaleConfig}
        yScale={yScaleConfig}
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
          <AreaSeries
            key={`area-${equityId}`}
            dataKey={equityId}
            data={models}
            clipPath={clipPath}
            lineProps={{ clipPath }}
            fillOpacity={0.15}
            xAccessor={accessors.xAccessor}
            yAccessor={accessors.yAccessor}
          />
        ))}

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

        <Axis
          orientation="left"
          tickClassName="fill-foreground"
          stroke="var(--border)"
          tickStroke="var(--border)"
          tickFormat={renderTickFormat}
        />
        <Axis
          orientation="bottom"
          numTicks={numTicks}
          tickClassName="fill-foreground"
          stroke="var(--border)"
          tickStroke="var(--border)"
        />
      </XYChart>

      <svg
        width={width}
        height={height}
        className="pointer-events-none absolute top-0 left-0"
      >
        {tooltipData && (
          <Line
            from={{ x: tooltipLeft, y: CHART_MARGIN.top }}
            to={{ x: tooltipLeft, y: innerHeight + CHART_MARGIN.top }}
            stroke="var(--foreground)"
            strokeWidth={1.5}
            strokeOpacity={0.5}
            strokeDasharray="4,4"
            pointerEvents="none"
          />
        )}

        <Bar
          x={CHART_MARGIN.left}
          y={CHART_MARGIN.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          rx={0}
          className="pointer-events-auto cursor-crosshair"
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={hideTooltip}
        />
      </svg>

      {tooltipData && tooltipPayload && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          offsetLeft={12}
          offsetTop={12}
        >
          <PriceChartTooltip tooltipData={tooltipPayload} />
        </TooltipWithBounds>
      )}
    </div>
  );
};

export const DesktopChart = withTooltip<DesktopChartProps, PriceModel>(
  DesktopChartBase,
);

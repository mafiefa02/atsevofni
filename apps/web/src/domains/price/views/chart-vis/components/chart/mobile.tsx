import { GridRows } from "@visx/grid";
import type { ParentSizeProvidedProps } from "@visx/responsive/lib/components/ParentSize";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AreaClosed, Bar } from "@visx/shape";
import { TooltipWithBounds, withTooltip } from "@visx/tooltip";
import type { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import type {
  ScaleLinear,
  ScaleOrdinal,
  ScaleTime,
} from "@visx/vendor/d3-scale";
import { memo, useCallback, useMemo } from "react";

import type { PriceModel } from "-/domains/price/models";

import { MOBILE_CHART_MARGIN as margin } from "../../constants";
import type { XDomain, YDomain } from "../../types";
import {
  accessors,
  getGraphInnerSize,
  getTooltipPayload,
  handleChartTooltip,
} from "../../utils";
import { PriceChartTooltip } from "./tooltip";
import { ChartTooltipGlyphs } from "./tooltip-glyphs";

interface MobileChartProps extends ParentSizeProvidedProps {
  colorScale: ScaleOrdinal<string, string, never>;
  domain: [XDomain[], YDomain[]];
  data: Record<string, PriceModel[]>;
}

interface ChartBackgroundProps {
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number, never>;
  data: Record<string, PriceModel[]>;
  colorScale: ScaleOrdinal<string, string, never>;
  innerWidth: number;
  innerHeight: number;
}

const ChartBackground = memo(
  ({ xScale, yScale, data, colorScale, innerWidth }: ChartBackgroundProps) => (
    <>
      <GridRows
        scale={yScale}
        width={innerWidth}
        strokeDasharray="1,3"
        strokeOpacity={0.25}
        strokeWidth={1}
        stroke="var(--foreground)"
        pointerEvents="none"
        left={margin.left}
      />
      {Object.entries(data).map(([key, equityData]) => (
        <AreaClosed<PriceModel>
          key={`area-${key}`}
          data={equityData}
          x={(d) => xScale(accessors.xAccessor(d)) ?? 0}
          y={(d) => yScale(accessors.yAccessor(d)) ?? 0}
          yScale={yScale}
          strokeWidth={2}
          stroke={colorScale(key)}
          fill={colorScale(key)}
          fillOpacity={0.125}
        />
      ))}
    </>
  ),
);

ChartBackground.displayName = "ChartBackground";

const MobileChartBase = ({
  width,
  height,
  domain,
  data,
  colorScale,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
}: MobileChartProps & WithTooltipProvidedProps<PriceModel>) => {
  const [xDomain, yDomain] = domain;
  const chartSize = { width, height };

  const { innerWidth, innerHeight } = getGraphInnerSize(chartSize, margin);

  const xScale = useMemo(
    () =>
      scaleTime({
        range: [margin.left - 1, innerWidth + margin.left + 1],
        domain: xDomain,
      }),
    [innerWidth, xDomain],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight + margin.top + 1, margin.top],
        domain: yDomain,
      }),
    [innerHeight, yDomain],
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

  const tooltipPayload = useMemo(
    () => getTooltipPayload({ tooltipData, data }),
    [tooltipData, data],
  );

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <ChartBackground
          xScale={xScale}
          yScale={yScale}
          data={data}
          colorScale={colorScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
        />

        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          rx={14}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        />

        {tooltipData && (
          <ChartTooltipGlyphs
            tooltipData={tooltipData}
            tooltipLeft={tooltipLeft}
            tooltipTop={margin.top}
            innerHeight={innerHeight}
            data={data}
            yScale={yScale}
            colorScale={colorScale}
          />
        )}
      </svg>

      {tooltipData && tooltipPayload && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          offsetLeft={12}
          offsetTop={12}
          unstyled
          applyPositionStyle
        >
          <PriceChartTooltip tooltipData={tooltipPayload} />
        </TooltipWithBounds>
      )}
    </div>
  );
};

export const MobileChart = withTooltip<MobileChartProps, PriceModel>(
  MobileChartBase,
);

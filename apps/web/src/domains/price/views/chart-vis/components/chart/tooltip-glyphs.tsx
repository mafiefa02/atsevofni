import { Line } from "@visx/shape";
import type { ScaleLinear, ScaleOrdinal } from "@visx/vendor/d3-scale";

import type { PriceModel } from "-/domains/price/models";

import { useSeriesValue } from "../../hooks";
import { accessors } from "../../utils";

interface ChartTooltipGlyphsProps {
  tooltipData?: PriceModel;
  tooltipLeft?: number;
  tooltipTop?: number;
  innerHeight: number;
  data: Record<string, PriceModel[]>;
  yScale: ScaleLinear<number, number, never>;
  colorScale: ScaleOrdinal<string, string, never>;
}

export const ChartTooltipGlyphs = ({
  tooltipData,
  tooltipLeft = 0,
  tooltipTop = 0,
  innerHeight,
  data,
  yScale,
  colorScale,
}: ChartTooltipGlyphsProps) => {
  const getValueForSeries = useSeriesValue(data);

  if (!tooltipData) return null;

  const hoveredDate = accessors.xAccessor(tooltipData);

  return (
    <g pointerEvents="none">
      <Line
        from={{ x: tooltipLeft, y: tooltipTop }}
        to={{ x: tooltipLeft, y: innerHeight + tooltipTop }}
        stroke="var(--foreground)"
        strokeWidth={1.5}
        strokeOpacity={0.5}
        strokeDasharray="4,4"
      />

      {Object.keys(data).map((key) => {
        const val = getValueForSeries(key, hoveredDate);

        if (val === null) return null;

        return (
          <circle
            key={key}
            cx={tooltipLeft}
            cy={yScale(val)}
            r={4}
            fill={colorScale(key)}
            stroke="white"
            strokeWidth={2}
          />
        );
      })}
    </g>
  );
};

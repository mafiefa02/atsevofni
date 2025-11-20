import { Group } from "@visx/group";
import type { ScaleLinear, ScaleTime } from "@visx/vendor/d3-scale";
import { DataContext } from "@visx/xychart";
import { useContext, useMemo } from "react";

import type { PriceModel } from "-/domains/price/models";

import type { Accessors } from "../../types";
import { bisectDate, getBarAndWickWidth } from "../../utils";

type CandlestickSeriesProps = {
  data: PriceModel[];
  equityId: string;
  color: string;
  accessors: Accessors;
  clipPath?: string;
};

export const CandlestickSeries = ({
  data,
  equityId,
  color,
  accessors,
  clipPath,
}: CandlestickSeriesProps) => {
  const { xScale, yScale } = useContext(DataContext);

  const renderedCandles = useMemo(() => {
    if (!xScale || !yScale) return null;

    const xS = xScale as ScaleTime<number, number>;
    const yS = yScale as ScaleLinear<number, number>;

    const { barWidth, halfWidth, wickWidth } = getBarAndWickWidth(xS);

    const [minX, maxX] = xS.domain();

    const startIndex = Math.max(0, bisectDate(data, minX, 0) - 2);
    const endIndex = Math.min(
      data.length,
      bisectDate(data, maxX, startIndex) + 2,
    );

    const visibleData = data.slice(startIndex, endIndex);

    return visibleData.map((d, i) => {
      const xDate = accessors.xAccessor(d);
      const x = xS(xDate);

      if (x === undefined || x === null || Number.isNaN(x)) return null;

      const open = accessors.openAccessor(d);
      const close = accessors.closeAccessor(d);
      const high = accessors.highAccessor(d);
      const low = accessors.lowAccessor(d);

      const yOpen = yS(open) ?? 0;
      const yClose = yS(close) ?? 0;
      const yHigh = yS(high) ?? 0;
      const yLow = yS(low) ?? 0;

      const isBullish = close > open;
      const bodyColor = isBullish
        ? "var(--color-green-600)"
        : "var(--color-red-600)";

      const candleTop = Math.min(yOpen, yClose);
      const candleBottom = Math.max(yOpen, yClose);
      const candleHeight = Math.max(1, candleBottom - candleTop);

      return (
        <g key={`candle-${startIndex + i}`}>
          <line
            x1={x}
            y1={yHigh}
            x2={x}
            y2={yLow}
            stroke={bodyColor}
            strokeWidth={wickWidth}
            shapeRendering="crispEdges"
          />
          <rect
            x={x - halfWidth}
            y={candleTop}
            width={barWidth}
            height={candleHeight}
            fill={bodyColor}
            stroke={bodyColor}
            strokeWidth={1}
            shapeRendering="crispEdges"
          />
        </g>
      );
    });
  }, [xScale, yScale, data, accessors, color]);

  if (!renderedCandles) return null;

  return (
    <Group key={equityId} clipPath={clipPath}>
      {renderedCandles}
    </Group>
  );
};

import { Group } from "@visx/group";
import { Line } from "@visx/shape";
import type { ScaleLinear, ScaleTime } from "@visx/vendor/d3-scale";
import { DataContext } from "@visx/xychart";
import { useContext } from "react";

import type { PriceModel } from "-/domains/price/models";

import type { Accessors } from "../../types";
import { getBarAndWickWidth } from "../../utils";

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

  if (!xScale || !yScale) return null;

  const xS = xScale as ScaleTime<number, number>;
  const yS = yScale as ScaleLinear<number, number>;

  const xRange = xS.range();

  const { barWidth, halfWidth, wickWidth } = getBarAndWickWidth(xS);

  return (
    <Group key={equityId} clipPath={clipPath}>
      {data.map((d, i) => {
        const xDate = accessors.xAccessor(d);
        const x = xS(xDate);

        if (
          x === undefined ||
          x === null ||
          Number.isNaN(x) ||
          x < xRange[0] - barWidth ||
          x > xRange[1] + barWidth
        )
          return null;

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
          ? "var(--color-green-500)"
          : "var(--destructive)";

        const candleTop = Math.min(yOpen, yClose);
        const candleBottom = Math.max(yOpen, yClose);
        const candleHeight = Math.max(1, candleBottom - candleTop);

        return (
          <Group key={`candle-${i}`} left={x}>
            <Line
              from={{ x: 0, y: yHigh }}
              to={{ x: 0, y: yLow }}
              stroke={color}
              strokeWidth={wickWidth}
            />
            <rect
              x={-halfWidth}
              y={candleTop}
              width={barWidth}
              height={candleHeight}
              fill={bodyColor}
              stroke={bodyColor}
              strokeWidth={1}
            />
          </Group>
        );
      })}
    </Group>
  );
};

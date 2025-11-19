import { Group } from "@visx/group";
import { Line } from "@visx/shape";
import type { ScaleLinear, ScaleTime } from "@visx/vendor/d3-scale";
import { DataContext } from "@visx/xychart";
import { useContext } from "react";

import type { PriceModel } from "-/domains/price/models";
import type { FormattableDate } from "-/lib/models";

type CandlestickSeriesProps = {
  data: PriceModel[];
  equityId: string;
  color: string;
  accessors: {
    xAccessor: (d: PriceModel) => FormattableDate;
    yAccessor: (d: PriceModel) => number;
    openAccessor: (d: PriceModel) => number;
    highAccessor: (d: PriceModel) => number;
    lowAccessor: (d: PriceModel) => number;
    closeAccessor: (d: PriceModel) => number;
  };
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

  const [startDate, endDate] = xS.domain();

  const xRange = xS.range();
  const currentChartWidth = xRange[1] - xRange[0];

  const msInView = endDate.valueOf() - startDate.valueOf();

  const msPerDay = 1000 * 60 * 60 * 24;

  const daysInView = Math.max(1, msInView / msPerDay);

  const barWidth = Math.max(3, (currentChartWidth / daysInView) * 0.65);
  const wickWidth = Math.min(12, Math.max(2, barWidth * 0.15));

  const halfWidth = barWidth / 2;

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

import { Brush } from "@visx/brush";
import type BaseBrush from "@visx/brush/lib/BaseBrush";
import type { Bounds } from "@visx/brush/lib/types";
import { Group } from "@visx/group";
import { PatternLines } from "@visx/pattern";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AreaClosed } from "@visx/shape";
import type { ScaleOrdinal } from "@visx/vendor/d3-scale";
import { useCallback, useId, useMemo, useRef } from "react";

import type { PriceModel } from "-/domains/price/models";

import type { XDomain, YDomain } from "../../types";
import { accessors } from "../../utils";
import { BrushHandle } from "./handle";

interface ChartBrushProps {
  width: number;
  height: number;
  data: Record<string, PriceModel[]>;
  colorScale: ScaleOrdinal<string, string, never>;
  domain: [XDomain[], YDomain[]];
  setRange: React.Dispatch<
    React.SetStateAction<{
      start: XDomain | null;
      end: XDomain | null;
    }>
  >;
}

export const ChartBrush = ({
  data,
  width,
  height,
  setRange,
  domain,
  colorScale,
}: ChartBrushProps) => {
  const brushRef = useRef<BaseBrush | null>(null);
  const brushPatternId = useId();
  const [xDomain, yDomain] = domain;

  const onBrushChange = useCallback(
    (domain: Bounds | null) => {
      if (!domain) return;
      const { x0, x1 } = domain;
      setRange({ start: new Date(x0), end: new Date(x1) });
    },
    [setRange],
  );

  const onBrushClear = useCallback(() => {
    setRange({ start: null, end: null });
    if (brushRef.current) {
      brushRef.current.reset();
    }
  }, [setRange]);

  const brushDateScale = useMemo(
    () =>
      scaleTime({
        range: [0, width],
        domain: xDomain,
      }),
    [width, xDomain],
  );

  const brushYScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0],
        domain: yDomain,
      }),
    [height, yDomain],
  );

  if (width < 910 || height < 1) return null;

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
        {Object.entries(data).map(([equityId, models]) => (
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
        xScale={brushDateScale}
        yScale={brushYScale}
        width={width}
        height={height}
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
        renderBrushHandle={BrushHandle}
      />
    </svg>
  );
};

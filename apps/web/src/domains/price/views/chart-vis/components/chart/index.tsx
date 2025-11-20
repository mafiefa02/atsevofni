import { ParentSize } from "@visx/responsive";
import { scaleOrdinal } from "@visx/scale";
import { useMemo } from "react";

import { COLORS } from "../../constants";
import { useGetActiveXDomain, useGetChartData } from "../../hooks";
import { getGlobalDomain, groupByEquity, isCompact } from "../../utils";
import { ChartBrush } from "./brush";
import { DesktopChart } from "./desktop";
import { ChartEmpty } from "./empty";
import { ChartLegend } from "./legend";
import { MobileChart } from "./mobile";

export const PriceChart = () => {
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
          {(props) => {
            const compact = isCompact(props.width);
            const Chart = compact ? MobileChart : DesktopChart;

            return (
              <Chart
                {...props}
                colorScale={colorScale}
                domain={[activeXDomain, yDomain]}
                data={groupedData}
              />
            );
          }}
        </ParentSize>
      </div>

      <div className="absolute bottom-0 flex h-12 w-full opacity-60">
        <ParentSize debounceTime={0}>
          {(props) => {
            if (isCompact(props.width)) return null;
            return (
              <ChartBrush
                {...props}
                setRange={setActiveXDomain}
                data={groupedData}
                colorScale={colorScale}
                domain={[xDomain, yDomain]}
              />
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
};

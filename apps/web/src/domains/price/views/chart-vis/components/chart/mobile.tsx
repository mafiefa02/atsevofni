import type { ParentSizeProvidedProps } from "@visx/responsive/lib/components/ParentSize";
import type { ScaleOrdinal } from "@visx/vendor/d3-scale";

import type { PriceModel } from "-/domains/price/models";

import type { XDomain, YDomain } from "../../types";

interface MobileChartProps extends ParentSizeProvidedProps {
  colorScale: ScaleOrdinal<string, string, never>;
  domain: [XDomain[], YDomain[]];
  data: Record<string, PriceModel[]>;
}

export const MobileChart = (props: MobileChartProps) => {
  console.log(props);
  return "Mobile Chart";
};

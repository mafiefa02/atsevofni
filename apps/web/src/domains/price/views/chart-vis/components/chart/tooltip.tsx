import type { RenderTooltipParams } from "@visx/xychart/lib/components/Tooltip";

import { EquityIcon } from "-/components/equity-icon";
import type { EquityId } from "-/domains/equity/types";
import type { PriceModel } from "-/domains/price/models";
import { Currency } from "-/lib/models";

import { accessors, getTooltipItem } from "../../utils";

export const PriceChartTooltip = ({
  tooltipData,
  colorScale,
}: RenderTooltipParams<PriceModel>) => {
  if (!tooltipData?.nearestDatum || !tooltipData?.datumByKey) return null;

  const date = accessors.xAccessor(tooltipData.nearestDatum.datum);

  const tooltipItems = getTooltipItem(tooltipData, colorScale);

  return (
    <div className="bg-popover text-popover-foreground min-w-[160px] rounded border px-3 py-2 text-sm shadow-md">
      <div className="text-muted-foreground mb-2 border-b pb-1 text-xs font-medium">
        {date.format("PPP")}
      </div>

      <div className="flex flex-col gap-1.5">
        {tooltipItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <EquityIcon className="size-4" equityId={item.key as EquityId} />
              <span className="text-xs font-semibold">
                {item.key.toUpperCase()}
              </span>
            </div>
            <span className="text-xs">{new Currency(item.price).format()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

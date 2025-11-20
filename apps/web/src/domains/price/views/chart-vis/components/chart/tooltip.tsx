import { memo, useMemo } from "react";

import { EquityIcon } from "-/components/equity-icon";
import type { EquityId } from "-/domains/equity/types";
import { Currency } from "-/lib/models";

import type { TooltipDataPayload } from "../../types";
import { accessors } from "../../utils";

interface PriceChartTooltipProps {
  tooltipData: TooltipDataPayload | null;
}

const PriceChartTooltipComponent = ({
  tooltipData,
}: PriceChartTooltipProps) => {
  const content = useMemo(() => {
    if (!tooltipData?.nearestDatum || !tooltipData?.datumByKey) {
      return null;
    }

    const rawDate = accessors.xAccessor(tooltipData.nearestDatum.datum);
    const dateLabel = rawDate.format("PPP");

    const items = Object.entries(tooltipData.datumByKey)
      .map(([key, entry]) => {
        const rawPrice = accessors.yAccessor(entry.datum);
        return {
          key,
          id: key as EquityId,
          displayKey: key.toUpperCase(),
          formattedPrice: new Currency(rawPrice).format(),
          rawValue: rawPrice,
        };
      })
      .sort((a, b) => b.rawValue - a.rawValue);

    return { dateLabel, items };
  }, [tooltipData]);

  if (!content) return null;

  return (
    <div className="bg-popover text-popover-foreground min-w-[160px] rounded border px-3 py-2 text-sm shadow-md">
      <div className="text-muted-foreground mb-2 border-b pb-1 text-xs font-medium">
        {content.dateLabel}
      </div>

      <div className="flex flex-col gap-1.5">
        {content.items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <EquityIcon className="size-4" equityId={item.id} />
              <span className="text-xs font-semibold">{item.displayKey}</span>
            </div>
            <span className="text-xs tabular-nums">{item.formattedPrice}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PriceChartTooltip = memo(PriceChartTooltipComponent);

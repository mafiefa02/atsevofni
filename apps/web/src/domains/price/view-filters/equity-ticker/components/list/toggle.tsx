import { useCallback } from "react";

import { Toggle } from "-/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "-/components/ui/tooltip";
import type { EquityModel } from "-/domains/equity/models";

import { usePriceViewFilters } from "../../../hooks";

export const EquityTickerToggle = ({ equity }: { equity: EquityModel }) => {
  const [{ equities: equitiesFilter }, setFilter] = usePriceViewFilters();

  const equityId = equity.getEquity("id");
  const isActive = equitiesFilter?.has(equityId) ?? false;

  const handleToggle = (pressed: boolean) =>
    setFilter(({ equities: prev, ...rest }) => {
      const newEquities = new Set(prev);
      if (pressed) {
        newEquities.add(equityId);
      } else {
        newEquities.delete(equityId);
      }
      return { ...rest, equities: newEquities.size > 0 ? newEquities : null };
    });

  const onToggle = useCallback(handleToggle, [setFilter, equityId]);

  return (
    <Tooltip delayDuration={300} key={equityId}>
      <Toggle
        pressed={isActive}
        onPressedChange={onToggle}
        className="justify-start"
        aria-label={`Toggle ${equityId}`}
        variant="outline"
        asChild
      >
        <TooltipTrigger>{equityId}</TooltipTrigger>
      </Toggle>
      <TooltipContent side="right">{equity.getEquity("name")}</TooltipContent>
    </Tooltip>
  );
};

import { useCallback } from "react";

import { Toggle } from "-/components/ui/toggle";
import type { EquityModel } from "-/domains/equity/models";

import { usePriceViewFilters } from "../../../hooks";

interface EquityTickerToggleProps {
  equity: EquityModel;
  children: React.ReactNode;
}

export const EquityTickerToggle = ({
  equity,
  children,
}: EquityTickerToggleProps) => {
  const [{ equities: equitiesFilter }, setFilter] = usePriceViewFilters();

  const equityId = equity.getEquity("id");
  const isActive = equitiesFilter?.includes(equityId) ?? false;

  const handleToggle = (pressed: boolean) =>
    setFilter(({ equities: prev, ...rest }) => {
      const newEquities = new Set(prev);

      if (pressed) {
        newEquities.add(equityId);
      } else {
        newEquities.delete(equityId);
      }

      return {
        ...rest,
        equities: newEquities.size > 0 ? Array.from(newEquities) : null,
      };
    });

  const onToggle = useCallback(handleToggle, [setFilter, equityId]);

  return (
    <Toggle
      pressed={isActive}
      onPressedChange={onToggle}
      className="justify-start"
      aria-label={`Toggle ${equityId}`}
      variant="outline"
      asChild
    >
      {children}
    </Toggle>
  );
};

import { useCallback } from "react";

import { CheckIcon } from "-/components/icons/check";
import { Toggle } from "-/components/ui/toggle";
import type { EquityModel } from "-/domains/equity/models";

import { usePriceViewFilters } from "../../../hooks";

interface EquityTickerToggleProps
  extends React.ComponentPropsWithRef<typeof Toggle> {
  equity: EquityModel;
  children: React.ReactNode;
}

export const EquityTickerToggle = ({
  equity,
  children,
  ...props
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
      className="w-full justify-start"
      aria-label={`Toggle ${equityId}`}
      variant="outline"
      {...props}
    >
      {children} {isActive && <CheckIcon className="ml-auto" />}
    </Toggle>
  );
};

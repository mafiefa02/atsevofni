import { useCallback } from "react";

import { CheckIcon } from "-/components/icons/check";
import { Toggle } from "-/components/ui/toggle";
import type { BaseEquityModel } from "-/domains/equity/models";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";

import { usePriceViewFilters } from "../../../hooks";
import { usePrefetchEquity } from "../../hooks";

interface EquityTickerToggleProps
  extends React.ComponentPropsWithRef<typeof Toggle> {
  equity: BaseEquityModel;
  children: React.ReactNode;
}

export const EquityTickerToggle = ({
  equity,
  children,
  ...props
}: EquityTickerToggleProps) => {
  const [{ equities: equitiesFilter }, setFilter] = usePriceViewFilters();
  const [, setPagination] = usePriceViewPagination();

  const equityId = equity.getEquity("id");
  const isActive = equitiesFilter?.includes(equityId) ?? false;

  const handleToggle = (pressed: boolean) => {
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
    setPagination({ page: 1 });
  };

  const onToggle = useCallback(handleToggle, [
    setFilter,
    equityId,
    setPagination,
  ]);

  const { onMouseEnter, onMouseLeave, restartTimer } = usePrefetchEquity();

  return (
    <Toggle
      pressed={isActive}
      onPressedChange={(pressed) => {
        restartTimer(equity);
        onToggle(pressed);
      }}
      onMouseEnter={() => onMouseEnter(equity)}
      onMouseLeave={onMouseLeave}
      className="w-full justify-start"
      aria-label={`Toggle ${equityId}`}
      variant="outline"
      {...props}
    >
      {children} {isActive && <CheckIcon className="ml-auto" />}
    </Toggle>
  );
};

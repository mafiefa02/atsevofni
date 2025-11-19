import { useSuspenseQuery } from "@tanstack/react-query";

import type { EquityId } from "-/domains/equity/types";
import { services } from "-/lib/services";

interface PriceCardEquityNameProps {
  equityId: EquityId;
}

export const PriceCardEquityName = ({ equityId }: PriceCardEquityNameProps) => {
  const { data: result } = useSuspenseQuery(
    services.equity.query.getEquityById(equityId),
  );
  return (
    <p className="text-muted-foreground xs:text-sm line-clamp-1 text-xs">
      {result.data.getEquity("name")}
    </p>
  );
};

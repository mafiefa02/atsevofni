import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "-/components/ui/tooltip";
import { services } from "-/lib/services";

import { EquityTickerPagination } from "../pagination";
import { EquityTickerListEmpty } from "./empty";
import { EquityTickerListError } from "./error";
import { EquityTickerToggle } from "./toggle";

interface EquityTickerListProps {
  search: string | null;
}

export const EquityTickerList = ({ search }: EquityTickerListProps) => {
  const [page, setPage] = useState(1);
  const [searchFilter] = useDebounce(search, 300);
  const { data: equities, isError } = useSuspenseQuery(
    services.equity.query.getAllEquities({
      filters: { search: searchFilter },
      pagination: { limit: 5 },
    }),
  );

  if (isError) return <EquityTickerListError />;
  if (!equities.data || equities.data.length === 0)
    return <EquityTickerListEmpty />;

  return (
    <>
      <TooltipProvider>
        {equities.data.map((equity) => (
          <Tooltip delayDuration={300} key={equity.getEquity("id")}>
            <EquityTickerToggle equity={equity}>
              <TooltipTrigger>{equity.getEquity("id")}</TooltipTrigger>
            </EquityTickerToggle>
            <TooltipContent side="right">
              {equity.getEquity("name")}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
      <EquityTickerPagination
        page={page}
        setPage={setPage}
        meta={equities.meta}
      />
    </>
  );
};

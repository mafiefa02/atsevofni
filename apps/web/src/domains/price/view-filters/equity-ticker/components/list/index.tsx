import { useSuspenseQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { Toggle } from "-/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "-/components/ui/tooltip";
import { services } from "-/lib/services";

import { EquityTickerListEmpty } from "./empty";
import { EquityTickerListError } from "./error";

interface EquityTickerListProps {
  search: string | null;
}

export const EquityTickerList = ({ search }: EquityTickerListProps) => {
  const [searchFilter] = useDebounce(search, 300);
  const { data: equities, isError } = useSuspenseQuery(
    services.equity.query.getAllEquities({
      filters: { search: searchFilter },
      pagination: { enable: false },
    }),
  );

  if (isError) return <EquityTickerListError />;
  if (!equities.data || equities.data.length === 0)
    return <EquityTickerListEmpty />;

  return (
    <div className="flex flex-col gap-2">
      <TooltipProvider>
        {equities.data.map((equity) => (
          <Tooltip delayDuration={300} key={equity.getEquity("id")}>
            <Toggle
              className="justify-start"
              aria-label={`Toggle ${equity.getEquity("id")}`}
              variant="outline"
              asChild
            >
              <TooltipTrigger>{equity.getEquity("id")}</TooltipTrigger>
            </Toggle>
            <TooltipContent side="right">
              {equity.getEquity("name")}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

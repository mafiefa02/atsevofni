import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { FieldLegend, FieldSet } from "-/components/ui/field";

import { EquityTickerList } from "./list";
import { EquityTickerListLoading } from "./list/loading";
import { EquityTickerSearch } from "./search";

export const EquityTickerFilter = () => {
  const [search, setSearch] = useState("");

  return (
    <FieldSet>
      <FieldLegend>Tickers</FieldLegend>
      <EquityTickerSearch search={search} setSearch={setSearch} />
      <div className="flex flex-col gap-2">
        <ErrorBoundary fallback="Error">
          <Suspense fallback={<EquityTickerListLoading />}>
            <EquityTickerList search={search} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </FieldSet>
  );
};

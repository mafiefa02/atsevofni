import { Suspense, useState } from "react";

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
      <Suspense fallback={<EquityTickerListLoading />}>
        <EquityTickerList search={search} />
      </Suspense>
    </FieldSet>
  );
};

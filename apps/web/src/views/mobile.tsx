import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AppTitle } from "-/components/app-title";
import { PriceChartVis } from "-/domains/price/views/chart-vis/components/price-chart-vis";
import { PriceCardListError } from "-/domains/price/views/price-list/components/card-list/error";
import { PriceCardListLoading } from "-/domains/price/views/price-list/components/card-list/loading";
import { PriceCardList } from "-/domains/price/views/price-list/components/card-list/price-card-list";

export const MobileView = () => {
  return (
    <div className="flex flex-col gap-5">
      <AppTitle />
      <PriceChartVis />
      <ErrorBoundary fallback={<PriceCardListError />}>
        <Suspense fallback={<PriceCardListLoading />}>
          <PriceCardList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

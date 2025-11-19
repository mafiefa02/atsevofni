import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Card, CardContent } from "-/components/ui/card";

import { PriceChart } from "./chart";
import { LoadingPriceChart } from "./chart/loading";

export const PriceChartVis = () => {
  return (
    <Card>
      <CardContent className="h-[28rem] w-full">
        <ErrorBoundary fallback="Error">
          <Suspense fallback={<LoadingPriceChart />}>
            <PriceChart />
          </Suspense>
        </ErrorBoundary>
      </CardContent>
    </Card>
  );
};

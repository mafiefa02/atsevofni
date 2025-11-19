import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Card, CardContent } from "-/components/ui/card";

import { PriceChart } from "./chart";
import { LoadingPriceChart } from "./chart/loading";

export const PriceChartVis = () => {
  return (
    <Suspense fallback={<LoadingPriceChart />}>
      <Card className="overflow-hidden p-0">
        <CardContent className="h-[28rem] w-full p-0">
          <ErrorBoundary fallback="Error">
            <PriceChart />
          </ErrorBoundary>
        </CardContent>
      </Card>
    </Suspense>
  );
};

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { EquityIcon } from "-/components/equity-icon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "-/components/ui/card";
import { Separator } from "-/components/ui/separator";
import type { PriceModel } from "-/domains/price/models";

import { PriceCardEquityName } from "./equity-name";
import { PriceCardEquityNameError } from "./equity-name/error";
import { PriceCardEquityNameLoading } from "./equity-name/loading";

interface PriceCardListCardProps {
  price: PriceModel;
}

export const PriceCardListCard = ({ price }: PriceCardListCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <EquityIcon equityId={price.getPrice("equityId")} />
            <div className="flex flex-col gap-0 text-ellipsis">
              <p className="text-lg font-medium">
                {price.getPrice("equityId")}
              </p>
              <ErrorBoundary fallback={<PriceCardEquityNameError />}>
                <Suspense fallback={<PriceCardEquityNameLoading />}>
                  <PriceCardEquityName equityId={price.getPrice("equityId")} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
          <div className="flex flex-col gap-0 text-right text-ellipsis">
            <p className="text-lg font-medium">
              {price.getPrice("closing").format()}
            </p>
            <p className="text-muted-foreground xs:text-sm line-clamp-1 text-xs">
              {price.getPrice("date").format()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-muted-foreground">Volume</p>
          <p>{price.getPrice("volume").format()}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-muted-foreground">Opening</p>
          <p>{price.getPrice("opening").format()}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-muted-foreground">High</p>
          <p>{price.getPrice("high").format()}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-muted-foreground">Low</p>
          <p>{price.getPrice("low").format()}</p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground">Bid</p>
          <p>{price.getPrice("bid").format()}</p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <p className="text-muted-foreground">Offer</p>
          <p>{price.getPrice("offer").format()}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

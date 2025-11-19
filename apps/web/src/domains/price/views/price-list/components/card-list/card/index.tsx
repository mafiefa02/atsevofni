import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "-/components/ui/card";
import { Separator } from "-/components/ui/separator";
import type { PriceModel } from "-/domains/price/models";
import { services } from "-/lib/services";

import { PriceCardIcon } from "./icon";

interface PriceCardListCardProps {
  price: PriceModel;
}

export const PriceCardListCard = ({ price }: PriceCardListCardProps) => {
  const {
    data: equityResult,
    isPending,
    isError,
  } = useQuery(services.equity.query.getEquityById(price.getPrice("equityId")));

  if (isPending) return "loadingss";
  if (isError) return "error";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <PriceCardIcon equityId={price.getPrice("equityId")} />
            <div className="flex flex-col gap-0 text-ellipsis">
              <p className="text-lg font-medium">
                {price.getPrice("equityId")}
              </p>
              <p className="text-muted-foreground line-clamp-1 text-sm">
                {equityResult.data.getEquity("name")}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-0 text-right text-ellipsis">
            <p className="text-lg font-medium">
              {price.getPrice("closing").format()}
            </p>
            <p className="text-muted-foreground line-clamp-1 text-sm">
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

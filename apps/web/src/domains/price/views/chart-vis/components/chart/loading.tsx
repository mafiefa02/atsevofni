import { Card, CardContent } from "-/components/ui/card";
import { Skeleton } from "-/components/ui/skeleton";

export const LoadingPriceChart = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="h-[28rem] w-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

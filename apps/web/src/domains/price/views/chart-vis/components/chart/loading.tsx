import { Card, CardContent } from "-/components/ui/card";
import { Skeleton } from "-/components/ui/skeleton";

export const LoadingPriceChart = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="h-[25rem] w-full">
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-full w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

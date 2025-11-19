import { Skeleton } from "-/components/ui/skeleton";

export const LoadingPriceChart = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Skeleton className="h-6 w-52" />
      <Skeleton className="h-72 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
};

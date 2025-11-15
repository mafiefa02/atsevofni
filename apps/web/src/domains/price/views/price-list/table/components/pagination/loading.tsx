import { Skeleton } from "-/components/ui/skeleton";

export const PriceListTablePaginationLoading = () => {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <Skeleton className="h-8 w-96" />
      <Skeleton className="h-8 w-48" />
    </div>
  );
};

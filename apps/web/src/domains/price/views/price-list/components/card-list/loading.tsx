import { Skeleton } from "-/components/ui/skeleton";
import { generateUniqueRandomIntArray } from "-/lib/utils";

import { usePriceViewPagination } from "../../../pagination/hooks";

export const PriceCardListLoading = () => {
  const [{ limit }] = usePriceViewPagination();
  // subtracting by one helps reduce layout shifts
  const skeletons = generateUniqueRandomIntArray(limit - 1, limit - 1);

  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-8 w-full" />
      <div className="grid gap-2 md:grid-cols-2 [&>*:last-child:nth-child(odd)]:md:col-span-2">
        {skeletons.map((skeleton) => (
          <Skeleton key={`${skeleton}-pricecardlist`} className="h-84 w-full" />
        ))}
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  );
};

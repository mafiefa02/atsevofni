import emptyBox from "-/assets/empty-box.png";
import { ArrowClockwiseIcon } from "-/components/icons/arrow-clockwise";
import { Button } from "-/components/ui/button";
import { Card, CardContent } from "-/components/ui/card";

import { usePriceViewFilters } from "../../../filters/hooks";

export const PriceCardListEmpty = () => {
  const [, setFilters] = usePriceViewFilters();
  const reset = () => setFilters(null);
  return (
    <Card>
      <CardContent className="place-items-center space-y-4 py-16 text-center text-balance">
        <img
          className="pointer-events-none size-36 dark:grayscale"
          src={emptyBox}
        />
        <strong className="text-base">No data found!</strong>
        <p className="mt-1">
          We can&apos;t find the data you&apos;re looking for.
        </p>
        <Button onClick={reset}>
          <ArrowClockwiseIcon /> Reset filter
        </Button>
      </CardContent>
    </Card>
  );
};

import { useCallback } from "react";

import { ChevronLeftIcon } from "-/components/icons/chevron-left";
import { ChevronRightIcon } from "-/components/icons/chevron-right";
import { Button } from "-/components/ui/button";

interface EquityTickerPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  totalItems: number;
}

export const EquityTickerPagination = ({
  page,
  setPage,
  totalItems,
  totalPage,
}: EquityTickerPaginationProps) => {
  const handlePrev = useCallback(
    () => setPage((current) => (current === 1 ? current : current - 1)),
    [setPage],
  );

  const handleNext = useCallback(
    () => setPage((current) => (current === totalPage ? current : current + 1)),
    [setPage, totalPage],
  );

  return (
    <div className="grid grid-rows-[1fr_auto] gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Button disabled={page === 1} onClick={handlePrev} variant="secondary">
          <ChevronLeftIcon /> Prev
        </Button>
        <Button
          disabled={page === totalPage}
          onClick={handleNext}
          variant="secondary"
        >
          Next <ChevronRightIcon />
        </Button>
      </div>
      <div className="text-muted-foreground flex items-center justify-between gap-4 text-xs">
        <p>Total {totalItems} tickers</p>
        <p>
          Page {page} / {totalPage}
        </p>
      </div>
    </div>
  );
};

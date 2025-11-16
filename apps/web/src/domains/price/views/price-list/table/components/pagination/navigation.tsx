import { useCallback, useMemo } from "react";

import { ChevronLeftIcon } from "-/components/icons/chevron-left";
import { ChevronRightIcon } from "-/components/icons/chevron-right";
import { DoubleChevronLeftIcon } from "-/components/icons/double-chevron-left";
import { DoubleChevronRightIcon } from "-/components/icons/double-chevron-right";
import { Button } from "-/components/ui/button";
import { ButtonGroup } from "-/components/ui/button-group";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";

import { usePrefetchPrice } from "../../hooks";
import { generatePageSteps } from "../../utils";
import { StepButton } from "./step-button";

interface PriceListTableNavigationProps {
  currentPage: number;
  totalPage: number;
}

export const PriceListTableNavigation = ({
  currentPage,
  totalPage,
}: PriceListTableNavigationProps) => {
  const [{ enablePagination }, setPagination] = usePriceViewPagination();

  const firstPagePrefetch = usePrefetchPrice({ pagination: { page: 1 } });
  const prevPagePrefetch = usePrefetchPrice({
    pagination: { page: currentPage - 1 },
  });
  const nextPagePrefetch = usePrefetchPrice({
    pagination: { page: currentPage + 1 },
  });
  const lastPagePrefetch = usePrefetchPrice({
    pagination: { page: totalPage },
  });

  const handlePrev = useCallback(() => {
    prevPagePrefetch.restartTimer();
    setPagination(({ page: prevPage }) => ({
      page: prevPage ? prevPage - 1 : 1,
    }));
  }, [setPagination, prevPagePrefetch]);

  const handleNext = useCallback(() => {
    nextPagePrefetch.restartTimer();
    setPagination(({ page: prevPage }) => ({
      page: prevPage ? prevPage + 1 : 2,
    }));
  }, [setPagination, nextPagePrefetch]);

  const handleNavigate = useCallback(
    (step: number) => {
      if (step === 1) firstPagePrefetch.restartTimer();
      if (step === totalPage) lastPagePrefetch.restartTimer();
      setPagination({ page: step });
    },
    [setPagination, firstPagePrefetch, lastPagePrefetch, totalPage],
  );

  const pageSteps = useMemo(
    () => generatePageSteps(currentPage, totalPage, 5),
    [currentPage, totalPage],
  );

  if (enablePagination === false || totalPage === 1) return null;

  return (
    <ButtonGroup>
      {currentPage !== 1 && (
        <Button
          onClick={() => handleNavigate(1)}
          variant="outline"
          onMouseEnter={() => firstPagePrefetch.onMouseEnter()}
          onMouseLeave={firstPagePrefetch.onMouseLeave}
        >
          <DoubleChevronLeftIcon /> First
        </Button>
      )}
      {currentPage > 1 && (
        <Button
          onClick={handlePrev}
          variant="outline"
          onMouseEnter={() => prevPagePrefetch.onMouseEnter()}
          onMouseLeave={prevPagePrefetch.onMouseLeave}
        >
          <ChevronLeftIcon />
          <span>Previous</span>
        </Button>
      )}
      {pageSteps.map((step, index) => (
        <StepButton
          key={`${step}-${index}-step`}
          step={step}
          isActive={currentPage === step}
          handleNavigate={handleNavigate}
        />
      ))}
      {currentPage < totalPage && (
        <Button
          onClick={handleNext}
          variant="outline"
          onMouseEnter={() => nextPagePrefetch.onMouseEnter()}
          onMouseLeave={nextPagePrefetch.onMouseLeave}
        >
          <span>Next</span>
          <ChevronRightIcon />
        </Button>
      )}
      {currentPage !== totalPage && (
        <Button
          onClick={() => handleNavigate(totalPage)}
          variant="outline"
          onMouseEnter={() => lastPagePrefetch.onMouseEnter()}
          onMouseLeave={lastPagePrefetch.onMouseLeave}
        >
          Last
          <DoubleChevronRightIcon />
        </Button>
      )}
    </ButtonGroup>
  );
};

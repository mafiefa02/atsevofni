import { useCallback, useMemo } from "react";

import { ChevronLeftIcon } from "-/components/icons/chevron-left";
import { ChevronRightIcon } from "-/components/icons/chevron-right";
import { DoubleChevronLeftIcon } from "-/components/icons/double-chevron-left";
import { DoubleChevronRightIcon } from "-/components/icons/double-chevron-right";
import { Button } from "-/components/ui/button";
import { ButtonGroup } from "-/components/ui/button-group";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";

import { usePrefetchPage } from "../../hooks";
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
  const [, setPagination] = usePriceViewPagination();

  const firstPagePrefetch = usePrefetchPage(1);
  const prevPagePrefetch = usePrefetchPage(currentPage - 1);
  const nextPagePrefetch = usePrefetchPage(currentPage + 1);
  const lastPagePrefetch = usePrefetchPage(totalPage);

  const handlePrev = useCallback(() => {
    prevPagePrefetch.restartPrefetchTimer();
    setPagination(({ page: prevPage }) => ({
      page: prevPage ? prevPage - 1 : 1,
    }));
  }, [setPagination, prevPagePrefetch]);

  const handleNext = useCallback(() => {
    nextPagePrefetch.restartPrefetchTimer();
    setPagination(({ page: prevPage }) => ({
      page: prevPage ? prevPage + 1 : 2,
    }));
  }, [setPagination, nextPagePrefetch]);

  const handleNavigate = useCallback(
    (step: number) => {
      if (step === 1) firstPagePrefetch.restartPrefetchTimer();
      if (step === totalPage) lastPagePrefetch.restartPrefetchTimer();
      setPagination({ page: step });
    },
    [setPagination, firstPagePrefetch, lastPagePrefetch, totalPage],
  );

  const pageSteps = useMemo(
    () => generatePageSteps(currentPage, totalPage, 5),
    [currentPage, totalPage],
  );

  return (
    <ButtonGroup>
      {currentPage !== 1 && (
        <Button
          onClick={() => handleNavigate(1)}
          variant="outline"
          onMouseEnter={firstPagePrefetch.onMouseEnter}
          onMouseLeave={firstPagePrefetch.onMouseLeave}
        >
          <DoubleChevronLeftIcon /> First
        </Button>
      )}
      {currentPage > 1 && (
        <Button
          onClick={handlePrev}
          variant="outline"
          onMouseEnter={prevPagePrefetch.onMouseEnter}
          onMouseLeave={prevPagePrefetch.onMouseLeave}
        >
          <ChevronLeftIcon />
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
          onMouseEnter={nextPagePrefetch.onMouseEnter}
          onMouseLeave={nextPagePrefetch.onMouseLeave}
        >
          <ChevronRightIcon />
        </Button>
      )}
      {currentPage !== totalPage && (
        <Button
          onClick={() => handleNavigate(totalPage)}
          variant="outline"
          onMouseEnter={lastPagePrefetch.onMouseEnter}
          onMouseLeave={lastPagePrefetch.onMouseLeave}
        >
          Last
          <DoubleChevronRightIcon />
        </Button>
      )}
    </ButtonGroup>
  );
};

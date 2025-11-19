import { useCallback, useMemo } from "react";

import { ChevronLeftIcon } from "-/components/icons/chevron-left";
import { ChevronRightIcon } from "-/components/icons/chevron-right";
import { DoubleChevronLeftIcon } from "-/components/icons/double-chevron-left";
import { DoubleChevronRightIcon } from "-/components/icons/double-chevron-right";
import { ButtonGroup } from "-/components/ui/button-group";
import { StepButton } from "-/domains/price/views/components/step-button";
import { usePrefetchPrice } from "-/domains/price/views/hooks";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";
import { generatePageSteps } from "-/domains/price/views/utils";

import { PaginationNavButton } from "./button";

interface PaginationNavigationProps {
  currentPage: number;
  totalPage: number;
  variant?: "card" | "table";
}

export const PaginationNavigation = ({
  currentPage,
  totalPage,
  variant = "table",
}: PaginationNavigationProps) => {
  const [{ enablePagination }, setPagination] = usePriceViewPagination();

  const firstPagePrefetch = usePrefetchPrice({ pagination: { page: 1 } });
  const lastPagePrefetch = usePrefetchPrice({
    pagination: { page: totalPage },
  });
  const prevPagePrefetch = usePrefetchPrice({
    pagination: { page: currentPage - 1 },
  });
  const nextPagePrefetch = usePrefetchPrice({
    pagination: { page: currentPage + 1 },
  });

  const handleNavigate = useCallback(
    (step: number) => {
      if (step === 1) firstPagePrefetch.restartTimer();
      if (step === totalPage) lastPagePrefetch.restartTimer();
      setPagination({ page: step });
    },
    [setPagination, firstPagePrefetch, lastPagePrefetch, totalPage],
  );

  const handlePrev = useCallback(() => {
    prevPagePrefetch.restartTimer();
    setPagination((prev) => ({ page: Math.max(1, (prev.page || 1) - 1) }));
  }, [setPagination, prevPagePrefetch]);

  const handleNext = useCallback(() => {
    nextPagePrefetch.restartTimer();
    setPagination((prev) => ({ page: (prev.page || 1) + 1 }));
  }, [setPagination, nextPagePrefetch]);

  const pageSteps = useMemo(
    () => generatePageSteps(currentPage, totalPage, variant === "card" ? 3 : 5),
    [currentPage, totalPage, variant],
  );

  if (enablePagination === false || totalPage === 1) return null;

  if (variant === "card") {
    return (
      <div className="grid w-full grid-flow-col gap-2">
        {currentPage > 1 && (
          <PaginationNavButton
            onClick={handlePrev}
            prefetch={prevPagePrefetch}
            size="icon-sm"
            className="w-full"
          >
            <ChevronLeftIcon />
          </PaginationNavButton>
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
          <PaginationNavButton
            onClick={handleNext}
            prefetch={nextPagePrefetch}
            size="icon-sm"
            className="w-full"
          >
            <ChevronRightIcon />
          </PaginationNavButton>
        )}
      </div>
    );
  }

  return (
    <ButtonGroup>
      {currentPage > 1 && (
        <>
          <PaginationNavButton
            onClick={() => handleNavigate(1)}
            prefetch={firstPagePrefetch}
          >
            <DoubleChevronLeftIcon /> First
          </PaginationNavButton>

          <PaginationNavButton onClick={handlePrev} prefetch={prevPagePrefetch}>
            <ChevronLeftIcon /> <span>Previous</span>
          </PaginationNavButton>
        </>
      )}

      {pageSteps.map((step, index) => (
        <StepButton
          key={`${step}-${index}`}
          step={step}
          isActive={currentPage === step}
          handleNavigate={handleNavigate}
        />
      ))}

      {currentPage < totalPage && (
        <>
          <PaginationNavButton onClick={handleNext} prefetch={nextPagePrefetch}>
            <span>Next</span> <ChevronRightIcon />
          </PaginationNavButton>

          <PaginationNavButton
            onClick={() => handleNavigate(totalPage)}
            prefetch={lastPagePrefetch}
          >
            Last <DoubleChevronRightIcon />
          </PaginationNavButton>
        </>
      )}
    </ButtonGroup>
  );
};

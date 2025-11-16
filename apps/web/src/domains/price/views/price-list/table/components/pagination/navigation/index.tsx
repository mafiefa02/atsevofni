import { useCallback, useMemo } from "react";

import { ChevronLeftIcon } from "-/components/icons/chevron-left";
import { ChevronRightIcon } from "-/components/icons/chevron-right";
import { DoubleChevronLeftIcon } from "-/components/icons/double-chevron-left";
import { DoubleChevronRightIcon } from "-/components/icons/double-chevron-right";
import { ButtonGroup } from "-/components/ui/button-group";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";

import { usePrefetchPrice } from "../../../hooks";
import { generatePageSteps } from "../../../utils";
import { StepButton } from "../step-button";
import { NavButton } from "./button";

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
    () => generatePageSteps(currentPage, totalPage, 5),
    [currentPage, totalPage],
  );

  if (!enablePagination || totalPage === 1) return null;

  return (
    <ButtonGroup>
      {currentPage > 1 && (
        <>
          <NavButton
            onClick={() => handleNavigate(1)}
            prefetch={firstPagePrefetch}
          >
            <DoubleChevronLeftIcon /> First
          </NavButton>

          <NavButton onClick={handlePrev} prefetch={prevPagePrefetch}>
            <ChevronLeftIcon /> <span>Previous</span>
          </NavButton>
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
          <NavButton onClick={handleNext} prefetch={nextPagePrefetch}>
            <span>Next</span> <ChevronRightIcon />
          </NavButton>

          <NavButton
            onClick={() => handleNavigate(totalPage)}
            prefetch={lastPagePrefetch}
          >
            Last <DoubleChevronRightIcon />
          </NavButton>
        </>
      )}
    </ButtonGroup>
  );
};

import { FormattableDate, FormattableNumber } from "-/lib/models";

import type { Price } from "../types";

export const formatCell = <T extends keyof Price>(value: Price[T]) => {
  if (value instanceof FormattableDate) return value.format();
  if (value instanceof FormattableNumber) return value.format("id-ID");

  // Acts as a safeguard because sometimes these types of error happens:
  // I can't consistently reproduce it tho...

  // Uncaught Error: Objects are not valid as a React child (found: [object Date])
  if (value instanceof Date) return new FormattableDate(value).format();

  // Uncaught Error: Objects are not valid as a React child (found: [object Number])
  if (value instanceof Number)
    return new FormattableNumber(value).format("id-ID");

  return value as React.ReactNode;
};

/**
 * Generates an array of page numbers to display in the pagination control.
 * It tries to center the current page and shows a maximum of 5 page numbers.
 */
export const generatePageSteps = (
  currentPage: number,
  totalPage: number,
  maxPagesToShow: number = 5,
): number[] => {
  const pages: number[] = [];

  if (totalPage <= maxPagesToShow) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  const pagesToShowOnEachSide = Math.floor(maxPagesToShow / 2);
  let startPage: number;
  let endPage: number;

  if (currentPage <= pagesToShowOnEachSide + 1) {
    startPage = 1;
    endPage = maxPagesToShow;
  } else if (currentPage >= totalPage - pagesToShowOnEachSide) {
    startPage = totalPage - maxPagesToShow + 1;
    endPage = totalPage;
  } else {
    startPage = currentPage - pagesToShowOnEachSide;
    endPage = currentPage + pagesToShowOnEachSide;
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

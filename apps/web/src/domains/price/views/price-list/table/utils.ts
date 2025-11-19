import type { Price } from "-/domains/price/types";
import { Currency, FormattableDate, Quantity } from "-/lib/models";

export const formatCell = <T extends keyof Price>(key: T, value: Price[T]) => {
  if (
    value instanceof FormattableDate ||
    value instanceof Quantity ||
    value instanceof Currency
  )
    return value.format();

  // Acts as a safeguard because sometimes these types of error happens:
  // I can't consistently reproduce it tho...

  // Uncaught Error: Objects are not valid as a React child (found: [object Date])
  if (value instanceof Date) {
    if (key === "date") return new FormattableDate(value).format();
  }

  // Uncaught Error: Objects are not valid as a React child (found: [object Number])
  if (value instanceof Number) {
    if (key === "volume") return new Quantity(value).format();
    return new Currency(value).format();
  }

  return value as React.ReactNode;
};

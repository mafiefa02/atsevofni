import { type ClassValue, clsx } from "clsx";
import { createParser } from "nuqs";
import { twMerge } from "tailwind-merge";

import { DEFAULT_SORT_ORDER } from "./constants";
import { FormattableDate } from "./models";
import type { SortOrder } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Enforce to input only the key of T */
export const keyOf = <T>(key: keyof T) => key;

/** So we can do something like:
 *  ```
 *  const getParamName = createValueGetter(paramsMap)
 *  // ...
 *  getParamName("keyof paramsMap")
 *  ````
 */
export const createValueGetter =
  <T>(map: T) =>
  <K extends keyof T>(key: K): T[K] =>
    map[key];

/** nuqs parser to parse string to FormattableDate,
 * and serialize string (of date/datetime shape)
 * or Date to FormattableDate.
 * */
export const parseAsFormattableDate = createParser({
  parse(queryValue) {
    if (!queryValue) return null;

    try {
      const date = new FormattableDate(queryValue);
      if (isNaN(date.getTime())) return null;
      return date;
    } catch {
      return null;
    }
  },
  serialize(value: FormattableDate | null) {
    if (!value) return "";
    return new FormattableDate(value).format("yyyy-MM-dd");
  },
});

/** Parse query params as a set of T
 * @example const [set] = useQueryState("key", parseAsSetOf(parseAsString))
 */
export const parseAsSetOf = <T>(parser: ReturnType<typeof createParser<T>>) =>
  createParser({
    parse(queryValue) {
      if (!queryValue) return null;
      const values = queryValue.split(",").map((v) => parser.parse(v));
      if (values.some((v) => v === null)) return null;
      return new Set(values as T[]);
    },
    serialize(value: Set<T> | null) {
      if (!value || value.size === 0) return "";
      return Array.from(value)
        .map((v) => parser.serialize(v))
        .join(",");
    },
  });

/**
 * Generates an array of unique random integers.
 * The values will range from 0 to maxLength.
 *
 * Note: This works well if your range is small enough (up to 100)
 */
export const generateUniqueRandomIntArray = (
  minLength: number,
  maxLength: number,
): number[] => {
  const arrayLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  // We use maxLength as the implied upper bound to ensure we always
  // have enough unique numbers to fill the array.
  const pool = Array.from({ length: maxLength + 1 }, (_, i) => i);

  // Partial Fisher-Yates shuffle
  for (let i = 0; i < arrayLength; i++) {
    const j = i + Math.floor(Math.random() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, arrayLength);
};

/**
 * Determine the next sort state
 *
 * Cycle: Default -> Inverse -> Null (Reset) -> Default
 */
export const getNextSortState = <T extends string>(
  currentKey: T | null,
  currentOrder: SortOrder | null,
  targetKey: T,
): { sortBy: T | null; order: SortOrder | null } => {
  const isSameColumn = currentKey === targetKey;

  if (!isSameColumn) {
    return { sortBy: targetKey, order: DEFAULT_SORT_ORDER };
  }

  // If same column: Toggle Default -> Inverse -> Null
  if (currentOrder === DEFAULT_SORT_ORDER) {
    return {
      sortBy: targetKey,
      order: DEFAULT_SORT_ORDER === "asc" ? "desc" : "asc",
    };
  }

  // If we are currently inverted, reset to null
  return { sortBy: null, order: null };
};

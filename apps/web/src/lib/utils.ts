import { type ClassValue, clsx } from "clsx";
import { createParser } from "nuqs";
import { twMerge } from "tailwind-merge";

import { FormattableDate } from "./models";

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

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

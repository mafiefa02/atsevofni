import { tz } from "@date-fns/tz";
import { type FormatOptions, format } from "date-fns";

export class FormattableDate extends Date {
  public format = (
    dateFormat: string = "yyyy-MM-dd",
    options?: FormatOptions,
  ) => {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return format(this, dateFormat, { in: tz(userTz), ...options });
  };
}

export class Quantity extends Number {
  public format = (
    locales: Intl.LocalesArgument = "id-ID",
    options: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  ) => {
    return new Intl.NumberFormat(locales, options).format(this.valueOf());
  };
}

export class Currency extends Number {
  public format = (
    locales: Intl.LocalesArgument = "id-ID",
    options: Intl.NumberFormatOptions = {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    },
  ) => {
    return new Intl.NumberFormat(locales, options).format(this.valueOf());
  };
}

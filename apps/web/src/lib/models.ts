import { type FormatOptions, format } from "date-fns";

export class FormattableDate extends Date {
  public format = (
    dateFormat: string = "yyyy-MM-dd",
    options?: FormatOptions,
  ) => {
    return format(this, dateFormat, options);
  };
}

export class FormattableNumber extends Number {
  public format = (
    locales?: Intl.LocalesArgument,
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

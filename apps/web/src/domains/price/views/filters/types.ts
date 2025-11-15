import type { FormattableDate } from "-/lib/models";

export interface PriceFilter {
  equities: string[] | null;
  equitySector: string | null;
  equitySubsector: string | null;
  latest: boolean | null;
  startDate: FormattableDate | null;
  endDate: FormattableDate | null;
}

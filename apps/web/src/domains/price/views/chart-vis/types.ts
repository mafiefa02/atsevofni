import type { PriceModel } from "../../models";
import type { accessors } from "./utils";

export type Accessors = typeof accessors;

export type XDomain = Date;

export type YDomain = number;

export type GraphSize = { width: number; height: number };

export type Margin = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export interface TooltipDataPayload {
  nearestDatum: {
    datum: PriceModel;
    index: number;
    key: string;
    distance: number;
  };
  datumByKey: Record<string, { datum: PriceModel; index: number; key: string }>;
}

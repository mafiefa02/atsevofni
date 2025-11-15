import { useCallback } from "react";

import { Field, FieldLabel, FieldSet } from "-/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "-/components/ui/select";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";

import { PriceListTableControlItem } from "./item";

const AMOUNTS = [5, 10, 20, 50];

export const PriceListTableControl = () => {
  const [{ limit }, setPagination] = usePriceViewPagination();
  const handleChange = useCallback(
    (value: string) =>
      setPagination((prev) => ({
        ...prev,
        limit: isNaN(Number(value)) ? null : Number(value),
      })),
    [setPagination],
  );
  return (
    <FieldSet>
      <Field orientation="horizontal">
        <FieldLabel>Items per page</FieldLabel>
        <Select value={String(limit)} onValueChange={handleChange}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Amount of items per page</SelectLabel>
              {AMOUNTS.map((amount) => (
                <PriceListTableControlItem
                  key={`amount-${amount}`}
                  value={String(amount)}
                >
                  {amount} items
                </PriceListTableControlItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldSet>
  );
};

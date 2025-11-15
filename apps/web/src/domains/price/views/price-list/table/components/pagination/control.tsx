import { useCallback } from "react";

import { Field, FieldLabel, FieldSet } from "-/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "-/components/ui/select";
import { usePriceViewPagination } from "-/domains/price/views/pagination/hooks";

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
              <SelectItem value="5">5 items</SelectItem>
              <SelectItem value="10">10 items</SelectItem>
              <SelectItem value="20">20 items</SelectItem>
              <SelectItem value="50">50 items</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldSet>
  );
};

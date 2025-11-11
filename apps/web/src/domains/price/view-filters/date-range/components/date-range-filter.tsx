import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "-/components/ui/field";

import { DateRangeControl } from "./control";
import { DateRangeResetButton } from "./reset-button";
import { DateRangeTriggerButton } from "./trigger-button";

const dateRangeFields = [
  {
    name: "startDate" as const,
    label: "From",
    placeholder: "Select start date",
  },
  {
    name: "endDate" as const,
    label: "To",
    placeholder: "Select end date",
  },
];

export const DateRangeFilter = () => {
  return (
    <FieldSet className="-space-y-2">
      <FieldLegend>Date Range</FieldLegend>
      {dateRangeFields.map((field) => (
        <Field key={field.name}>
          <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
          <DateRangeControl name={field.name}>
            <div className="grid w-full grid-cols-[1fr_auto] items-center gap-2">
              <DateRangeTriggerButton
                name={field.name}
                placeholder={field.placeholder}
              />
              <DateRangeResetButton name={field.name} />
            </div>
          </DateRangeControl>
        </Field>
      ))}
    </FieldSet>
  );
};

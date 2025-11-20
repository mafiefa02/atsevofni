import { LegendOrdinal } from "@visx/legend";
import type { ScaleOrdinal } from "@visx/vendor/d3-scale";

interface ChartLegendProps {
  colorScale: ScaleOrdinal<string, string, never>;
}

export const ChartLegend = ({ colorScale }: ChartLegendProps) => {
  return (
    <div className="absolute top-6 left-1/2 z-10 -translate-x-1/2 px-3 text-sm">
      <LegendOrdinal scale={colorScale} labelFormat={(label) => label}>
        {(labels) => (
          <div className="bg-popover flex flex-row gap-4 rounded-lg border px-5 py-1">
            {labels.map((label, i) => (
              <div key={`legend-${i}`} className="flex items-center">
                <div
                  style={{ backgroundColor: label.value }}
                  className="mr-2 size-3 rounded-full"
                />
                <span className="text-xs font-medium">
                  {label.text.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </LegendOrdinal>
    </div>
  );
};

import { buildChartTheme } from "@visx/xychart";

export const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

export const CHART_MARGIN = { top: 30, right: 30, bottom: 40, left: 90 };

export const THEME = buildChartTheme({
  backgroundColor: "var(--background)",
  colors: COLORS,
  gridColor: "var(--border)",
  gridColorDark: "var(--border)",
  tickLength: 6,
});

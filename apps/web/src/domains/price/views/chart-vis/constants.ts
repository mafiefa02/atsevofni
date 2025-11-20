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
export const MOBILE_CHART_MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };

export const THEME = buildChartTheme({
  backgroundColor: "var(--background)",
  colors: COLORS,
  gridColor: "var(--border)",
  gridColorDark: "var(--border)",
  tickLength: 6,
});

export const MS_PER_DAY = 86_400_000; // 1000 * 60 * 60 * 24
export const MIN_BAR_WIDTH = 3;
export const MAX_WICK_WIDTH = 12;

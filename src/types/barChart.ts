/** @format */

export type BarChartDataItem = {
  label: string;
  value: number;
  [key: string]: unknown;
};

export type LegendItem = {
  label: string;
  color: string;
};

export type DynamicBarChartProps = {
  data?: BarChartDataItem[];
  title?: string;
  subtitle?: string;
  legend?: LegendItem[];
  height?: number;
  barSize?: number;
  threshold?: number;
  threshold2?: number;
  highColor?: string;
  midColor?: string;
  lowColor?: string;
  ticks?: number[];
  [key: string]: unknown;
};

export type PieChartDataItem = {
  label: string;
  value: number;
  color?: string;
};

export type DynamicPieChartProps = {
  data?: PieChartDataItem[];
  title?: string;
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
  showLegend?: boolean;
  showValues?: boolean;
  backgroundColor?: string;
  defaultColors?: string[];
  [key: string]: unknown;
};

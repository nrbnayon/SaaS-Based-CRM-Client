// src\app\(dashboard)\components\Overview\AnalyticsSection.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import React, { useState, useMemo } from "react";

// Type definitions matching IncomeExpenseSection
type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";

interface ChartData {
  month: string;
  income: number;
  expense: number;
}

interface FinancialData {
  amount: number;
  period: TimePeriod;
  increasePercent: number;
  timePeriod: string;
  trendPercent: number;
  isPositiveTrend: boolean;
}

interface FinancialCard {
  id: string;
  title: string;
  data: Record<TimePeriod, FinancialData>;
  borderColor: string;
  accentColor: string;
  textColor: string;
}

// Same mock data generation as IncomeExpenseSection
const generateMockData = (): Record<TimePeriod, FinancialData> => ({
  daily: {
    amount: 405.1,
    period: "daily",
    increasePercent: 12,
    timePeriod: "24 hours",
    trendPercent: 8,
    isPositiveTrend: true,
  },
  weekly: {
    amount: 2835.7,
    period: "weekly",
    increasePercent: 18,
    timePeriod: "7 days",
    trendPercent: 15,
    isPositiveTrend: true,
  },
  monthly: {
    amount: 12153.0,
    period: "monthly",
    increasePercent: 15,
    timePeriod: "30 days",
    trendPercent: 22,
    isPositiveTrend: true,
  },
  yearly: {
    amount: 145836.0,
    period: "yearly",
    increasePercent: 25,
    timePeriod: "365 days",
    trendPercent: 28,
    isPositiveTrend: true,
  },
});

// Same financial cards data as IncomeExpenseSection
const financialCards: FinancialCard[] = [
  {
    id: "expense",
    title: "Expense",
    data: {
      ...generateMockData(),
      monthly: {
        ...generateMockData().monthly,
        amount: 8942.5,
        isPositiveTrend: false,
        trendPercent: -12,
      },
      yearly: {
        ...generateMockData().yearly,
        amount: 107310.0,
        isPositiveTrend: false,
        trendPercent: -8,
      },
    },
    borderColor: "border-error",
    accentColor: "text-error",
    textColor: "text-error",
  },
  {
    id: "income",
    title: "Income",
    data: generateMockData(),
    borderColor: "border-success",
    accentColor: "text-success",
    textColor: "text-success",
  },
  {
    id: "savings",
    title: "Savings",
    data: {
      ...generateMockData(),
      monthly: { ...generateMockData().monthly, amount: 3210.5 },
      yearly: { ...generateMockData().yearly, amount: 38526.0 },
    },
    borderColor: "border-cyan",
    accentColor: "text-cyan",
    textColor: "text-cyan",
  },
];

// Same chart data sets as IncomeExpenseSection
const chartDataSets: Record<TimePeriod, ChartData[]> = {
  daily: [
    { month: "6AM", income: 120, expense: 80 },
    { month: "9AM", income: 200, expense: 150 },
    { month: "12PM", income: 350, expense: 200 },
    { month: "3PM", income: 280, expense: 180 },
    { month: "6PM", income: 420, expense: 250 },
    { month: "9PM", income: 180, expense: 120 },
  ],
  weekly: [
    { month: "Mon", income: 1200, expense: 800 },
    { month: "Tue", income: 1500, expense: 900 },
    { month: "Wed", income: 1800, expense: 1200 },
    { month: "Thu", income: 2200, expense: 1400 },
    { month: "Fri", income: 2800, expense: 1800 },
    { month: "Sat", income: 1600, expense: 1000 },
    { month: "Sun", income: 1200, expense: 700 },
  ],
  monthly: [
    { month: "Jan", income: 12000, expense: 8000 },
    { month: "Feb", income: 15000, expense: 9000 },
    { month: "Mar", income: 18000, expense: 12000 },
    { month: "Apr", income: 22000, expense: 14000 },
    { month: "May", income: 28000, expense: 18000 },
    { month: "Jun", income: 16000, expense: 10000 },
    { month: "Jul", income: 25000, expense: 16000 },
    { month: "Aug", income: 19000, expense: 12000 },
    { month: "Sep", income: 21000, expense: 13000 },
    { month: "Oct", income: 24000, expense: 15000 },
    { month: "Nov", income: 17000, expense: 11000 },
    { month: "Dec", income: 20000, expense: 13000 },
  ],
  yearly: [
    { month: "2019", income: 180000, expense: 120000 },
    { month: "2020", income: 165000, expense: 110000 },
    { month: "2021", income: 210000, expense: 140000 },
    { month: "2022", income: 245000, expense: 165000 },
    { month: "2023", income: 280000, expense: 185000 },
    { month: "2024", income: 320000, expense: 210000 },
  ],
};

export const AnalyticsSection = () => {
  const [selectedPeriods, setSelectedPeriods] = useState<
    Record<string, TimePeriod>
  >({
    income: "weekly",
    category: "weekly",
  });

  const handlePeriodChange = (cardId: string, period: TimePeriod) => {
    setSelectedPeriods((prev) => ({ ...prev, [cardId]: period }));
  };

  // Calculate income analytics data based on selected period
  const incomeAnalyticsData = useMemo(() => {
    const data = chartDataSets[selectedPeriods.income];
    const maxIncome = Math.max(...data.map((d) => d.income));
    const threshold = maxIncome * 0.8;

    return data.map((item) => ({
      day: item.month,
      value: Math.round(item.income / 1000), // Convert to K format
      segments: [
        Math.round((item.income * 0.6) / 1000),
        Math.round((item.income * 0.4) / 1000),
      ], // Split into segments
      color: item.income > threshold ? "#FFAD66" : "#FFF06A",
    }));
  }, [selectedPeriods.income]);

  // Calculate category analytics data based on financial cards
  const categoryAnalyticsData = useMemo(() => {
    const period = selectedPeriods.category;
    const income =
      financialCards.find((card) => card.id === "income")?.data[period]
        ?.amount || 0;
    const expense =
      financialCards.find((card) => card.id === "expense")?.data[period]
        ?.amount || 0;
    const savings =
      financialCards.find((card) => card.id === "savings")?.data[period]
        ?.amount || 0;

    // Calculate VAT as 15% of income (common business practice)
    const vat = income * 0.15;

    const total = income + expense + savings + vat;

    return [
      {
        name: "Income",
        percentage: `${((income / total) * 100).toFixed(1)}%`,
        value: (income / total) * 100,
        color: "#88F77C",
      },
      {
        name: "Expanse",
        percentage: `${((expense / total) * 100).toFixed(1)}%`,
        value: (expense / total) * 100,
        color: "#F54A45",
      },
      {
        name: "Savings",
        percentage: `${((savings / total) * 100).toFixed(1)}%`,
        value: (savings / total) * 100,
        color: "#02DBD6",
      },
      {
        name: "Vat",
        percentage: `${((vat / total) * 100).toFixed(1)}%`,
        value: (vat / total) * 100,
        color: "#FFF06A",
      },
    ];
  }, [selectedPeriods.category]);

  // Calculate max value for Y-axis
  const maxValue = useMemo(() => {
    const data = chartDataSets[selectedPeriods.income];
    return Math.ceil(Math.max(...data.map((d) => d.income)) / 1000);
  }, [selectedPeriods.income]);

  interface SegmentProps {
    fill: string;
    x: number;
    y: number;
    width: number;
    height: number;
    payload: {
      segments: number[];
    };
  }
  const CustomBar = (props: SegmentProps) => {
    const { fill, payload, x, y, width, height } = props;

    // Add validation for required props
    if (
      !payload ||
      !payload.segments ||
      !Array.isArray(payload.segments) ||
      payload.segments.length === 0
    ) {
      // Return a simple rect if segments are invalid
      return (
        <rect
          x={x}
          y={y}
          width={width}
          height={Math.max(0, height)}
          fill={fill}
          rx={12}
          ry={12}
        />
      );
    }

    const segments = payload.segments;
    const totalValue = segments.reduce((sum, seg) => sum + seg, 0);

    // Prevent division by zero
    if (totalValue <= 0) {
      return (
        <rect
          x={x}
          y={y}
          width={width}
          height={Math.max(0, height)}
          fill={fill}
          rx={12}
          ry={12}
        />
      );
    }

    const segmentGap = 4;
    const totalGaps = Math.max(0, (segments.length - 1) * segmentGap);
    const availableHeight = Math.max(0, height - totalGaps);

    let currentY = y + height;

    return (
      <g>
        {segments.map((segmentValue: number, index: number) => {
          // Ensure segmentValue is positive
          const safeSegmentValue = Math.max(0, segmentValue);
          const segmentHeight = Math.max(
            0,
            (safeSegmentValue / totalValue) * availableHeight
          );

          currentY -= segmentHeight;

          // Ensure currentY doesn't go below y
          const safeCurrentY = Math.max(y, currentY);
          const safeFinalHeight = Math.max(
            0,
            Math.min(segmentHeight, y + height - safeCurrentY)
          );

          const rect = (
            <rect
              key={index}
              x={x}
              y={safeCurrentY}
              width={width}
              height={safeFinalHeight}
              fill={fill}
              rx={12}
              ry={12}
            />
          );

          currentY -= segmentGap;
          return rect;
        })}
      </g>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[400px]">
      {/* Income Analytics Card */}
      <Card className="w-full lg:w-1/2 bg-background border-none shadow-none dark:bg-dark-primary rounded-3xl h-[350px] lg:h-full">
        <CardHeader className="pb-2 lg:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 gap-2 sm:gap-0">
            <CardTitle className="font-medium text-foreground text-sm sm:text-base">
              Income Analytics
            </CardTitle>
            <Select
              value={selectedPeriods.income}
              onValueChange={(value: TimePeriod) =>
                handlePeriodChange("income", value)
              }
            >
              <SelectTrigger className="w-auto px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-muted-foreground rounded-lg border border-border bg-transparent">
                <SelectValue placeholder="Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="px-2 h-[260px] lg:h-full">
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={incomeAnalyticsData}
                margin={{
                  top: 10,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
                barGap={6}
                barCategoryGap="10%"
              >
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#ACACAC" }}
                  className="text-xs sm:text-sm"
                  stroke="none"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#ACACAC" }}
                  className="text-xs sm:text-sm"
                  tickFormatter={(value) => `${value}K`}
                  domain={[0, maxValue]}
                  ticks={Array.from({ length: 7 }, (_, i) =>
                    Math.round((maxValue / 6) * i)
                  )}
                />
                <Bar
                  dataKey="value"
                  shape={(props: unknown) => {
                    const barProps = props as SegmentProps & {
                      payload: { day: string };
                    };
                    const originalData = incomeAnalyticsData.find(
                      (item) => item.day === barProps.payload.day
                    );
                    const colorData = incomeAnalyticsData.find(
                      (item) => item.day === barProps.payload.day
                    );
                    return (
                      <CustomBar
                        {...barProps}
                        payload={{ segments: originalData?.segments ?? [] }}
                        fill={colorData?.color || "#FFF06A"}
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Analytics Card */}
      <Card className="w-full lg:w-1/2 bg-background dark:border-none shadow-none dark:bg-dark-primary rounded-3xl h-auto lg:h-full">
        <CardHeader className="pb-2 lg:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 md:px-2 gap-2 sm:gap-0">
            <CardTitle className="font-medium text-foreground text-sm sm:text-base">
              Category Analytics
            </CardTitle>
            <Select
              value={selectedPeriods.category}
              onValueChange={(value: TimePeriod) =>
                handlePeriodChange("category", value)
              }
            >
              <SelectTrigger className="w-auto px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-muted-foreground rounded-lg border border-border bg-transparent">
                <SelectValue placeholder="Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="px-2 sm:px-4 h-auto lg:h-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 pb-6 lg:pb-4">
          {/* Pie Chart Container */}
          <div className="w-full lg:w-full h-[250px] sm:h-[280px] lg:h-full bg-input dark:bg-transparent rounded-3xl">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryAnalyticsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                  cornerRadius={8}
                  className="sm:inner-radius-[60px] sm:outer-radius-[100px] lg:inner-radius-[70px] lg:outer-radius-[120px]"
                >
                  {categoryAnalyticsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col w-full lg:w-full items-center gap-2 sm:gap-3 p-2 sm:p-4">
            {categoryAnalyticsData.map((category, index) => (
              <div key={index} className="w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="font-normal text-foreground text-sm sm:text-base leading-5 sm:leading-6">
                      {category.name}
                    </div>
                  </div>
                  <div className="font-semibold text-foreground text-sm sm:text-base leading-5 sm:leading-6">
                    {category.percentage}
                  </div>
                </div>
                {index < categoryAnalyticsData.length - 1 && (
                  <div className="w-full h-px bg-border my-2 sm:my-3" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/** @format */

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TimePeriod } from "@/types/allTypes";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataPoint {
  month?: string;
  name?: string;
  expense: number;
  income: number;
  cashflow?: number;
}

interface DynamicFinancialTableProps {
  chartData: ChartDataPoint[];
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  className?: string;
  chartType?: "both" | "income-only" | "expense-only";
}

export const DynamicFinancialTable: React.FC<DynamicFinancialTableProps> = ({
  chartData,
  selectedPeriod,
  onPeriodChange,
  className,
  chartType = "both",
}) => {
  const renderBars = () => {
    const bars = [];

    if (chartType === "both" || chartType === "expense-only") {
      bars.push(
        <Bar
          key="expense"
          dataKey="expense"
          fill="#FFAD66"
          name="Expense"
          barSize={20}
          radius={[10, 10, 10, 10]}
          activeBar={{ fill: "#FFAD66" }}
        />
      );
    }

    if (chartType === "both" || chartType === "income-only") {
      bars.push(
        <Bar
          key="income"
          dataKey="income"
          fill="#88F77C"
          name="Income"
          barSize={20}
          radius={[10, 10, 10, 10]}
          activeBar={{ fill: "#88F77C" }}
        />
      );
    }

    return bars;
  };

  return (
    <div className={cn("w-full", className)}>
      <Card
        className={cn(
          "flex flex-col h-96 justify-between items-start p-4 bg-[linear-gradient(45deg,var(--accent)_0%,white_50%,#FFF1E5_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)] flex-1 rounded-[20px] w-full xl:w-auto min-w-2xs"
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between p-0 w-full">
          <CardTitle className="inline-flex items-center justify-center gap-2 font-medium text-gray-800 dark:text-white text-base">
            Analytics
          </CardTitle>
          <Select
            value={selectedPeriod}
            onValueChange={(value: TimePeriod) => onPeriodChange(value)}
          >
            <SelectTrigger className="inline-flex items-center text-muted-custom justify-center gap-1.5 px-3 py-2 h-auto bg-white/20 dark:bg-transparent rounded-lg border-[0.5px] border-solid border-gray-300 dark:border-[#505050]">
              <SelectValue className="font-normal dark:text-muted-foreground text-xs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="w-full flex-1 p-0 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Legend />
              {renderBars()}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

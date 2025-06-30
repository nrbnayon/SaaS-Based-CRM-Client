/** @format */

import React from "react";
import { DynamicPieChartProps } from "@/types/barChart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DynamicPieChart = ({
  data = [
    { label: "Matrices FARE", value: 77396 },
    { label: "Matrices ESSERE", value: 77396 },
  ],
  title = "Matrices",
  width = 500,
  height = 400,
  innerRadius = 50,
  outerRadius = 140,
  showLabels = true,
  showLegend = true,
  showValues = true,
  defaultColors = ["#FF6762", "#60FF72"],
}: DynamicPieChartProps) => {
  const adjustedData = data.map((item, index) => {
    let adjustedValue = item.value;
    if (index === 0) {
      adjustedValue = item.value * 0.41;
    } else if (index === 1) {
      adjustedValue = item.value * 0.59;
    }

    return {
      ...item,
      value: adjustedValue,
      originalValue: item.value,
      color:
        item.color || defaultColors[index % defaultColors.length] || "#888888",
    };
  });

  // Calculate total for percentage calculation
  const total = adjustedData.reduce((sum, item) => sum + item.value, 0);

  // Custom label renderer for label lines
  type PieLabelRenderProps = {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    value: number;
    index: number;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,

    outerRadius,
    value,
    index,
  }: PieLabelRenderProps) => {
    if (!showLabels) return null;

    const RADIAN = Math.PI / 180;
    // Position label at the end of label line (further out from the pie)
    const radius = outerRadius + 30; // Extended beyond the pie chart
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = Math.round((value / total) * 100);
    const originalValue = adjustedData[index]?.originalValue || value;

    // Determine text anchor based on which side of the chart the label is on
    const textAnchor = x > cx ? "start" : "end";

    return (
      <text
        x={x}
        y={y}
        fill="#666666"
        textAnchor={textAnchor}
        dominantBaseline="central"
        fontSize="14"
        fontWeight="600"
      >
        {showValues
          ? ` ${percentage}% (${originalValue.toLocaleString()})`
          : ` ${percentage}%`}
      </text>
    );
  };

  return (
    <div className=" w-full bg-background dark:bg-card  rounded-3xl border border-border dark:border-none p-6 text-foreground overflow-x-auto scrollbar-custom  xl:overflow-hidden">
      {/* Title positioned at top center */}

      <div className="flex flex-col md:flex-row">
        {/* Legend positioned at top left  */}
        {showLegend && (
          <div className="  flex flex-row md:flex-col gap-3">
            {adjustedData.map((item, legendIndex) => (
              <div key={legendIndex} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-foreground text-sm font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Chart Container */}
        <div className=" items-center justify-center  mt-4 mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-foreground ">
              {title}
            </h2>
          </div>
          {/* Pie Chart with extra padding for labels */}
          <div
            style={{ width: `${width + 100}px`, height: `${height + 60}px` }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={adjustedData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderCustomLabel}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  fill="#8884d8"
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                  {adjustedData.map((entry, cellIndex) => (
                    <Cell key={`cell-${cellIndex}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPieChart;

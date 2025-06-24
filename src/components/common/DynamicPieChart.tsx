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

  // Custom label renderer
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
    innerRadius,
    outerRadius,
    value,
    index,
  }: PieLabelRenderProps) => {
    if (!showLabels) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = Math.round((value / total) * 100);
    const originalValue = adjustedData[index]?.originalValue || value;

    return (
      <text
        x={x}
        y={y}
        fill='bg-foreground'
        textAnchor='middle'
        dominantBaseline='central'
        fontSize='18'
        fontWeight='700'
      >
        {showValues
          ? `${percentage}% (${originalValue.toLocaleString()})`
          : `${percentage}%`}
      </text>
    );
  };

  return (
    <div className='w-full bg-background dark:bg-card  rounded-3xl border border-border dark:border-none p-6 text-foreground relative'>
      {/* Title positioned at top center */}
      <div className='text-center mb-6'>
        <h2 className='text-xl md:text-3xl font-bold text-foreground'>
          {title}
        </h2>
      </div>

      {/* Legend positioned at top left */}
      {showLegend && (
        <div className='absolute top-8 left-8 flex flex-col gap-3'>
          {adjustedData.map((item, legendIndex) => (
            <div key={legendIndex} className='flex items-center gap-3'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: item.color }}
              />
              <span className='text-foreground text-sm font-medium'>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Chart Container */}
      <div className='flex items-center justify-center relative mt-4'>
        {/* Pie Chart */}
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={adjustedData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill='#8884d8'
                dataKey='value'
                startAngle={90}
                endAngle={450}
                stroke='none'
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
  );
};

export default DynamicPieChart;

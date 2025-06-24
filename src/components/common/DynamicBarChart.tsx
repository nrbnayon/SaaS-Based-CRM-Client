import React from "react";
import { BarChartDataItem, DynamicBarChartProps } from "@/types/barChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DynamicBarChart = ({
  data = [],
  title,
  subtitle,
  legend = [
    { label: "Consistent", color: "#60A5FA" },
    { label: "Varied", color: "#FBBF24" },
  ],
  height = 280,
  barSize = 35,
  threshold = 50,
  highColor = "#FFAD66",
  lowColor = "#FFF06A",
  ticks,
}: DynamicBarChartProps) => {
  const processedData = data.map((item) =>
    item && typeof item === "object" && !Array.isArray(item)
      ? {
          ...(item as BarChartDataItem),
          color:
            (item as BarChartDataItem).value >= threshold
              ? highColor
              : lowColor,
        }
      : { label: String(item), value: 0, color: lowColor }
  );

  // Calculate dynamic ticks if not provided
  const calculateTicks = () => {
    if (ticks) return ticks;

    // Default to 0-100 range with 5 evenly spaced ticks
    return [0, 25, 50, 75, 100];
  };

  const dynamicTicks = calculateTicks();

  return (
    <div className='w-full'>
      <div className='mb-4 justify-start items-center flex gap-4'>
        {title && (
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-black dark:bg-white'></div>
            <span className='text-foreground text-lg md:text-2xl font-medium'>
              {title}
            </span>
          </div>
        )}
        {subtitle && (
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-black dark:bg-white'></div>
            <span className='text-foreground text-lg md:text-2xl font-medium'>
              {subtitle}
            </span>
          </div>
        )}
      </div>
      <div className='bg-background dark:bg-card  rounded-3xl border border-border dark:border-none'>
        <div className='flex items-center justify-end mb-5 p-6'>
          <div className='flex items-center gap-6'>
            {legend.map((item, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className='text-foreground text-sm'>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: `${height}px` }} className='w-full pb-5 '>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={processedData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barCategoryGap='25%'
            >
              <XAxis
                dataKey='label'
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                domain={[0, 100]}
                ticks={dynamicTicks}
              />
              <Bar dataKey='value' radius={[6, 6, 0, 0]} barSize={barSize}>
                {processedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DynamicBarChart;

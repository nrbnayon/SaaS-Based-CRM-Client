"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
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

export const AnalyticsSection = () => {
  // Data for Income Analytics - single color bars based on total value
  const incomeData = [
    { day: "Sun", value: 140, segments: [80, 60] }, // Total: 140 < 80% of 300 = 240, so use #FFF06A
    { day: "Mon", value: 160, segments: [90, 70] }, // Total: 160 < 80% of 300 = 240, so use #FFF06A
    { day: "Tue", value: 180, segments: [100, 80] }, // Total: 180 < 80% of 300 = 240, so use #FFF06A
    { day: "Wed", value: 280, segments: [120, 90, 70] }, // Total: 280 > 80% of 300 = 240, so use #FFAD66
    { day: "Thu", value: 195, segments: [110, 85] }, // Total: 195 < 80% of 300 = 240, so use #FFF06A
    { day: "Fri", value: 170, segments: [95, 75] }, // Total: 170 < 80% of 300 = 240, so use #FFF06A
    { day: "Sat", value: 200, segments: [140, 60] }, // Total: 200 < 80% of 300 = 240, so use #FFF06A
  ];

  // Convert data to format needed for chart with color based on 80% threshold
  const chartData = incomeData.map((item) => ({
    day: item.day,
    value: item.value,
    color: item.value > 240 ? "#FFAD66" : "#FFF06A", // 80% of 300K = 240K
  }));

  // Custom bar component to create segmented appearance
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

    if (!payload || !payload.segments) return null;

    const segments = payload.segments;
    const totalValue = segments.reduce((sum, seg) => sum + seg, 0);
    const segmentGap = 2; // Gap between segments
    const totalGaps = (segments.length - 1) * segmentGap;
    const availableHeight = height - totalGaps;

    let currentY = y + height;

    return (
      <g>
        {segments.map((segmentValue: number, index: number) => {
          const segmentHeight: number =
            (segmentValue / totalValue) * availableHeight;
          currentY -= segmentHeight;

          // Only first (bottom) and last (top) segments get border radius
          const isFirstSegment: boolean = index === 0;
          const isLastSegment: boolean = index === segments.length - 1;

          const rect = (
            <rect
              key={index}
              x={x}
              y={currentY}
              width={width}
              height={segmentHeight}
              fill={fill}
              rx={isFirstSegment || isLastSegment ? 12 : 0}
              ry={isFirstSegment || isLastSegment ? 12 : 0}
            />
          );

          currentY -= segmentGap;
          return rect;
        })}
      </g>
    );
  };

  // Category Analytics data
  const categoryData = [
    {
      name: "Income",
      percentage: "52.1%",
      value: 52.1,
      color: "#88F77C",
    },
    {
      name: "Expanse",
      percentage: "22.8%",
      value: 22.8,
      color: "#F54A45",
    },
    {
      name: "Savings",
      percentage: "13.9%",
      value: 13.9,
      color: "#02DBD6",
    },
    {
      name: "Vat",
      percentage: "11.2%",
      value: 11.2,
      color: "#FFF06A",
    },
  ];

  return (
    <div className="flex gap-6">
      {/* Income Analytics Card */}
      <Card className="w-1/2 dark:bg-dark-primary rounded-3xl p-4">
        <CardHeader className="px-2">
          <div className="flex items-center justify-between px-0">
            <CardTitle className="font-medium text-foreground text-base">
              Income Analytics
            </CardTitle>
            <Select defaultValue="week">
              <SelectTrigger className="w-auto px-3 py-2 text-muted-foreground rounded-lg border border-solid border-border bg-transparent">
                <SelectValue
                  placeholder="Week"
                  className="font-normal text-border text-xs"
                />
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

        <CardContent className="p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barGap={10}
              barCategoryGap="15%"
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#ACACAC" }}
                stroke="none"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#ACACAC" }}
                tickFormatter={(value) => `${value}K`}
                domain={[0, 300]}
                ticks={[0, 50, 100, 150, 200, 250, 300]}
              />
              <Bar
                dataKey="value"
                shape={(props: any) => {
                  // Find the original data with segments
                  const originalData = incomeData.find(
                    (item) => item.day === props.payload.day
                  );
                  // Use the color from chartData
                  const colorData = chartData.find(
                    (item) => item.day === props.payload.day
                  );
                  return (
                    <CustomBar
                      {...props}
                      payload={originalData}
                      fill={colorData?.color || "#FFF06A"}
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Analytics Card */}
      <Card className="w-1/2 dark:bg-dark-primary rounded-3xl">
        <CardHeader className="p-2">
          <div className="flex items-center justify-between p-2">
            <CardTitle className="font-medium text-foreground text-base">
              Category Analytics
            </CardTitle>
            <Select defaultValue="yearly">
              <SelectTrigger className="w-auto px-3 py-2 text-muted-foreground rounded-lg border border-border bg-transparent">
                <SelectValue
                  placeholder="Yearly"
                  className="font-normal text-border text-xs"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex items-center justify-between flex-1">
          <div className="relative w-[270px] h-[270px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                  cornerRadius={8}
                >
                  {categoryData.map((entry, index) => (
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

          <div className="flex flex-col w-72 h-52 items-start gap-6 p-3 rounded-2xl">
            {categoryData.map((category, index) => (
              <div key={index} className="w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="font-normal text-foreground text-base leading-6">
                      {category.name}
                    </div>
                  </div>
                  <div className="font-semibold text-foreground text-base leading-6">
                    {category.percentage}
                  </div>
                </div>
                {index < categoryData.length - 1 && (
                  <div className="w-full h-px bg-border my-3" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// // src\app\(dashboard)\components\Overview\AnalyticsSection.tsx
// "use client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@radix-ui/react-select";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// export const AnalyticsSection = () => {
//   // Data for Income Analytics
//   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const yAxisLabels = ["200K", "150K", "100K", "50K", "0"];

//   // Bar chart data structure
//   const barChartData = [
//     {
//       day: "Sun",
//       bars: [
//         { height: "h-6", bg: "bg-yellow-light" },
//         { height: "h-12", bg: "bg-yellow-light" },
//       ],
//     },
//     {
//       day: "Mon",
//       bars: [
//         { height: "h-11", bg: "bg-yellow-light" },
//         { height: "h-11", bg: "bg-yellow-light" },
//       ],
//     },
//     {
//       day: "Tue",
//       bars: [
//         { height: "h-[50px]", bg: "bg-yellow-light" },
//         { height: "h-[50px]", bg: "bg-yellow-light" },
//       ],
//     },
//     {
//       day: "Wed",
//       bars: [
//         { height: "h-24", bg: "bg-light-orange" },
//         { height: "h-[60px]", bg: "bg-light-orange" },
//         { height: "h-11", bg: "bg-light-orange" },
//       ],
//     },
//     {
//       day: "Thu",
//       bars: [
//         { height: "h-[66px]", bg: "bg-yellow-light" },
//         { height: "h-[66px]", bg: "bg-yellow-light" },
//       ],
//     },
//     {
//       day: "Fri",
//       bars: [
//         { height: "h-[59px]", bg: "bg-yellow-light" },
//         { height: "h-[33px]", bg: "bg-yellow-light" },
//       ],
//     },
//     {
//       day: "Sat",
//       bars: [
//         { height: "h-[113px]", bg: "bg-light-orange" },
//         { height: "h-11", bg: "bg-light-orange" },
//       ],
//     },
//   ];

//   // Category Analytics data
//   const categoryData = [
//     {
//       name: "Income",
//       percentage: "52.1%",
//       value: 52.1,
//       color: "#88F77C",
//     },
//     {
//       name: "Expanse",
//       percentage: "22.8%",
//       value: 22.8,
//       color: "#F54A45",
//     },
//     {
//       name: "Savings",
//       percentage: "13.9%",
//       value: 13.9,
//       color: "#02DBD6",
//     },
//     {
//       name: "Vat",
//       percentage: "11.2%",
//       value: 11.2,
//       color: "#FFF06A",
//     },
//   ];

//   return (
//     <div className="flex gap-6">
//       {/* Income Analytics Card */}
//       <Card className="w-1/2 dark:bg-dark-primary rounded-3xl p-4 flex flex-col justify-between">
//         <CardHeader className="px-2">
//           <div className="flex items-center justify-between px-0">
//             <CardTitle className="font-medium text-foreground text-base">
//               Income Analytics
//             </CardTitle>

//             <Select defaultValue="week">
//               <SelectTrigger className="w-auto px-3 py-2 text-muted-foreground rounded-lg border border-solid border-border bg-transparent">
//                 <SelectValue
//                   placeholder="Week"
//                   className="font-normal text-border text-xs"
//                 />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="daily">Daily</SelectItem>
//                 <SelectItem value="week">Week</SelectItem>
//                 <SelectItem value="month">Month</SelectItem>
//                 <SelectItem value="year">Year</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardHeader>

//         <CardContent className="p-4">
//           <div className="flex items-end justify-center gap-6 h-full dark:bg-dark-primary">
//             {/* Y-axis labels */}
//             <div className="flex flex-col items-end justify-between h-full">
//               {yAxisLabels.map((label, index) => (
//                 <div
//                   key={index}
//                   className="font-normal text-muted-foreground text-xs"
//                 >
//                   {label}
//                 </div>
//               ))}
//             </div>

//             {/* Bar chart */}
//             <div className="flex-1 flex flex-col items-start gap-2.5">
//               <div className="flex items-end justify-between w-full">
//                 {barChartData.map((dayData, dayIndex) => (
//                   <div
//                     key={dayIndex}
//                     className="flex flex-col items-start justify-center gap-1"
//                   >
//                     {dayData.bars.map((bar, barIndex) => (
//                       <div
//                         key={barIndex}
//                         className={`w-16 ${bar.height} ${bar.bg} rounded-xl`}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>

//               {/* X-axis labels */}
//               <div className="flex items-end justify-between w-full">
//                 {weekDays.map((day, index) => (
//                   <div
//                     key={index}
//                     className="w-16 font-normal text-[#ACACAC] text-sm text-center"
//                   >
//                     {day}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Category Analytics Card */}
//       <Card className="w-1/2 dark:bg-dark-primary rounded-3xl">
//         <CardHeader className="p-2">
//           <div className="flex items-center justify-between p-2">
//             <CardTitle className="font-medium text-foreground text-base">
//               Category Analytics
//             </CardTitle>
//             <Select defaultValue="week">
//               <SelectTrigger className="w-auto px-3 py-2 text-muted-foreground rounded-lg border border-solid border-border bg-transparent">
//                 <SelectValue
//                   placeholder="Week"
//                   className="font-normal text-border text-xs"
//                 />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="daily">Daily</SelectItem>
//                 <SelectItem value="week">Week</SelectItem>
//                 <SelectItem value="month">Month</SelectItem>
//                 <SelectItem value="year">Year</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardHeader>

//         <CardContent className="p-4 flex items-center justify-between flex-1">
//           {/* Enhanced Pie chart */}
//           <div className="relative w-[270px] h-[270px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={70}
//                   outerRadius={120}
//                   paddingAngle={2}
//                   dataKey="value"
//                   startAngle={90}
//                   endAngle={450}
//                   stroke="none"
//                   cornerRadius={8}
//                 >
//                   {categoryData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={entry.color}
//                       strokeWidth={0}
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Enhanced Category legend */}
//           <div className="flex flex-col w-72 h-52 items-start gap-6 p-3 rounded-2xl">
//             {categoryData.map((category, index) => (
//               <div key={index} className="w-full">
//                 <div className="flex items-center justify-between w-full">
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="w-4 h-4 rounded-full"
//                       style={{ backgroundColor: category.color }}
//                     />
//                     <div className="font-normal text-foreground text-base leading-6">
//                       {category.name}
//                     </div>
//                   </div>
//                   <div className="font-semibold text-foreground text-base leading-6">
//                     {category.percentage}
//                   </div>
//                 </div>
//                 {index < categoryData.length - 1 && (
//                   <div className="w-full h-px bg-border my-3" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

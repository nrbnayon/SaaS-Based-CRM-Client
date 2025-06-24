"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const responseData = [
  { day: "Sun", response: 18, comparison: 0 },
  { day: "Mon", response: 25, comparison: 0 },
  { day: "Tue", response: 28, comparison: 0 },
  { day: "Wed", response: 0, comparison: 45 },
  { day: "Thu", response: 35, comparison: 0 },
  { day: "Fri", response: 32, comparison: 0 },
  { day: "Sat", response: 0, comparison: 55 },
];

export default function ResponseComparisonChart() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-white text-xs">Response</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span className="text-white text-xs">Comparison</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-white text-xs">Consistent</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span className="text-white text-xs">Varied</span>
          </div>
        </div>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={responseData}
            margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 100]}
            />
            <Bar
              dataKey="response"
              fill="#FBBF24"
              radius={[2, 2, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="comparison"
              fill="#FB923C"
              radius={[2, 2, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

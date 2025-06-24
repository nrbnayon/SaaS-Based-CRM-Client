"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Sun", consistent: 0, varied: 15 },
  { day: "Mon", consistent: 0, varied: 22 },
  { day: "Tue", consistent: 0, varied: 25 },
  { day: "Wed", consistent: 45, varied: 0 },
  { day: "Thu", consistent: 0, varied: 32 },
  { day: "Fri", consistent: 0, varied: 30 },
  { day: "Sat", consistent: 52, varied: 0 },
];

export default function WeeklyBarChart() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-6 rounded-2xl">
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-white text-sm">Consistent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-white text-sm">Varied</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 100]}
            />
            <Bar
              dataKey="consistent"
              fill="#60A5FA"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
            <Bar
              dataKey="varied"
              fill="#FBBF24"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

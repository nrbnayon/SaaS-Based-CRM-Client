"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const matricesData = [
  { name: "Matrices ESSERE", value: 34, count: 77396, color: "#22C55E" },
  { name: "Matrices FARE", value: 24, count: 77396, color: "#EF4444" },
];

export default function MatricesDonutChart() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-6 rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-white text-sm">Matrices FARE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-white text-sm">Matrices ESSERE</span>
          </div>
        </div>
        <h3 className="text-white text-xl font-semibold">Matrices</h3>
      </div>

      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={matricesData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {matricesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Custom labels */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 text-lg font-semibold">
              24 (77,396)
            </div>
            <div className="text-green-400 text-lg font-semibold mt-8">
              34 (77,396)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

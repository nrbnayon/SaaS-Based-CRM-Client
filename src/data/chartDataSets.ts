import { ChartData, TimePeriod } from "@/types/allTypes";

// Chart data for different periods
export const chartDataSets: Record<TimePeriod, ChartData[]> = {
  daily: [
    { month: "6AM", income: 120, expense: 80, cashflow: 70 },
    { month: "9AM", income: 200, expense: 150, cashflow: 140 },
    { month: "12PM", income: 350, expense: 200, cashflow: 240 },
    { month: "3PM", income: 280, expense: 180, cashflow: 200 },
    { month: "6PM", income: 420, expense: 250, cashflow: 290 },
    { month: "9PM", income: 180, expense: 120, cashflow: 200 },
  ],
  weekly: [
    { month: "Mon", income: 1200, expense: 800, cashflow: 400 },
    { month: "Tue", income: 1500, expense: 900, cashflow: 600 },
    { month: "Wed", income: 1800, expense: 1200, cashflow: 600 },
    { month: "Thu", income: 2200, expense: 1400, cashflow: 800 },
    { month: "Fri", income: 2800, expense: 1800, cashflow: 1000 },
    { month: "Sat", income: 1600, expense: 1000, cashflow: 600 },
    { month: "Sun", income: 1200, expense: 700, cashflow: 500 },
  ],
  monthly: [
    { month: "Jan", income: 12000, expense: 8000, cashflow: 4000 },
    { month: "Feb", income: 15000, expense: 9000, cashflow: 6000 },
    { month: "Mar", income: 18000, expense: 12000, cashflow: 6000 },
    { month: "Apr", income: 22000, expense: 14000, cashflow: 8000 },
    { month: "May", income: 28000, expense: 18000, cashflow: 10000 },
    { month: "Jun", income: 16000, expense: 10000, cashflow: 6000 },
    { month: "Jul", income: 25000, expense: 16000, cashflow: 9000 },
    { month: "Aug", income: 19000, expense: 12000, cashflow: 7000 },
    { month: "Sep", income: 21000, expense: 13000, cashflow: 8000 },
    { month: "Oct", income: 24000, expense: 15000, cashflow: 9000 },
    { month: "Nov", income: 17000, expense: 11000, cashflow: 6000 },
    { month: "Dec", income: 20000, expense: 13000, cashflow: 7000 },
  ],
  yearly: [
    { month: "2019", income: 180000, expense: 120000, cashflow: 60000 },
    { month: "2020", income: 165000, expense: 110000, cashflow: 55000 },
    { month: "2021", income: 210000, expense: 140000, cashflow: 70000 },
    { month: "2022", income: 245000, expense: 165000, cashflow: 80000 },
    { month: "2023", income: 280000, expense: 185000, cashflow: 95000 },
    { month: "2024", income: 320000, expense: 210000, cashflow: 110000 },
  ],
};
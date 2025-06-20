import { FinancialData, TimePeriod } from "@/types/allTypes";

// Mock data with proper typing
export const generateMockData = (): Record<TimePeriod, FinancialData> => ({
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

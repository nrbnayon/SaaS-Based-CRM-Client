import { FinancialData, TimePeriod } from "@/types/allTypes";

// Mock data generator for financial planning
export const generateFinancialPlanData = (): Record<TimePeriod, FinancialData> => ({
  daily: {
    amount: 125.5,
    period: "daily",
    increasePercent: 8,
    timePeriod: "24 hours",
    trendPercent: 5,
    isPositiveTrend: true,
  },
  weekly: {
    amount: 875.0,
    period: "weekly",
    increasePercent: 12,
    timePeriod: "7 days",
    trendPercent: 10,
    isPositiveTrend: true,
  },
  monthly: {
    amount: 3750.0,
    period: "monthly",
    increasePercent: 18,
    timePeriod: "30 days",
    trendPercent: 15,
    isPositiveTrend: true,
  },
  yearly: {
    amount: 45000.0,
    period: "yearly",
    increasePercent: 22,
    timePeriod: "365 days",
    trendPercent: 20,
    isPositiveTrend: true,
  },
});
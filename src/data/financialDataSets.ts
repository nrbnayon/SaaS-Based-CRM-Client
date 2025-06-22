// src\data\financialDataSets.ts
import { FinancialCard, FinancialData, TimePeriod } from "@/types/allTypes";

// Mock data generator for financial planning
export const generateFinancialPlanData = (): Record<
  TimePeriod,
  FinancialData
> => ({
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

// Financial planning specific cards
export const financialPlanCards: FinancialCard[] = [
  {
    id: "target-savings",
    title: "Annual Revenue",
    data: generateFinancialPlanData(),
    borderColor: "border-success",
    accentColor: "text-success",
    textColor: "text-success",
  },
  {
    id: "emergency-fund",
    title: "Total Costs",
    data: {
      ...generateFinancialPlanData(),
      monthly: {
        ...generateFinancialPlanData().monthly,
        amount: 5200.0,
        increasePercent: 25,
      },
      yearly: {
        ...generateFinancialPlanData().yearly,
        amount: 62400.0,
        increasePercent: 28,
      },
    },
    borderColor: "border-error",
    accentColor: "text-error",
    textColor: "text-error",
  },
  {
    id: "investment-goal",
    title: "Annual Saving",
    data: {
      ...generateFinancialPlanData(),
      monthly: {
        ...generateFinancialPlanData().monthly,
        amount: 2100.0,
        increasePercent: 15,
      },
      yearly: {
        ...generateFinancialPlanData().yearly,
        amount: 25200.0,
        increasePercent: 18,
      },
    },
    borderColor: "border-cyan",
    accentColor: "text-cyan",
    textColor: "text-cyan",
  },
  {
    id: "debt-payoff",
    title: "Vat/Tax ",
    data: {
      ...generateFinancialPlanData(),
      monthly: {
        ...generateFinancialPlanData().monthly,
        amount: 1850.0,
        increasePercent: 10,
        isPositiveTrend: false,
        trendPercent: -8,
      },
      yearly: {
        ...generateFinancialPlanData().yearly,
        amount: 22200.0,
        increasePercent: 12,
        isPositiveTrend: false,
        trendPercent: -10,
      },
    },
    borderColor: "border-white",
    accentColor: "text-white",
    textColor: "text-white",
  },
];
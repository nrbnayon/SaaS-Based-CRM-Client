// src/app/(dashboard)/financial-plan/page.tsx
"use client";
import DashboardHeader from "../components/dashboard-header";
import { 
  FinancialCardComponent, 
  type FinancialCard, 
  type TimePeriod, 
  type FinancialData 
} from "@/components/common/FinancialCardComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

// Mock data generator for financial planning
const generateFinancialPlanData = (): Record<TimePeriod, FinancialData> => ({
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
const financialPlanCards: FinancialCard[] = [
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
  }
];

export default function FinancialPlanPage() {
  const [selectedPeriods, setSelectedPeriods] = useState<
    Record<string, TimePeriod>
  >({
    "target-savings": "monthly",
    "emergency-fund": "monthly",
    "investment-goal": "monthly",
    "debt-payoff": "monthly",
    "retirement-fund": "monthly",
    "education-fund": "monthly",
  });

  const handlePeriodChange = (cardId: string, period: TimePeriod) => {
    setSelectedPeriods((prev) => ({ ...prev, [cardId]: period }));
  };

  

  return (
    <div className="">
      <DashboardHeader title='Report' />
      <div className='p-4 space-y-10'>
        
       

        {/* Financial Goals Grid */}
        <div className="space-y-6">
          {/* First Row - Primary Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialPlanCards.slice(0, 4).map((card) => (
              <FinancialCardComponent
                key={card.id}
                card={card}
                selectedPeriod={selectedPeriods[card.id]}
                onPeriodChange={handlePeriodChange}
                showPeriodSelector={true}
                isFromFinancialPlan={true} // This prop makes it show FileDown icon
              />
            ))}
          </div>

          
        </div>

        

      </div>
    </div>
  );
}
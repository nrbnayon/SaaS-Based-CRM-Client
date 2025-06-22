// src/components/ui/FinancialCard.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FinancialCard, TimePeriod } from "@/types/allTypes";
import { TrendingUp, TrendingDown, FileDown } from "lucide-react";
import React from "react";

interface FinancialCardProps {
  card: FinancialCard;
  selectedPeriod: TimePeriod;
  onPeriodChange: (cardId: string, period: TimePeriod) => void;
  showPeriodSelector?: boolean;
  className?: string;
  isFromFinancialPlan?: boolean;
}

export const FinancialCardComponent: React.FC<FinancialCardProps> = ({
  card,
  selectedPeriod,
  onPeriodChange,
  showPeriodSelector = true,
  className = "",
  isFromFinancialPlan = false,
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const currentData = card.data[selectedPeriod];

  // Conditional icon logic
  const TrendIcon = isFromFinancialPlan
    ? FileDown
    : currentData.isPositiveTrend
    ? TrendingUp
    : TrendingDown;

  const trendColorClass = currentData.isPositiveTrend
    ? card.accentColor
    : "text-error";

  return (
    <Card
      className={`flex flex-col w-full bg-secondary dark:bg-background items-center border-t-8 gap-2 p-2 flex-1 rounded-[20px] ${card.borderColor} min-h-[180px] ${className}`}
    >
      <CardHeader className='flex flex-row items-center justify-between px-2 py-1 w-full'>
        <CardTitle className='font-medium text-foreground dark:text-white text-base'>
          {card.title}
        </CardTitle>
        {showPeriodSelector && (
          <Select
            value={selectedPeriod}
            onValueChange={(value: TimePeriod) =>
              onPeriodChange(card.id, value)
            }
          >
            <SelectTrigger className='inline-flex items-center text-muted-foreground justify-center gap-1.5 px-1 py-2 h-auto w-auto bg-transparent border-none'>
              <SelectValue className='font-normal text-white text-xs' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='daily'>Daily</SelectItem>
              <SelectItem value='weekly'>Weekly</SelectItem>
              <SelectItem value='monthly'>Monthly</SelectItem>
              <SelectItem value='yearly'>Yearly</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      <CardContent className='flex flex-col items-start gap-1 w-full p-0 flex-1'>
        <div className='flex items-center gap-2 px-2 py-0 w-full'>
          <div className='font-bold text-foreground dark:text-white text-[32px] leading-[48px]'>
            {formatCurrency(currentData.amount ?? 0)}
          </div>
        </div>

        <div className='flex items-center justify-between w-full mt-auto'>
          <div className='flex items-center gap-2 px-2 py-1 flex-1'>
            <div className='font-normal text-foreground dark:text-white text-sm leading-5'>
              {card.id === "expense" ? "Increased by" : "Increased by"}{" "}
              <span className={`font-semibold ${card.accentColor}`}>
                {currentData.increasePercent ?? 0}%
              </span>{" "}
              <p className='flex gap-1 items-center'>
                last
                <span className={`font-semibold ${card.accentColor}`}>
                  {currentData.timePeriod ?? selectedPeriod}
                </span>
              </p>
            </div>
          </div>

          <div className='inline-flex items-center justify-center gap-2 p-1 rounded-lg'>
            {/* changeable icon part */}
            <TrendIcon className={`h-4 w-4 ${trendColorClass}`} />
            {!isFromFinancialPlan && (
              <div
                className={`${trendColorClass} font-semibold text-sm leading-[21px]`}
              >
                {Math.abs(currentData.trendPercent ?? 0)}%
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

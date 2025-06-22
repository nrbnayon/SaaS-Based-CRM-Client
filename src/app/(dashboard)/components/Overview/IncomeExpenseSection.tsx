// src\app\(dashboard)\components\Overview\IncomeExpenseSection.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SquarePlus } from "lucide-react";
import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { FinancialCardComponent } from "@/components/common/FinancialCardComponent";
import { FinancialCard, TimePeriod, Transaction } from "@/types/allTypes";
import { chartDataSets } from "@/data/chartDataSets";
import { generateMockData } from "@/data/generateMockData";
import { DynamicEditModal } from "@/components/common/DynamicEditModal";

const financialCards: FinancialCard[] = [
  {
    id: "expense",
    title: "Expense",
    data: {
      ...generateMockData(),
      monthly: {
        ...generateMockData().monthly,
        amount: 8942.5,
        isPositiveTrend: false,
        trendPercent: -12,
      },
      yearly: {
        ...generateMockData().yearly,
        amount: 107310.0,
        isPositiveTrend: false,
        trendPercent: -8,
      },
    },
    borderColor: "border-error",
    accentColor: "text-error",
    textColor: "text-error",
  },
  {
    id: "income",
    title: "Income",
    data: generateMockData(),
    borderColor: "border-success",
    accentColor: "text-success",
    textColor: "text-success",
  },
  {
    id: "savings",
    title: "Savings",
    data: {
      ...generateMockData(),
      monthly: { ...generateMockData().monthly, amount: 3210.5 },
      yearly: { ...generateMockData().yearly, amount: 38526.0 },
    },
    borderColor: "border-cyan",
    accentColor: "text-cyan",
    textColor: "text-cyan",
  },
];

export const IncomeExpenseSection: React.FC = () => {
  const [selectedPeriods, setSelectedPeriods] = useState<
    Record<string, TimePeriod>
  >({
    expense: "monthly",
    income: "monthly",
    savings: "monthly",
    analytics: "monthly",
  });

  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [newIncomeTransaction, setNewIncomeTransaction] =
    useState<Transaction | null>(null);
  const [newExpenseTransaction, setNewExpenseTransaction] =
    useState<Transaction | null>(null);

  const handleIncomeModalClose = () => {
    setIsIncomeDialogOpen(false);
    setNewIncomeTransaction(null);
  };

  const handleExpenseModalClose = () => {
    setIsExpenseDialogOpen(false);
    setNewExpenseTransaction(null);
  };

  const handleIncomeModalSave = (updatedTransaction: Transaction) => {
    console.log("Income submitted:", updatedTransaction);
    // Add your API call here to save the income
    setIsIncomeDialogOpen(false);
    setNewIncomeTransaction(null);
  };

  const handleExpenseModalSave = (updatedTransaction: Transaction) => {
    console.log("Expense submitted:", updatedTransaction);
    // Add your API call here to save the expense
    setIsExpenseDialogOpen(false);
    setNewExpenseTransaction(null);
  };

  const handleIncomeButtonClick = () => {
    const newTransaction: Transaction = {
      id: `income_${Date.now()}`,
      category: "",
      name: "",
      details: "",
      amount: "",
      transaction: "",
      account: "Income",
      date: new Date().toISOString().split("T")[0],
      contact: "",
      notes: "",
    };
    setNewIncomeTransaction(newTransaction);
    setIsIncomeDialogOpen(true);
  };

  const handleExpenseButtonClick = () => {
    const newTransaction: Transaction = {
      id: `expense_${Date.now()}`,
      category: "",
      name: "",
      details: "",
      amount: "",
      transaction: "",
      account: "Expense",
      date: new Date().toISOString().split("T")[0],
      contact: "",
      notes: "",
    };
    setNewExpenseTransaction(newTransaction);
    setIsExpenseDialogOpen(true);
  };

  // Calculate chart dimensions and data
  const chartData = useMemo(() => {
    const data = chartDataSets[selectedPeriods.analytics];
    const maxValue = Math.max(...data.flatMap((d) => [d.income, d.expense]));
    const chartHeight = 200;

    return data.map((item) => ({
      ...item,
      incomeHeight: Math.max(8, (item.income / maxValue) * chartHeight),
      expenseHeight: Math.max(8, (item.expense / maxValue) * chartHeight),
    }));
  }, [selectedPeriods.analytics]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handlePeriodChange = (cardId: string, period: TimePeriod) => {
    setSelectedPeriods((prev) => ({ ...prev, [cardId]: period }));
  };

  return (
    <div className='flex w-full justify-between items-center  gap-6 flex-col xl:flex-row'>
      <div className='flex flex-col justify-between items-center gap-6 flex-1 w-full xl:w-1/2'>
        {/* First Row - Expense and Income */}
        <div className='flex items-center gap-6 w-full flex-col sm:flex-row'>
          {financialCards.slice(0, 2).map((card) => (
            <FinancialCardComponent
              key={card.id}
              card={card}
              selectedPeriod={selectedPeriods[card.id]}
              onPeriodChange={handlePeriodChange}
              showPeriodSelector={true}
            />
          ))}
        </div>

        {/* Second Row - Savings and Add Accounts */}
        <div className='flex items-center gap-6 w-full flex-col sm:flex-row'>
          <FinancialCardComponent
            key={financialCards[2].id}
            card={financialCards[2]}
            selectedPeriod={selectedPeriods[financialCards[2].id]}
            onPeriodChange={handlePeriodChange}
            showPeriodSelector={true}
          />

          {/* Add Accounts Card */}
          <Card className='w-full flex flex-col bg-secondary dark:bg-background items-center gap-6 pt-2 border-none dark:border-t-8 pb-4 px-2 flex-1 rounded-[20px] dark:border-white min-h-[180px]'>
            <CardHeader className='flex-col items-start px-2 justify-start gap-1 py-1 w-full'>
              <CardTitle className='font-medium text-foreground dark:text-white text-base leading-5'>
                Add Accounts
              </CardTitle>
              <p className='font-normal text-muted-foreground text-xs leading-4'>
                You can add your daily income and expense
              </p>
            </CardHeader>

            <CardContent className='flex items-center gap-3 p-2 flex-1 w-full'>
              <Button
                variant='default'
                className='flex items-center justify-center gap-2 px-4 py-3 flex-1 bg-white hover:bg-gray-50 rounded-xl border border-gray-200'
                onClick={handleIncomeButtonClick}
              >
                <SquarePlus className='text-[#34C724] h-4 w-4' />
                <span className='font-semibold text-[#34C724] text-base'>
                  Income
                </span>
              </Button>

              <Button
                variant='default'
                className='flex items-center justify-center gap-2 px-4 py-3 flex-1 bg-white hover:bg-gray-50 rounded-xl border border-gray-200'
                onClick={handleExpenseButtonClick}
              >
                <SquarePlus className='text-error h-4 w-4' />
                <span className='font-semibold text-error text-base'>
                  Expense
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Card */}
      <div className='w-full xl:w-1/2'>
        <div
          className='p-[1px] rounded-[20px] dark:p-0'
          style={{
            background:
              "radial-gradient(circle at center, #4787F5, #FFFFFF, #FF9233)",
          }}
        >
          <Card
            className={cn(
              "flex flex-col h-96 justify-between items-start border-none shadow-none p-4 bg-[linear-gradient(45deg,var(--accent)_0%,white_50%,#FFF1E5_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)] flex-1 rounded-[20px] w-full xl:w-auto min-w-2xs"
            )}
          >
            <CardHeader className='flex flex-row items-center justify-between p-0 w-full'>
              <CardTitle className='inline-flex items-center justify-center gap-2 font-medium text-gray-800 dark:text-white text-base'>
                Analytics
              </CardTitle>
              <Select
                value={selectedPeriods.analytics}
                onValueChange={(value: TimePeriod) =>
                  handlePeriodChange("analytics", value)
                }
              >
                <SelectTrigger className='inline-flex items-center text-muted-custom justify-center gap-1.5 px-3 py-2 h-auto bg-white/20 dark:bg-transparent rounded-lg border-[0.5px] border-solid border-gray-300 dark:border-[#505050]'>
                  <SelectValue className='font-normal dark:text-muted-foreground text-xs' />
                  {/* <ChevronDownIcon className='h-4 w-4 text-muted-custom dark:text-muted-foreground' /> */}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='daily'>Daily</SelectItem>
                  <SelectItem value='weekly'>Weekly</SelectItem>
                  <SelectItem value='monthly'>Monthly</SelectItem>
                  <SelectItem value='yearly'>Yearly</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>

            <CardContent className='flex items-start justify-center overflow-x-auto md:overflow-hidden scrollbar-custom gap-4 px-2 py-0 h-full w-full flex-1'>
              {/* Y-axis labels - Fixed positioning */}
              <div className='flex flex-col items-start justify-between h-full min-w-[40px] py-2'>
                {(() => {
                  const maxIncome = Math.max(...chartData.map((d) => d.income));
                  const maxExpense = Math.max(
                    ...chartData.map((d) => d.expense)
                  );
                  const maxValue = Math.max(maxIncome, maxExpense);

                  const formatValue = (value: number): string => {
                    if (value >= 1000000)
                      return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${Math.round(value / 1000)}K`;
                    return value.toString();
                  };

                  return (
                    <>
                      <div className='font-normal text-muted-custom dark:text-muted-foreground text-xs'>
                        {formatValue(maxValue)}
                      </div>
                      <div className='font-normal text-muted-custom dark:text-muted-foreground text-xs'>
                        0
                      </div>
                      <div className='font-normal text-muted-custom dark:text-muted-foreground text-xs'>
                        {formatValue(maxValue)}
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className='flex flex-col items-center gap-2 flex-1 py-2'>
                {/* Income Chart (Top Half) */}
                <div className='flex items-end justify-between w-full h-[120px]'>
                  {chartData.map((item, index) => {
                    const maxValue = Math.max(
                      ...chartData.map((d) => Math.max(d.income, d.expense))
                    );
                    const incomeHeight = Math.max(
                      16,
                      (item.income / maxValue) * 110
                    );
                    // Highlight bars above 70% of max income
                    const incomeThreshold =
                      Math.max(...chartData.map((d) => d.income)) * 0.7;
                    const isHighlighted = item.income >= incomeThreshold;

                    return (
                      <div
                        key={`income-${index}`}
                        className={`w-8 ${
                          isHighlighted
                            ? "bg-card-foreground dark:bg-success"
                            : "bg-chart-1 dark:bg-[#447B56]"
                        } transition-all duration-300 hover:opacity-75 cursor-pointer`}
                        style={{
                          height: `${incomeHeight}px`,
                          borderRadius: "8px 8px 0 0",
                        }}
                        title={`${item.month}: ${formatCurrency(item.income)}`}
                      />
                    );
                  })}
                </div>

                {/* Center Labels */}
                <div className='flex items-center justify-between w-full py-1'>
                  {chartData.map((item, index) => (
                    <div
                      key={`label-${index}`}
                      className='w-8 font-normal text-muted-custom dark:text-muted-foreground text-xs text-center'
                    >
                      {item.month}
                    </div>
                  ))}
                </div>

                {/* Expense Chart (Bottom Half) */}
                <div className='flex items-start justify-between w-full h-[120px]'>
                  {chartData.map((item, index) => {
                    const maxValue = Math.max(
                      ...chartData.map((d) => Math.max(d.income, d.expense))
                    );
                    const expenseHeight = Math.max(
                      16,
                      (item.expense / maxValue) * 110
                    );
                    // Highlight bars above 70% of max expense
                    const expenseThreshold =
                      Math.max(...chartData.map((d) => d.expense)) * 0.7;
                    const isHighlighted = item.expense >= expenseThreshold;

                    return (
                      <div
                        key={`expense-${index}`}
                        className={`w-8 ${
                          isHighlighted
                            ? "bg-light-orange"
                            : "bg-border dark:bg-[#80564B]"
                        } transition-all duration-300 hover:opacity-75 cursor-pointer`}
                        style={{
                          height: `${expenseHeight}px`,
                          borderRadius: "0 0 8px 8px",
                        }}
                        title={`${item.month}: ${formatCurrency(item.expense)}`}
                      />
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <DynamicEditModal
        isOpen={isIncomeDialogOpen}
        onClose={handleIncomeModalClose}
        transaction={newIncomeTransaction}
        onSave={handleIncomeModalSave}
        title='Add Income Entry'
        description='Add your income information below. All fields marked with * are required.'
        modalType='income'
      />

      <DynamicEditModal
        isOpen={isExpenseDialogOpen}
        onClose={handleExpenseModalClose}
        transaction={newExpenseTransaction}
        onSave={handleExpenseModalSave}
        title='Add Expense Entry'
        description='Add your expense information below. All fields marked with * are required.'
        modalType='expense'
      />
    </div>
  );
};

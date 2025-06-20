"use client";
import {
  DynamicTable,
  type Transaction,
} from "@/components/common/DynamicTable";
import { FinancialCardComponent } from "@/components/common/FinancialCardComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chartDataSets } from "@/data/chartDataSets";
import { generateFinancialPlanData } from "@/data/financialDataSets";
import { initialTransactions } from "@/data/transactionData";
import { cn } from "@/lib/utils";
import { FinancialCard, TimePeriod } from "@/types/allTypes";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  },
];

const FinancialReport = () => {
  const [selectedPeriods, setSelectedPeriods] = useState<
    Record<string, TimePeriod>
  >({
    "target-savings": "monthly",
    "emergency-fund": "monthly",
    "investment-goal": "monthly",
    "debt-payoff": "monthly",
    "retirement-fund": "monthly",
    "education-fund": "monthly",
    analytics: "monthly", // Add analytics to selectedPeriods
  });

  const handlePeriodChange = (cardId: string, period: TimePeriod) => {
    setSelectedPeriods((prev) => ({ ...prev, [cardId]: period }));
  };

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  // Handle edit transaction
  const handleEditTransaction = (transaction: Transaction) => {
    console.log("Editing transaction:", transaction);
    // Update the transaction in the state
    setTransactions((prev) =>
      prev.map((t) => (t.id === transaction.id ? transaction : t))
    );
    // You can also make an API call here to update the backend
  };

  // Handle delete transaction
  const handleDeleteTransaction = (transactionId: string) => {
    console.log("Deleting transaction:", transactionId);
    // Remove the transaction from state
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    // You can also make an API call here to delete from backend
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // You can implement additional search logic here if needed
  };

  // Handle date filter
  const handleDateFilter = (startDate: string, endDate: string) => {
    console.log("Date filter:", startDate, "to", endDate);
    // Implement additional date filtering logic if needed
  };

  // Handle account filter
  const handleAccountFilter = (account: string) => {
    console.log("Account filter:", account);
    // Implement additional account filtering logic if needed
  };

  // Get current chart data based on selected period
  const currentChartData =
    chartDataSets[selectedPeriods.analytics || "monthly"];

  return (
    <div className="p-4 space-y-10">
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
              isFromFinancialPlan={true}
            />
          ))}
        </div>
      </div>
      <Tabs className="bg-transparent overflow-auto" defaultValue="Overview">
        <TabsList className="w-full bg-secondary h-12  overflow-auto">
          <TabsTrigger
            value="Overview"
            className=" text-base md:text-xl cursor-pointer"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="Cost-Analysis"
            className=" text-base md:text-xl cursor-pointer"
          >
            Cost Analysis
          </TabsTrigger>
          <TabsTrigger
            value="Cash-Flow"
            className=" text-base md:text-xl cursor-pointer"
          >
            Cash Flow
          </TabsTrigger>
          <TabsTrigger
            value="Taxes-Deadlines"
            className=" text-base md:text-xl cursor-pointer"
          >
            Taxes & Deadlines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Overview">
          <div className="w-full ">
            <Card
              className={cn(
                "flex flex-col h-96 justify-between items-start p-4 bg-[linear-gradient(45deg,var(--accent)_0%,white_50%,#FFF1E5_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)] flex-1 rounded-[20px] w-full xl:w-auto min-w-2xs"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between p-0 w-full">
                <CardTitle className="inline-flex items-center justify-center gap-2 font-medium text-gray-800 dark:text-white text-base">
                  Analytics
                </CardTitle>
                <Select
                  value={selectedPeriods.analytics}
                  onValueChange={(value: TimePeriod) =>
                    handlePeriodChange("analytics", value)
                  }
                >
                  <SelectTrigger className="inline-flex items-center text-muted-custom justify-center gap-1.5 px-3 py-2 h-auto bg-white/20 dark:bg-transparent rounded-lg border-[0.5px] border-solid border-gray-300 dark:border-[#505050]">
                    <SelectValue className="font-normal dark:text-muted-foreground text-xs" />
                    {/* <ChevronDownIcon className='h-4 w-4 text-muted-custom dark:text-muted-foreground' /> */}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>

              <CardContent className="w-full flex-1 p-0 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={currentChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Legend />
                    <Bar
                      dataKey="expense"
                      fill="#FFAD66"
                      name="Expense"
                      barSize={20}
                      radius={[10, 10, 10, 10]}
                      activeBar={{ fill: "#FFAD66" }}
                    />
                    <Bar
                      dataKey="income"
                      fill="#88F77C"
                      name="Income"
                      barSize={20}
                      radius={[10, 10, 10, 10]}
                      activeBar={{ fill: "#88F77C" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="Cash-Flow">
          <div className="w-full ">
            <Card
              className={cn(
                "flex flex-col h-96 justify-between items-start p-4 bg-[linear-gradient(45deg,var(--accent)_0%,white_50%,#FFF1E5_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)] flex-1 rounded-[20px] w-full xl:w-auto min-w-2xs"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between p-0 w-full">
                <CardTitle className="inline-flex items-center justify-center gap-2 font-medium text-gray-800 dark:text-white text-base">
                  Analytics
                </CardTitle>
                <Select
                  value={selectedPeriods.analytics}
                  onValueChange={(value: TimePeriod) =>
                    handlePeriodChange("analytics", value)
                  }
                >
                  <SelectTrigger className="inline-flex items-center text-muted-custom justify-center gap-1.5 px-3 py-2 h-auto bg-white/20 dark:bg-transparent rounded-lg border-[0.5px] border-solid border-gray-300 dark:border-[#505050]">
                    <SelectValue className="font-normal dark:text-muted-foreground text-xs" />
                    {/* <ChevronDownIcon className='h-4 w-4 text-muted-custom dark:text-muted-foreground' /> */}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>

              <CardContent className="w-full flex-1 p-0 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={currentChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="cashflow"
                      stroke="#18A0FB"
                      name="Cash Flow"
                    />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#88F77C"
                      name="Income"
                    />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#F54A45"
                      name="Expense"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <div></div>

      {/* Transaction table */}
      <div>
        <DynamicTable
          title="All Transactions"
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          onSearch={handleSearch}
          onDateFilter={handleDateFilter}
          onAccountFilter={handleAccountFilter}
          enableDelete={true}
          className="mb-8"
          itemsPerPage={12}
        />
      </div>
    </div>
  );
};

export default FinancialReport;

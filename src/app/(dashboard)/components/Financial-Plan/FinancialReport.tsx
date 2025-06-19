import { DynamicTable, type Transaction } from '@/components/common/DynamicTable';
import { FinancialCardComponent, type FinancialCard, type FinancialData, type TimePeriod } from '@/components/common/FinancialCardComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { Bar, BarChart,  Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ChartData {
  month: string;
  income: number;
  expense: number;
  cashflow:number;
}
// Chart data for different periods
const chartDataSets: Record<TimePeriod, ChartData[]> = {
  daily: [
    { month: "6AM", income: 120, expense: 80, cashflow:70 },
    { month: "9AM", income: 200, expense: 150, cashflow:140  },
    { month: "12PM", income: 350, expense: 200, cashflow:240 },
    { month: "3PM", income: 280, expense: 180, cashflow:200  },
    { month: "6PM", income: 420, expense: 250, cashflow:290  },
    { month: "9PM", income: 180, expense: 120, cashflow:200  },
  ],
  weekly: [
    { month: "Mon", income: 1200, expense: 800 , cashflow: 400 },
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
        "analytics": "monthly", // Add analytics to selectedPeriods
      });
    
      const handlePeriodChange = (cardId: string, period: TimePeriod) => {
        setSelectedPeriods((prev) => ({ ...prev, [cardId]: period }));
      };
    
    
      const initialTransactions: Transaction[] = [
        {
          id: "1s5gf1",
          category: "Salary",
          name: "Starbucks",
          details: "Dhanmondi Branch 2 Rent",
          amount: "$33,200",
          image: "Image",
          transaction: "Bank",
          account: "Income",
          date: "2024-01-15",
        },
        {
          id: "1s5gf2",
          category: "General Electric",
          name: "Equipment's",
          details: "Dhanmondi Branch 2 Rent",
          amount: "$2,200",
          image: "Image",
          transaction: "Bank",
          account: "Income",
          date: "2024-01-14",
        },
        {
          id: "dsrg515",
          category: "Pizza Hut",
          name: "Office Rent",
          details: "Dhanmondi Branch 2 Rent",
          amount: "$12,200",
          image: "Image",
          transaction: "Bank",
          account: "Expense",
          date: "2024-01-13",
        },
        {
          id: "452hd",
          category: "Car Rent",
          name: "Car Rent",
          details: "Dhanmondi Branch 2 Rent",
          amount: "$1,200",
          image: "Image",
          transaction: "Bank",
          account: "Expense",
          date: "2024-01-12",
        },
        {
          id: "4rs4g",
          category: "Office Rent",
          name: "Office Rent",
          details: "Dhanmondi Branch 2 Rent",
          amount: "$12,200",
          image: "Image",
          transaction: "Bank",
          account: "Expense",
          date: "2024-01-11",
        },
        {
          id: "78er4gtf",
          category: "Tax Payment",
          name: "VAT Payment",
          details: "Monthly VAT Payment",
          amount: "$500",
          image: "Image",
          transaction: "Bank",
          account: "VAT",
          date: "2024-01-10",
        },
        {
          id: "sav001",
          category: "Investment",
          name: "Fixed Deposit",
          details: "6 Month Fixed Deposit",
          amount: "$5,000",
          image: "Image",
          transaction: "Bank",
          account: "Saving",
          date: "2024-01-09",
        },
      ];
    
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
        const currentChartData = chartDataSets[selectedPeriods.analytics || 'monthly'];
    
  return (
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
            <Tabs className="bg-transparent overflow-auto" defaultValue="Overview">
              <TabsList className="w-full bg-secondary h-12  overflow-auto">
                <TabsTrigger  value="Overview" className=" text-base md:text-xl cursor-pointer">Overview</TabsTrigger>
                <TabsTrigger value="Cost-Analysis" className=" text-base md:text-xl cursor-pointer">Cost Analysis</TabsTrigger>
                <TabsTrigger value="Cash-Flow" className=" text-base md:text-xl cursor-pointer">Cash Flow</TabsTrigger>
                <TabsTrigger value="Taxes-Deadlines" className=" text-base md:text-xl cursor-pointer">Taxes & Deadlines</TabsTrigger>
              </TabsList>

              <TabsContent value="Overview">
                 <div className='w-full '>
                    <Card
                        className={cn(
                            "flex flex-col h-96 justify-between items-start p-4 bg-[linear-gradient(45deg,var(--accent)_0%,white_50%,#FFF1E5_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)] flex-1 rounded-[20px] w-full xl:w-auto min-w-2xs"
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
                                    <Tooltip cursor={{ fill: 'transparent' }} />
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
                 <div className='w-full '>
                    <Card
                        className={cn(
                            "flex flex-col h-96 justify-between items-start p-4 bg-[linear-gradient(45deg,var(--accent)_0%,white_50%,#FFF1E5_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)] flex-1 rounded-[20px] w-full xl:w-auto min-w-2xs"
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
                                
                                <XAxis dataKey="name" axisLine={false} tickLine={false}/>
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }}/>
                                <Legend />
                                <Line type="monotone" dataKey="cashflow" stroke="#18A0FB" name='Cash Flow' />
                                <Line type="monotone" dataKey="income" stroke="#88F77C" name='Income' />
                                <Line type="monotone" dataKey="expense" stroke="#F54A45"  name='Expense'/>
                                </LineChart>
                            </ResponsiveContainer>

                        </CardContent>
                    </Card>
                </div>

              </TabsContent>


            </Tabs>
        <div>

        </div>

        {/* Transaction table */}
        <div>
          <DynamicTable
                  title='All Transactions'
                  transactions={transactions}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                  onSearch={handleSearch}
                  onDateFilter={handleDateFilter}
                  onAccountFilter={handleAccountFilter}
                  enableDelete={true}
                  className='mb-8'
                  itemsPerPage={10}
                />
        </div>
        

      </div>
  )
}

export default FinancialReport
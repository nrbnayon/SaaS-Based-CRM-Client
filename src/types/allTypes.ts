/** @format */

// src\types\allTypes.ts
// Plan interface
export interface Plan {
  names?: string;
  image?: string;
  id: string | number;
  plan?: string;
  issue?: string;
  expire?: string;
  amount?: number | string;
  download: string;
  [key: string]: unknown;
}

// Props interface
export type PlanTableProps = {
  title?: string;
  plans?: Plan[];
  tableColumns?: string[];
  itemsPerPage?: number;
  enableSearch?: boolean;
  searchPlaceholder?: string;
};
// Hr test type definations
export interface HRTestCardProps {
  testId?: string;
  title?: string;
  description?: string;
  candidateCount?: number;
  rejectedCount?: number;
  approvedCount?: number;
}

export interface SlideData {
  title: string;
  oldPrice: number;
  price: number;
  planfor: string;
}

// Transaction type definitions
export interface Transaction {
  id: string;
  category: string;
  name: string;
  details: string;
  amount: string;
  image?: string;
  transaction: string;
  account: "Income" | "Expense" | "VAT" | "Saving";
  date?: string;
  discount?: string | number;
  expanse?: string | number;
  income?: string | number;
  balance?: string | number;
  contact?: string;
  notes?: string;
  uploadedFiles?: File[];
  [key: string]: unknown;
}

export interface TransactionForm {
  title?: string;
  description?: string;
  amount?: string;
  category?: string;
  type?: string;
  [key: string]: unknown;
}

// chart data type
export interface ChartData {
  day?: string;
  week?: string;
  month: string;
  year?: string;
  income: number;
  expense: number;
  vat?: number;
  saving?: number;
  cashflow?: number;
  [key: string]: unknown;
}

// Type definitions
export type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";

export interface FinancialData {
  amount?: number;
  period?: TimePeriod;
  increasePercent?: number;
  timePeriod?: string;
  trendPercent?: number;
  isPositiveTrend?: boolean;
}

export interface FinancialCard {
  id: string;
  title: string;
  data: Record<TimePeriod, FinancialData>;
  borderColor: string;
  accentColor: string;
  textColor: string;
}

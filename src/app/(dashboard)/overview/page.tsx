// src/app/(dashboard)/overview/page.tsx
import DashboardHeader from "../components/dashboard-header";
import { AnalyticsSection } from "../components/Overview/AnalyticsSection";
import { IncomeExpenseSection } from "../components/Overview/IncomeExpenseSection";
import TransactionsSection from "../components/Overview/TransectionsSection";

export default function OverviewPage() {
  return (
    <div className="">
      <DashboardHeader title='Welcome  Nayon' />
      <div className='p-4 space-y-4 md:space-y-10'>
        {/* Add more cards as needed */}
        <IncomeExpenseSection />
        <AnalyticsSection />
        <TransactionsSection />
      </div>
    </div>
  );
}

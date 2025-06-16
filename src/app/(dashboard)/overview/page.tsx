// src/app/(dashboard)/overview/page.tsx
import DashboardHeader from "../components/dashboard-header";
import { AnalyticsSection } from "../components/Overview/AnalyticsSection";
import { IncomeExpenseSection } from "../components/Overview/IncomeExpenseSection";
import TransactionsSection from "../components/Overview/TransectionsSection";

export default function OverviewPage() {
  return (
    <div>
      <DashboardHeader title='Welcome  Nayon' />
      <div className='mt-10 space-y-10'>
        {/* Add more cards as needed */}
        <IncomeExpenseSection />
        <AnalyticsSection />
        <TransactionsSection />
      </div>
    </div>
  );
}

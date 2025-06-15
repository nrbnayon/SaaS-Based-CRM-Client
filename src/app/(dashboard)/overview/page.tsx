import DashboardHeader from "../components/dashboard-header";
import { IncomeExpenseSection } from "../components/Overview/IncomeExpenseSection";

// src/app/(dashboard)/overview/page.tsx
export default function OverviewPage() {
  return (
    <div>
      <DashboardHeader title='Welcome  Nayon' />
      <div className="mt-10">
        {/* Add more cards as needed */}
        <IncomeExpenseSection />
      </div>
    </div>
  );
}

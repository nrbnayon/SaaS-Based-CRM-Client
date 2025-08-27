// src/app/(admin-dashboard)/admin/accounting-assistance/page.tsx
import AdminDashboardHeader from "../../components/admin-dashboard-header";
import { AccountingAssistance } from "../../components/Admin/AccountingAssistance";

export default function AccountingAssistancePage() {
  return (
    <div className="">
      <AdminDashboardHeader title='Accounting Assistance' />
      <AccountingAssistance />
    </div>
  );
}
// src/app/(admin-dashboard)/admin/page.tsx
import AdminDashboardHeader from "../components/admin-dashboard-header";
import { InitialDashboard } from "../components/Admin/InitialDashboard";

export default function AdminPage() {
  return (
    <div className="">
      <AdminDashboardHeader title='Administrator Platform' />
      <InitialDashboard />
    </div>
  );
}
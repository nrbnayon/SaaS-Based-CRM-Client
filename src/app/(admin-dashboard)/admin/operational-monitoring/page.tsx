// src/app/(admin-dashboard)/admin/operational-monitoring/page.tsx
import AdminDashboardHeader from "../../components/admin-dashboard-header";
import { OperationalMonitoring } from "../../components/Admin/OperationalMonitoring";

export default function OperationalMonitoringPage() {
  return (
    <div className="">
      <AdminDashboardHeader title='Operational Monitoring' />
      <OperationalMonitoring />
    </div>
  );
}
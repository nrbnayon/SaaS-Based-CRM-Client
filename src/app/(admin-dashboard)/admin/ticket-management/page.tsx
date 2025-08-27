// src/app/(admin-dashboard)/admin/ticket-management/page.tsx
import AdminDashboardHeader from "../../components/admin-dashboard-header";
import { TicketManagement } from "../../components/Admin/TicketManagement";

export default function TicketManagementPage() {
  return (
    <div className="">
      <AdminDashboardHeader title='Ticket Management' />
      <TicketManagement />
    </div>
  );
}
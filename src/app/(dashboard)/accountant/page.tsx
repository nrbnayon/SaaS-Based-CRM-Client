// src/app/(dashboard)/accountant/page.tsx
import DashboardHeader from "../components/dashboard-header";
import { AccountantPage } from "../components/Accountant/AccountantPage";

export default function Accountant() {
  return (
    <div className="">
      <DashboardHeader title='Accountant Dashboard' />
      <AccountantPage />
    </div>
  );
}
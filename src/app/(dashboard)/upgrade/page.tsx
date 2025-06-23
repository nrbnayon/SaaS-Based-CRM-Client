/** @format */

import { DynamicBillingTable } from "@/components/common/DynamicBillingTable";
import DashboardHeader from "../components/dashboard-header";
import UpgradePage from "../components/Upgrade/UpgradePage";

// Plan interface
interface Plan {
  id: string;
  plan: string;
  issue: string;
  expire: string;
  amount: number | string;
  download: string;
  [key: string]: string | number;
}

// Sample billing data
const billingPlans: Plan[] = [
  {
    id: "plan_001",
    plan: "Basic Monthly",
    issue: "2024-01-15",
    expire: "2024-02-15",
    amount: 29.99,
    download: "/invoices/basic_monthly_jan2024.pdf",
  },
  {
    id: "plan_002",
    plan: "Pro Annual",
    issue: "2024-01-01",
    expire: "2025-01-01",
    amount: 299.99,
    download: "/invoices/pro_annual_2024.pdf",
  },
  {
    id: "plan_003",
    plan: "Enterprise Monthly",
    issue: "2024-02-01",
    expire: "2024-03-01",
    amount: 99.99,
    download: "/invoices/enterprise_monthly_feb2024.pdf",
  },
  {
    id: "plan_004",
    plan: "Starter Weekly",
    issue: "2024-02-10",
    expire: "2024-02-17",
    amount: 9.99,
    download: "/invoices/starter_weekly_feb2024.pdf",
  },
  {
    id: "plan_005",
    plan: "Premium Quarterly",
    issue: "2024-01-01",
    expire: "2024-04-01",
    amount: 149.99,
    download: "/invoices/premium_quarterly_q1_2024.pdf",
  },
  {
    id: "plan_006",
    plan: "Business Annual",
    issue: "2023-12-01",
    expire: "2024-12-01",
    amount: 599.99,
    download: "/invoices/business_annual_2024.pdf",
  },
  {
    id: "plan_007",
    plan: "Free Trial",
    issue: "2024-02-15",
    expire: "2024-02-29",
    amount: 0,
    download: "",
  },
  {
    id: "plan_008",
    plan: "Student Monthly",
    issue: "2024-02-01",
    expire: "2024-03-01",
    amount: 14.99,
    download: "/invoices/student_monthly_feb2024.pdf",
  },
  {
    id: "plan_009",
    plan: "Team Monthly",
    issue: "2024-01-20",
    expire: "2024-02-20",
    amount: 199.99,
    download: "/invoices/team_monthly_jan2024.pdf",
  },
  {
    id: "plan_010",
    plan: "Corporate Annual",
    issue: "2024-01-01",
    expire: "2025-01-01",
    amount: 1299.99,
    download: "/invoices/corporate_annual_2024.pdf",
  },
];

// Server Component
export default function Upgrade() {
  console.log("Upgrade - Billing plans:", billingPlans);

  return (
    <div className="">
      <DashboardHeader title="Upgrade" />
      <div className="p-2 md:p-4 space-y-4 md:space-y-10">
        <UpgradePage />
        <div className="mt-8">
          <DynamicBillingTable
            title="Billing History"
            plans={billingPlans}
            itemsPerPage={8}
          />
        </div>
      </div>
    </div>
  );
}

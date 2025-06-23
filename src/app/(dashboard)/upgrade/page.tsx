/** @format */

import DashboardHeader from "../components/dashboard-header";
import UpgradePage from "../components/Upgrade/UpgradePage";

// src/app/(dashboard)/overview/page.tsx

export default function Upgrade() {
  return (
    <div className="">
      <DashboardHeader title="Upgrade" />
      <div className="p-2 md:p-4 space-y-4 md:space-y-10">
        <UpgradePage />
      </div>
    </div>
  );
}

"use client";

import DashboardHeader from "../components/dashboard-header";
import ProfilePage from "../components/Profile/ProfilePage";

export default function Profile() {
  return (
    <div>
      <DashboardHeader title="Welcome  Nayon" />
      <div className="p-6 md:px-12 xl:px-16 ">
        <ProfilePage />
      </div>
    </div>
  );
}

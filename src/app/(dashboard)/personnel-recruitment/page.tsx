// src/app/(dashboard)/personnel-recruitment/page.tsx
import DashboardHeader from "../components/dashboard-header";
import { PersonnelRecruitmentPage } from "../components/PersonnelRecruitment/PersonnelRecruitmentPage";

export default function PersonnelRecruitment() {
  return (
    <div className=''>
      <DashboardHeader title='Personnel Recruitment' />
      <PersonnelRecruitmentPage />
    </div>
  );
}

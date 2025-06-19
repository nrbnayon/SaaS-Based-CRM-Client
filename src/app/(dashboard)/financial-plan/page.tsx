// src/app/(dashboard)/financial-plan/page.tsx
"use client";

import DashboardHeader from "../components/dashboard-header";

import FinancialReport from "../components/Financial-Plan/FinancialReport";




export default function FinancialPlanPage() {
 
  

  return (
    <div className="">
      <DashboardHeader title='Report' />
      <FinancialReport/>
      
    </div>
  );
}
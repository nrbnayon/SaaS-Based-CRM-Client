// src/app/(admin-dashboard)/layout.tsx
import React from "react";
import AdminDashboardWrapper from "./components/admin-dashboard-wrapper";
import { Analytics } from "@vercel/analytics/next";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminDashboardWrapper>
      {children}
      <Analytics />
    </AdminDashboardWrapper>
  );
}
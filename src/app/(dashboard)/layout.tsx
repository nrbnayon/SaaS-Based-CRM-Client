// src/app/(dashboard)/layout.tsx
import React from "react";
import DashboardWrapper from "./components/dashboard-wrapper";
import { Analytics } from "@vercel/analytics/next";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardWrapper>
      {children}
      <Analytics />
    </DashboardWrapper>
  );
}

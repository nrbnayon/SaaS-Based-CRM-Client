// src/app/(dashboard)/layout.tsx
import React from "react";
import DashboardWrapper from "./components/dashboard-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}

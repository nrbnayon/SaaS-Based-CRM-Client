// src/app/(dashboard)/components/Accountant/AccountantPage.tsx
"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceCreation } from "./InvoiceCreation";
import { InvoiceOverview } from "./InvoiceOverview";
import { BankStatementUpload } from "./BankStatementUpload";
import { DirectSupport } from "./DirectSupport";
import { FileText, BarChart3, Upload, MessageSquare } from "lucide-react";

export const AccountantPage = () => {
  const [activeTab, setActiveTab] = useState("invoice-creation");

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Accountant Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your invoices, bank statements, and communicate with your accountant
        </p>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-background border border-border">
          <TabsTrigger 
            value="invoice-creation" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Create Invoice</span>
          </TabsTrigger>
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="bank-statements" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Bank Statements</span>
          </TabsTrigger>
          <TabsTrigger 
            value="support" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoice-creation" className="mt-6">
          <InvoiceCreation />
        </TabsContent>

        <TabsContent value="overview" className="mt-6">
          <InvoiceOverview />
        </TabsContent>

        <TabsContent value="bank-statements" className="mt-6">
          <BankStatementUpload />
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <DirectSupport />
        </TabsContent>
      </Tabs>
    </div>
  );
};
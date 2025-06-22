// src/app/(dashboard)/overview/transactions/page.tsx
"use client";

import React, { useState } from "react";
import { DynamicTable, Transaction } from "@/components/common/DynamicTable";
import DashboardHeader from "../../components/dashboard-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { allTransactions } from "@/data/transactionData";

export default function AllTransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] =
    useState<Transaction[]>(allTransactions);

  // Handle edit transaction
  const handleEditTransaction = (transaction: Transaction) => {
    console.log("Editing transaction:", transaction);
    setTransactions((prev) =>
      prev.map((t) => (t.id === transaction.id ? transaction : t))
    );
  };

  // Handle delete transaction
  const handleDeleteTransaction = (transactionId: string) => {
    console.log("Deleting transaction:", transactionId);
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };

  // Handle date filter
  const handleDateFilter = (startDate: string, endDate: string) => {
    console.log("Date filter:", startDate, "to", endDate);
  };

  // Handle account filter
  const handleAccountFilter = (account: string) => {
    console.log("Account filter:", account);
  };

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  return (
    <div className=''>
      <DashboardHeader title='All Transactions' />
      <div className='p-4'>
        {/* Back Button */}
        <div className='mb-6'>
          <Button
            variant='outline'
            onClick={handleBack}
            className='flex items-center gap-2 hover:bg-accent dark:hover:bg-secondary'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Overview
          </Button>
        </div>

        {/* All Transactions Table */}
        <DynamicTable
          title='All Transactions'
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          onSearch={handleSearch}
          onDateFilter={handleDateFilter}
          onAccountFilter={handleAccountFilter}
          enableDelete={true}
          enableEdit={true}
          enableSearch={true}
          showFilters={true}
          itemsPerPage={15} 
          columns={[
            "T-ID",
            "Category",
            "Name",
            "Details",
            "Amount",
            "Transaction",
            "Account",
            "Date",
            "Edit",
          ]}
          searchPlaceholder='Search all transactions...'
        />
      </div>
    </div>
  );
}

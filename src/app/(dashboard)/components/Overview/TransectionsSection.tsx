// src/app/(dashboard)/components/Overview/TransectionsSection.tsx
"use client";

import React, { useState } from "react";
import { DynamicTable } from "@/components/common/DynamicTable";
import { initialTransactions } from "@/data/transactionData";
import { Transaction } from "@/types/allTypes";

const TransectionsSection = () => {
  // State to manage transactions
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  // Handle edit transaction
  const handleEditTransaction = (transaction: Transaction) => {
    console.log("Editing transaction:", transaction);
    // Update the transaction in the state
    setTransactions((prev) =>
      prev.map((t) => (t.id === transaction.id ? transaction : t))
    );
    // You can also make an API call here to update the backend
  };

  // Handle delete transaction
  const handleDeleteTransaction = (transactionId: string) => {
    console.log("Deleting transaction:", transactionId);
    // Remove the transaction from state
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    // You can also make an API call here to delete from backend
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // You can implement additional search logic here if needed
  };

  // Handle date filter
  const handleDateFilter = (startDate: string, endDate: string) => {
    console.log("Date filter:", startDate, "to", endDate);
    // Implement additional date filtering logic if needed
  };

  // Handle account filter
  const handleAccountFilter = (account: string) => {
    console.log("Account filter:", account);
    // Implement additional account filtering logic if needed
  };

  return (
    <div className=' mx-auto '>
      {/* Basic Usage with Edit and Delete */}
      <DynamicTable
        title='All Transactions'
        transactions={transactions}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
        onSearch={handleSearch}
        onDateFilter={handleDateFilter}
        onAccountFilter={handleAccountFilter}
        enableDelete={true}
        className='mb-8'
        itemsPerPage={10}
        // showFilters={false}
      />

      {/* Customized Usage - Income Only with Link Button */}
      <DynamicTable
        title='Income Transactions'
        transactions={transactions.filter((t) => t.account === "Income")}
        columns={["T-ID", "Category", "Name", "Amount", "Date", "Edit"]}
        searchPlaceholder='Search income transactions'
        onEdit={handleEditTransaction}
        showFilters={false}
        className='mb-8'
        text='Show all'
        url='/overview/transactions'
        itemsPerPage={5}
      />

      {/* Read-only Table */}
      <DynamicTable
        title='Expense Report (Read Only)'
        transactions={transactions.filter((t) => t.account === "Expense")}
        enableEdit={false}
        enableSearch={false}
        enableDelete={false}
        showFilters={false}
        columns={["T-ID", "Category", "Name", "Details", "Amount"]}
        itemsPerPage={8}
      />
    </div>
  );
};

export default TransectionsSection;

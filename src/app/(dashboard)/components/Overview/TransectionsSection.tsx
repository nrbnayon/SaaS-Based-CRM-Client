// src/app/(dashboard)/components/Overview/TransectionsSection.tsx
"use client";

import React, { useState } from "react";
import { DynamicTable, Transaction } from "@/components/common/DynamicTable";

// Sample transaction data
const initialTransactions: Transaction[] = [
  {
    id: "1s5gf1",
    category: "Salary",
    name: "Starbucks",
    details: "Dhanmondi Branch 2 Rent",
    amount: "$33,200",
    image: "Image",
    transaction: "Bank",
    account: "Income",
    date: "2024-01-15",
  },
  {
    id: "1s5gf2",
    category: "General Electric",
    name: "Equipment's",
    details: "Dhanmondi Branch 2 Rent",
    amount: "$2,200",
    image: "Image",
    transaction: "Bank",
    account: "Income",
    date: "2024-01-14",
  },
  {
    id: "dsrg515",
    category: "Pizza Hut",
    name: "Office Rent",
    details: "Dhanmondi Branch 2 Rent",
    amount: "$12,200",
    image: "Image",
    transaction: "Bank",
    account: "Expense",
    date: "2024-01-13",
  },
  {
    id: "452hd",
    category: "Car Rent",
    name: "Car Rent",
    details: "Dhanmondi Branch 2 Rent",
    amount: "$1,200",
    image: "Image",
    transaction: "Bank",
    account: "Expense",
    date: "2024-01-12",
  },
  {
    id: "4rs4g",
    category: "Office Rent",
    name: "Office Rent",
    details: "Dhanmondi Branch 2 Rent",
    amount: "$12,200",
    image: "Image",
    transaction: "Bank",
    account: "Expense",
    date: "2024-01-11",
  },
  {
    id: "78er4gtf",
    category: "Tax Payment",
    name: "VAT Payment",
    details: "Monthly VAT Payment",
    amount: "$500",
    image: "Image",
    transaction: "Bank",
    account: "VAT",
    date: "2024-01-10",
  },
  {
    id: "sav001",
    category: "Investment",
    name: "Fixed Deposit",
    details: "6 Month Fixed Deposit",
    amount: "$5,000",
    image: "Image",
    transaction: "Bank",
    account: "Saving",
    date: "2024-01-09",
  },
];

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
        url='/overview'
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

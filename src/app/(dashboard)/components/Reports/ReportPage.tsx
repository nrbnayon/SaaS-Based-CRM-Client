"use client";
import {
  DynamicTable,
  type Transaction,
} from "@/components/common/DynamicTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

// Define the invoice data interface
interface InvoiceData {
  invoiceNo: string;
  name: string;
  details: string;
  bill: string;
  discount: number;
  expanse: number;
  income: number;
  balance: number;
}

export const ReportPage = () => {
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

  const invoiceData: InvoiceData[] = [
    {
      invoiceNo: "INV001",
      name: "Office Rent",
      details: "Dhanmondi Branch 2 Rent",
      bill: "Bank",
      discount: 0,
      expanse: 50000,
      income: 0,
      balance: -50000,
    },
    {
      invoiceNo: "INV002",
      name: "Equipment's",
      details: "Dhanmondi Branch 2 Equipment",
      bill: "Cash",
      discount: 500,
      expanse: 15000,
      income: 0,
      balance: -14500,
    },
    {
      invoiceNo: "INV003",
      name: "Car Rent",
      details: "Dhanmondi Branch 2 Car",
      bill: "Bank",
      discount: 0,
      expanse: 20000,
      income: 0,
      balance: -20000,
    },
    {
      invoiceNo: "INV004",
      name: "Office Rent",
      details: "Dhanmondi Branch 1 Rent",
      bill: "Bank",
      discount: 1000,
      expanse: 45000,
      income: 0,
      balance: -44000,
    },
    {
      invoiceNo: "INV005",
      name: "Equipment's",
      details: "Printer for Dhanmondi Branch 2",
      bill: "Cash",
      discount: 200,
      expanse: 12000,
      income: 0,
      balance: -11800,
    },
    {
      invoiceNo: "INV006",
      name: "Car Rent",
      details: "Staff Transport Dhanmondi",
      bill: "Bank",
      discount: 0,
      expanse: 18000,
      income: 0,
      balance: -18000,
    },
    {
      invoiceNo: "INV007",
      name: "Office Rent",
      details: "Mirpur Branch Rent",
      bill: "Bank",
      discount: 0,
      expanse: 40000,
      income: 0,
      balance: -40000,
    },
    {
      invoiceNo: "INV008",
      name: "Equipment's",
      details: "Computers for Mirpur Branch",
      bill: "Cash",
      discount: 300,
      expanse: 25000,
      income: 0,
      balance: -24700,
    },
    {
      invoiceNo: "INV009",
      name: "Car Rent",
      details: "Delivery Van Dhanmondi",
      bill: "Bank",
      discount: 0,
      expanse: 22000,
      income: 0,
      balance: -22000,
    },
    {
      invoiceNo: "INV010",
      name: "Office Rent",
      details: "Uttara Branch Rent",
      bill: "Bank",
      discount: 500,
      expanse: 48000,
      income: 0,
      balance: -47500,
    },
    {
      invoiceNo: "INV011",
      name: "Equipment's",
      details: "Furniture for Uttara Branch",
      bill: "Cash",
      discount: 400,
      expanse: 30000,
      income: 0,
      balance: -29600,
    },
    {
      invoiceNo: "INV012",
      name: "Car Rent",
      details: "Manager Car Uttara",
      bill: "Bank",
      discount: 0,
      expanse: 25000,
      income: 0,
      balance: -25000,
    },
    {
      invoiceNo: "INV013",
      name: "Office Rent",
      details: "Banani Branch Rent",
      bill: "Bank",
      discount: 0,
      expanse: 52000,
      income: 0,
      balance: -52000,
    },
    {
      invoiceNo: "INV014",
      name: "Equipment's",
      details: "Air Conditioner for Banani",
      bill: "Cash",
      discount: 600,
      expanse: 35000,
      income: 0,
      balance: -34400,
    },
    {
      invoiceNo: "INV015",
      name: "Car Rent",
      details: "Client Transport Banani",
      bill: "Bank",
      discount: 0,
      expanse: 23000,
      income: 0,
      balance: -23000,
    },
  ];

  // Convert invoice data to transaction format for the DynamicTable
  const convertInvoiceToTransactions = (
    invoices: InvoiceData[]
  ): Transaction[] => {
    return invoices.map((invoice) => ({
      id: invoice.invoiceNo,
      category: invoice.name,
      name: invoice.name,
      details: invoice.details,
      amount: `$${invoice.balance.toLocaleString()}`,
      image: "Image",
      transaction: invoice.bill,
      account:
        invoice.balance < 0 ? "Expense" : ("Income" as Transaction["account"]),
      date: new Date().toISOString().split("T")[0],
      // Add custom fields for invoice-specific data
      invoiceNo: invoice.invoiceNo,
      bill: invoice.bill,
      discount: invoice.discount,
      expanse: invoice.expanse,
      income: invoice.income,
      balance: invoice.balance,
    }));
  };

  // Convert invoice data to transaction format
  const invoiceTransactions = convertInvoiceToTransactions(invoiceData);

  return (
    <div className='p-4 space-y-0'>
      <Tabs
        className='bg-transparent overflow-auto'
        defaultValue='Balance-Sheet'
      >
        <TabsList className='w-full bg-secondary h-12 overflow-auto'>
          <TabsTrigger
            value='Balance-Sheet'
            className='text-base md:text-xl cursor-pointer'
          >
            Balance Sheet
          </TabsTrigger>
          <TabsTrigger
            value='Income-Statement'
            className='text-base md:text-xl cursor-pointer'
          >
            Income Statement
          </TabsTrigger>
          <TabsTrigger
            value='Rating'
            className='text-base md:text-xl cursor-pointer'
          >
            Rating
          </TabsTrigger>
          <TabsTrigger
            value='Indicators'
            className='text-base md:text-xl cursor-pointer'
          >
            Indicators
          </TabsTrigger>
        </TabsList>

        <TabsContent value='Balance-Sheet'>
          {/* Customized Usage - Invoice Data with Custom Columns */}
          <DynamicTable
            title='Income Transactions'
            transactions={invoiceTransactions}
            columns={[
              "Invoice NO",
              "Name",
              "Details",
              "Bill",
              "Discount",
              "Expanse",
              "Income",
              "Balance",
            ]}
            enableEdit={true}
            enableSearch={false}
            enableDelete={false}
            showFilters={false}
            itemsPerPage={12}
          />
        </TabsContent>
        <TabsContent value='Income-Statement'>
          {/* Placeholder for Income Statement content */}
          <DynamicTable
            title=''
            transactions={initialTransactions.filter(
              (t) => t.account === "Income"
            )}
            enableEdit={true}
            enableSearch={false}
            enableDelete={false}
            showFilters={false}
            itemsPerPage={10}
          />
        </TabsContent>

        <TabsContent value='Rating'>
          {/* Placeholder for Rating content */}
          <div className='p-4'>
            <h2 className='text-xl font-bold'>Rating</h2>
            <p>Content for Rating will be added here.</p>
          </div>
        </TabsContent>
        <TabsContent value='Indicators'>
          {/* Placeholder for Indicators content */}
          <div className='p-4'>
            <h2 className='text-xl font-bold'>Indicators</h2>
            <p>Content for Indicators will be added here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

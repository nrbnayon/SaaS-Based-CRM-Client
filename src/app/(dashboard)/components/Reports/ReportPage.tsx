"use client";
import { DynamicTable, type Transaction } from '@/components/common/DynamicTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

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
    const transactions = initialTransactions;
          
           
          
            
            
          
            
  return (
    <div className='p-4 space-y-0'>
        <Tabs className="bg-transparent overflow-auto" defaultValue="Balance-Sheet">
            <TabsList className="w-full bg-secondary h-12 overflow-auto">
                <TabsTrigger value="Balance-Sheet" className="text-base md:text-xl cursor-pointer">Balance Sheet</TabsTrigger>
                <TabsTrigger value="Income-Statement" className="text-base md:text-xl cursor-pointer">Income Statement</TabsTrigger>
                <TabsTrigger value="Rating" className="text-base md:text-xl cursor-pointer">Rating</TabsTrigger>
                <TabsTrigger value="Indicators" className="text-base md:text-xl cursor-pointer">Indicators</TabsTrigger>
            </TabsList>

            <TabsContent value="Balance-Sheet">
                {/* Transaction table */}
                <div>
                    
                </div>                
            </TabsContent>
            <TabsContent value="Income-Statement">
                {/* Placeholder for Income Statement content */}
                <DynamicTable
                            title=''
                            transactions={transactions.filter((t) => t.account === "Income")}
                            enableEdit={true}
                            enableSearch={false}
                            enableDelete={false}
                            showFilters={false}
                            itemsPerPage={10}
                            />
                
            </TabsContent>
            
            <TabsContent value="Rating">
                {/* Placeholder for Rating content */}
                <div className="p-4">
                    <h2 className="text-xl font-bold">Rating</h2>
                    <p>Content for Rating will be added here.</p>
                </div>
            </TabsContent>
            <TabsContent value="Indicators">
                {/* Placeholder for Indicators content */}
                <div className="p-4">
                    <h2 className="text-xl font-bold">Indicators</h2>
                    <p>Content for Indicators will be added here.</p>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  )
}
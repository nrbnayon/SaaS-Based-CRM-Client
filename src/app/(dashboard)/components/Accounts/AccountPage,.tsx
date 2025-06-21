// src\app\(dashboard)\accounts\page.tsx
"use client";

import { ClientItem } from "@/components/common/ClientItem";
import { SummaryCard } from "@/components/common/SummaryCard";
import { TransactionForm } from "@/components/common/TransactionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import {  Plus, Search} from "lucide-react";
// import img from "next/img";
import React, { useState } from "react";

// Client data array
const clientsData = [
  { name: "Starbucks", id: "CL-1001", phone: "541515695", avatar: "https://logo.clearbit.com/starbucks.com" },
  { name: "General Electric", id: "CL-1002", phone: "541515696", avatar: "https://logo.clearbit.com/ge.com" },
  { name: "Pizza Hut", id: "CL-1003", phone: "541515697", avatar: "https://logo.clearbit.com/pizzahut.com" },
  { name: "Gillette", id: "CL-1004", phone: "541515698", avatar: "https://logo.clearbit.com/gillette.com" },
  { name: "McDonald's", id: "CL-1005", phone: "541515699", avatar: "https://logo.clearbit.com/mcdonalds.com" },
  { name: "Nike", id: "CL-1006", phone: "541515700", avatar: "https://logo.clearbit.com/nike.com" },
  { name: "Apple Inc", id: "CL-1007", phone: "541515701", avatar: "https://logo.clearbit.com/apple.com" },
  { name: "Google", id: "CL-1008", phone: "541515702", avatar: "https://logo.clearbit.com/google.com" },
  { name: "Microsoft", id: "CL-1009", phone: "541515703", avatar: "https://logo.clearbit.com/microsoft.com" },
  { name: "Amazon", id: "CL-1010", phone: "541515704", avatar: "https://logo.clearbit.com/amazon.com" },
  { name: "Facebook", id: "CL-1011", phone: "541515705", avatar: "https://logo.clearbit.com/facebook.com" },
  { name: "Tesla", id: "CL-1012", phone: "541515706", avatar: "https://logo.clearbit.com/tesla.com" },
  { name: "Netflix", id: "CL-1013", phone: "541515707", avatar: "https://logo.clearbit.com/netflix.com" },
  { name: "Spotify", id: "CL-1014", phone: "541515708", avatar: "https://logo.clearbit.com/spotify.com" },
  { name: "Uber", id: "CL-1015", phone: "541515709", avatar: "https://logo.clearbit.com/uber.com" }
];

export const AccountPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Income");

  // Filter clients based on search term
  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle summary card button clicks
  const handleSummaryCardClick = (tabValue: string) => {
    setActiveTab(tabValue);
    // Scroll to transactions section
    const transactionsSection = document.getElementById('transactions-section');
    if (transactionsSection) {
      transactionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 space-y-4 md:space-y-10">
      {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card
            className={cn(' bg-[linear-gradient(45deg,#A3C3FA_0%,white_50%,#D3E3FD_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)]')}
            
          >
            <CardContent className="">
              <h3 className={`text-sm md:text-base  font-semibold mb-2 `}>Income</h3>
              <p
                className={`text-xs md:text-sm text-gray-400  mb-4 `}
              >
                Add your Expense transaction&apos;s details
              </p>
              <Button 
                onClick={() => handleSummaryCardClick('Income')}
                className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}
              >
                <Plus className={`w-4 h-4 mr-2 text-primary border-2 border-primary rounded-[4px] `} />
                Income
              </Button>
            </CardContent>
          </Card>

          <Card
            className={cn(' bg-[linear-gradient(45deg,#FFDEDD_0%,#FFF9F9_45%,#FFD1CF_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)]')}
            
          >
            <CardContent className="">
              <h3 className={`text-sm md:text-base  font-semibold mb-2 `}>Expense</h3>
              <p
                className={`text-xs md:text-sm text-gray-400  mb-4 `}
              >
                Add your Expense transaction&apos;s details
              </p>
              <Button 
                onClick={() => handleSummaryCardClick('Expense')}
                className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}
              >
                <Plus className={`w-4 h-4 mr-2 text-primary border-2 border-primary rounded-[4px] `} />
                Expense
              </Button>
            </CardContent>
          </Card>
          
          <Card
            className={cn(' bg-[linear-gradient(45deg,#BEFFFD_0%,white_45%,#D7FFFE_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)]')}
            
          >
            <CardContent className="">
              <h3 className={`text-sm md:text-base  font-semibold mb-2 `}>Savings</h3>
              <p
                className={`text-xs md:text-sm text-gray-400  mb-4 `}
              >
                Add your Expense transaction&apos;s details
              </p>
              <Button 
                onClick={() => handleSummaryCardClick('Savings')}
                className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}
              >
                <Plus className={`w-4 h-4 mr-2 text-primary border-2 border-primary rounded-[4px] `} />
                Savings
              </Button>
            </CardContent>
          </Card>

          <Card
            className={cn(' bg-[linear-gradient(45deg,#F2F2F2_0%,#F2F2F2_45%,#F2F2F2_100%)] dark:bg-[linear-gradient(45deg,var(--dark-primary)_100%,var(--dark-primary)_100%,var(--dark-primary)_100%)]')}
            
          >
            <CardContent className="">
              <h3 className={`text-sm md:text-base  font-semibold mb-2 `}>Fixed Client</h3>
              <p
                className={`text-xs md:text-sm text-gray-400  mb-4 `}
              >
                Add your Client details
              </p>
              <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className={`p-5 w-full text-xs md:text-base bg-[#505050] dark:bg-white text-white dark:text-black  hover:bg-[#505050] dark:hover:bg-white cursor-pointer border border-primary`}>
                    <Plus className={`w-4 h-4 mr-2 text-white dark:text-black border-2  rounded-[4px] `} />
                    Client
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Income</DialogTitle>
                    <DialogDescription>
                      Add a new income entry to track your earnings.
                    </DialogDescription>
                  </DialogHeader>
                  <SummaryCard/>
                </DialogContent>
              </Dialog>
              
            </CardContent>
          </Card>
        </div>

        <div id="transactions-section">
           <div className="mb-6">
                <h2 className="text-lg md:text-xl text-[#505050] dark:text-white font-bold mb-2">Transactions</h2>
                <p className="text-gray-400  text-xs md:text-base">Add your income transaction&apos;s details</p>
            </div>

            {/* Transactions Section */}
          <div className="grid grid-cols-3 gap-6   ">
            <div className="col-span-3 lg:col-span-2 bg-gray-50 dark:bg-card border rounded-2xl p-1 md:p-4">
              <Tabs className="bg-transparent overflow-auto mb-3" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="gap-3 md:gap-6 bg-transparent h-12 overflow-auto">
                  <TabsTrigger
                    value="Income"
                    className="text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border data-[state=active]:bg-transparent dark:data-[state=active]:border-[#34C724] data-[state=active]:border-[#34C724] dark:data-[state=active]:text-[#34C724] data-[state=active]:text-[#34C724]"
                  >
                    Income
                  </TabsTrigger>
                  <TabsTrigger
                    value="Expense"
                    className="text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border data-[state=active]:bg-transparent dark:data-[state=active]:border-[#34C724] data-[state=active]:border-[#34C724] dark:data-[state=active]:text-[#34C724] data-[state=active]:text-[#34C724]"
                  >
                    Expense
                  </TabsTrigger>
                  <TabsTrigger
                    value="Savings"
                    className="text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border data-[state=active]:bg-transparent dark:data-[state=active]:border-[#34C724] data-[state=active]:border-[#34C724] dark:data-[state=active]:text-[#34C724] data-[state=active]:text-[#34C724]"
                  >
                    Savings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="Income">
                  <TransactionForm type="Income" />
                </TabsContent>
                <TabsContent value="Expense">
                  <TransactionForm type="Expense" />
                </TabsContent>
                <TabsContent value="Savings">
                  <TransactionForm type="Savings" />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar - Saved Clients */}
            <div className="col-span-3 lg:col-span-1">
              <Card className="">
                <CardHeader className="flex justify-between">
                  <div className="space-y-3">
                    <CardTitle className="text-lg md:text-xl text-[#505050] dark:text-white font-bold mb-2">Saved Client</CardTitle>
                    <CardDescription className="text-gray-400  text-xs md:text-base">Save client details</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a1a1a1]" />
                    <Input 
                      placeholder="Search..." 
                      className="bg-transparent pl-10" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-1 md:space-y-4 max-h-[500px] overflow-y-auto">
                  {filteredClients.map((client, index) => (
                    <ClientItem 
                      key={index}
                      name={client.name} 
                      id={client.id} 
                      phone={client.phone} 
                      avatar={client.avatar} 
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

    </div>
  );
};
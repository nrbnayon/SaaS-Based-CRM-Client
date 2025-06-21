// src\app\(dashboard)\accounts\page.tsx
"use client";

import { ClientItem } from "@/components/common/ClientItem";
import { SummaryCard } from "@/components/common/SummaryCard";
import { TransectionForm } from "@/components/common/TransectionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import {  Plus, Search} from "lucide-react";
// import img from "next/img";
import React, { useState } from "react";



export const AccountPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
              <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}>
                    <Plus className={`w-4 h-4 mr-2 text-primary border-2 border-primary rounded-[4px] `} />
                    Income
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
              <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}>
                    <Plus className={`w-4 h-4 mr-2 text-primary border-2 border-primary rounded-[4px] `} />
                    Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                      Add a new Expense entry to track your earnings.
                    </DialogDescription>
                  </DialogHeader>
                  <SummaryCard/>
                </DialogContent>
              </Dialog>
              
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
               <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}>
                    <Plus className={`w-4 h-4 mr-2 text-primary border-2 border-primary rounded-[4px] `} />
                    Savings
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Savings</DialogTitle>
                    <DialogDescription>
                      Add a new Savings entry to track your earnings.
                    </DialogDescription>
                  </DialogHeader>
                  <SummaryCard/>
                </DialogContent>
              </Dialog>
              
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
              <Button className={`p-5 w-full text-xs md:text-base bg-[#505050] dark:bg-white text-white dark:text-black  hover:bg-[#505050] dark:hover:bg-white cursor-pointer border border-primary`}>
                <Plus className={`w-4 h-4 mr-2 text-white dark:text-black border-2  rounded-[4px] `} />
                 Client
              </Button>
            </CardContent>
          </Card>
         
         
        </div>

        <div>
           <div className="mb-6">
                <h2 className="text-lg md:text-xl text-[#505050] dark:text-white font-bold mb-2">Transactions</h2>
                <p className="text-gray-400  text-xs md:text-base">Add your income transaction&apos;s details</p>
            </div>

            {/* Transactions Section */}
          <div className="grid grid-cols-3 gap-6   ">
            <div className="col-span-2 bg-gray-50 dark:bg-card border rounded-2xl p-1 md:p-4">
              <Tabs className="bg-transparent overflow-auto mb-3" defaultValue="Income">
                <TabsList className="gap-3 md:gap-6 bg-transparent h-12 overflow-auto">
                  <TabsTrigger
                    value="Income"
                    className="text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border data-[state=active]:bg-transparent dark:data-[state=active]:border-[#34C724] data-[state=active]:border-[#34C724] dark:data-[state=active]:text-[#34C724] data-[state=active]:text-[#34C724]"
                  >
                    Income
                  </TabsTrigger>
                  <TabsTrigger
                    value="Expanse"
                    className="text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border  data-[state=active]:bg-transparent dark:data-[state=active]:border-[#34C724] data-[state=active]:border-[#34C724] dark:data-[state=active]:text-[#34C724] data-[state=active]:text-[#34C724]"
                  >
                    Expanse
                  </TabsTrigger>
                  <TabsTrigger
                    value="Savings"
                    className="text-base md:text-xl cursor-pointer border-2 bg-gray-200 dark:bg-border data-[state=active]:bg-transparent dark:data-[state=active]:border-[#34C724] data-[state=active]:border-[#34C724] dark:data-[state=active]:text-[#34C724] data-[state=active]:text-[#34C724]"
                  >
                    Savings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="Income">
                  {/* Transaction Form */}
                  <TransectionForm/>

                </TabsContent>
              </Tabs>


             

              
              
            </div>

            {/* Right Sidebar - Saved Clients */}
            <div>
              <Card className="bg-[#141440] border-[#323679]">
                <CardHeader>
                  <CardTitle className="text-xl">Saved Client</CardTitle>
                  <CardDescription className="text-[#a1a1a1]">Save client details</CardDescription>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a1a1a1]" />
                    <Input placeholder="Search..." className="bg-[#08022e] border-[#323679] pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ClientItem name="Starbucks" id="CL-1001" phone="541515695" avatar="S" color="bg-[#34c724]" />
                  <ClientItem name="General Electric" id="CL-1001" phone="541515695" avatar="GE" color="bg-[#02dbd6]" />
                  <ClientItem name="Pizza Hut" id="CL-1001" phone="541515695" avatar="P" color="bg-[#f54a45]" />
                  <ClientItem name="Gillette" id="CL-1001" phone="541515695" avatar="G" color="bg-[#02dbd6]" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

    </div>
  );
};

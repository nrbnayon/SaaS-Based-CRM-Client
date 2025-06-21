// src\app\(dashboard)\accounts\page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
// import img from "next/img";
import React from "react";



export const AccountPage = () => {
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
              <Button className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}>
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
              <Button className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}>
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
              <Button className={`p-5 w-full text-xs md:text-base bg-transparent text-primary hover:bg-transparent cursor-pointer border border-primary`}>
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
              <Button className={`p-5 w-full text-xs md:text-base bg-[#505050] dark:bg-white text-white dark:text-black  hover:bg-[#505050] dark:hover:bg-white cursor-pointer border border-primary`}>
                <Plus className={`w-4 h-4 mr-2 text-white dark:text-black border-2  rounded-[4px] `} />
                 Client
              </Button>
            </CardContent>
          </Card>
         
         
        </div>

    </div>
  );
};

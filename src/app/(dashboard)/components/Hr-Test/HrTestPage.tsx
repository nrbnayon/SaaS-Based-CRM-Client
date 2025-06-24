/** @format */

import HRTestCard from "@/components/common/HrTestCard";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { hrTestCardData } from "@/data/hrTestData";
import { cn } from "@/lib/utils";
import { SquarePlus } from "lucide-react";
import React from "react";

const HrTestPage = () => {
  return (
    <div>
      <header
        className={cn(
          "sticky top-0 z-50 p-4 w-full transition-all duration-200bg-white/10 dark:bg-background/10 backdrop-blur-3xl"
        )}
      >
        <div className=" mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                Hr Test
              </h1>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center cursor-pointer space-x-3">
              <ModeToggle />

              <div className="flex items-center py-1 px-2 rounded-md bg-black  dark:bg-white text-white dark:text-black cursor-pointer space-x-2">
                <SquarePlus className="h-4 w-4 " />
                <p className="  text-xs md:text-base">New Test</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {hrTestCardData.map((testData, index) => (
          <HRTestCard
            key={index}
            testId={testData.testId}
            title={testData.title}
            description={testData.description}
            candidateCount={testData.candidateCount}
            rejectedCount={testData.rejectedCount}
            approvedCount={testData.approvedCount}
          />
        ))}
      </div>
    </div>
  );
};

export default HrTestPage;

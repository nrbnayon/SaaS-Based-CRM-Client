/** @format */

import { DynamicBillingTable } from "@/components/common/DynamicBillingTable";
import HrHeader from "@/components/common/HrHeader";
import { candidateList } from "@/data/hrTestData";
import React from "react";
import SingleCandidateCard from "../../components/Hr-Test/SingleCandidateCard";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// Define the Plan interface to match your data structure

const HrCandidateList = () => {
  return (
    <div className="px-4">
      <div>
        <HrHeader />
      </div>
      <div className=" py-0 lg:py-2">
        <DynamicBillingTable
          title="Candidate List"
          tableColumns={["Name", "Id", "Phone", "Email", "Download"]}
          plans={candidateList}
          itemsPerPage={8}
        />
      </div>
      <div className=" py-0 lg:py-2 border border-border rounded-2xl p-2 md:p-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4 mb-3">
          <div>
            <h2 className="font-bold  text-xl lg:text-2xl leading-7 text-foreground">
              Candidate List
            </h2>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-solid border-border w-full sm:max-w-[300px] lg:max-w-[356px] bg-background">
            <SearchIcon className="w-5 h-5 text-muted-custom flex-shrink-0" />

            <Input
              className={cn(
                "border-none bg-transparent text-foreground text-base focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-6 placeholder:text-muted-custom"
              )}
            />
          </div>
        </div>
        <div className="space-y-4 ">
          {candidateList.map((candidate) => (
            <SingleCandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HrCandidateList;

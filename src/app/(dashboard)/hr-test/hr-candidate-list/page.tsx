/** @format */
"use client";

import HrHeader from "@/components/common/HrHeader";
import { candidateList } from "@/data/hrTestData";
import React, { useState, useMemo } from "react";
import SingleCandidateCard from "../../components/Hr-Test/SingleCandidateCard";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Define Candidate type if not already imported
type Candidate = {
  id: string | number;
  name?: string;
  names?: string;
  phone?: string;
  email?: string;
  download: string;
  image?: string;
  progress?: number;
  [key: string]: unknown;
};

const HrCandidateList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter candidates based on search term
  const filteredCandidates = useMemo(() => {
    if (!searchTerm.trim()) {
      return candidateList as unknown as Candidate[];
    }

    return (candidateList as unknown as Candidate[]).filter(
      (candidate) =>
        typeof candidate.name === "string" &&
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="px-4">
      <div>
        <HrHeader />
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
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4 ">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <SingleCandidateCard key={candidate.id} candidate={candidate} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No candidates found matching {searchTerm}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HrCandidateList;

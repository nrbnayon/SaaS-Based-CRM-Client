/** @format */

import { DynamicBillingTable } from "@/components/common/DynamicBillingTable";
import HrHeader from "@/components/common/HrHeader";
import { candidateList } from "@/data/hrTestData";
import React from "react";
import SingleCandidateCard from "../../components/Hr-Test/SingleCandidateCard";
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
      <div className=" py-0 lg:py-2">
        <div>
          <h2 className="font-bold text-xl lg:text-2xl leading-7 text-foreground">
            Candidate Details
          </h2>
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

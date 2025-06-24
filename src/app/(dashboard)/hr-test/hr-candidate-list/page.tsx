/** @format */

import { DynamicBillingTable } from "@/components/common/DynamicBillingTable";
import HrHeader from "@/components/common/HrHeader";
import { candidateList } from "@/data/hrTestData";
import React from "react";

const HrCandidateList = () => {
  return (
    <div className="px-4">
      <div>
        <HrHeader />
      </div>
      <div className="lg:mt-8 py-4">
        <DynamicBillingTable
          title="Candidate List"
          tableColumns={["Name", "Id", "Phone", "Email", "Download"]}
          plans={candidateList}
          itemsPerPage={8}
        />
      </div>
    </div>
  );
};

export default HrCandidateList;

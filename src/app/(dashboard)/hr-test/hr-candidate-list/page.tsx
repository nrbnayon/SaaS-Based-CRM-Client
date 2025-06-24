/** @format */

import { DynamicBillingTable } from "@/components/common/DynamicBillingTable";
import HrHeader from "@/components/common/HrHeader";
import { candidateList } from "@/data/hrTestData";
import React from "react";

const HrCandidateList = () => {
  return (
    <div>
      <div>
        <HrHeader />
      </div>
      <div className="lg:mt-8 p-4">
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

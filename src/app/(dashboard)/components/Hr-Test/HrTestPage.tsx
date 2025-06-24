/** @format */

import HrHeader from "@/components/common/HrHeader";
import HRTestCard from "@/components/common/HrTestCard";
import { hrTestCardData } from "@/data/hrTestData";

import React from "react";

const HrTestPage = () => {
  return (
    <div>
      <div>
        <HrHeader />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-4 mt-5">
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

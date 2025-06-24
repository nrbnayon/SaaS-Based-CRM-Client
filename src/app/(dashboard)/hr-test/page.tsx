/** @format */

import React from "react";
import HrTestPage from "../components/Hr-Test/HrTestPage";
import MakeQuestions from "../components/Hr-Test/MakeQuestions";
// import DynamicHRTestApp from "../components/Hr-Test/QnBuilder";
// import DynamicFormBuilder from "../components/Hr-Test/DynamicFormBuilder";

const HrTest = () => {
  return (
    <div className="p-2 md:p-4 space-y-4 md:space-y-10">
      <HrTestPage />
      {/* <DynamicHRTestApp /> */}
      {/* <DynamicFormBuilder /> */}
      <MakeQuestions />
    </div>
  );
};

export default HrTest;

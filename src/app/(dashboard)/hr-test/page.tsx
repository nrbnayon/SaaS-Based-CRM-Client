/** @format */

import React from "react";
import HrTestPage from "../components/Hr-Test/HrTestPage";
import MakeQuestions from "../components/Hr-Test/MakeQuestions";
// import DynamicHRTestApp from "../components/Hr-Test/QnBuilder";
// import DynamicFormBuilder from "../components/Hr-Test/DynamicFormBuilder";

const HrTest = () => {
  return (
    <div>
      <HrTestPage />
      {/* <DynamicHRTestApp /> */}
      {/* <DynamicFormBuilder /> */}
      <MakeQuestions />
    </div>
  );
};

export default HrTest;

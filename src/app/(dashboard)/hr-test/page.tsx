/** @format */

import React from "react";
import HrTestPage from "../components/Hr-Test/HrTestPage";
// import DynamicHRTestApp from "../components/Hr-Test/QnBuilder";
import DynamicFormBuilder from "../components/Hr-Test/DynamicFormBuilder";

const HrTest = () => {
  return (
    <div>
      <HrTestPage />
      {/* <DynamicHRTestApp /> */}
      <DynamicFormBuilder />
    </div>
  );
};

export default HrTest;

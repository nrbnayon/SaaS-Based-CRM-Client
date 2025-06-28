/** @format */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DetailedSummary from "./detailed-summary";
// import MatricesDonutChart from "./matrices-donut-chart";
// import WeeklyBarChart from "./weekly-bar-chart";
import DynamicBarChart from "@/components/common/DynamicBarChart";
import DynamicPieChart from "@/components/common/DynamicPieChart";
import { DynamicBillingTable } from "@/components/common/DynamicBillingTable";
import { candidateBarChartData } from "@/data/hrTestData";

interface CandidateData {
  name: string;
  id: string;
  phone: string;
  email: string;
  image?: string;
}

const CandidateDetailsPage = () => {
  const searchParams = useSearchParams();
  const [candidateData, setCandidateData] = useState<CandidateData | null>(
    null
  );

  // Extract candidate data from URL parameters
  useEffect(() => {
    const name = searchParams.get("name");
    const id = searchParams.get("id");
    const phone = searchParams.get("phone");
    const email = searchParams.get("email");
    const image = searchParams.get("image");

    if (name && id && phone && email) {
      setCandidateData({
        name,
        id,
        phone,
        email,
        image: image || undefined,
      });
    }
  }, [searchParams]);

  // Prepare table data for DynamicBillingTable
  const tableData = candidateData
    ? [
        {
          plan: candidateData.name,
          issue: candidateData.id,
          expire: candidateData.phone,
          amount: candidateData.email,
          download: "", // Empty for this use case
          id: candidateData.id,
          image: candidateData.image,
        },
      ]
    : [];

  // Array to store content
  const content = [
    { title: "Tooltip", type: "main" },
    {
      title: "Detected Inconsistency",
      desc: "This analysis shows potential inconsistencies in user responses. Lower scores indicate more consistent answers across similar questions.",
      type: "section",
    },
    {
      title: "Inconsistencies",
      desc: "We've detected two questions with contradictory answers that should be reviewed.",
      type: "section",
    },
  ];
  const [progress, setProgress] = useState({
    value: 20,
    color: "#27ae60",
    label: "Consistent",
  });

  const handleConsistencyClick = (
    value: number,
    color: string,
    label: string
  ): void => {
    setProgress({ value, color, label });
  };

  return (
    <div className="w-full mt-2 md:mt-4 bg-card p-1 md:p-4 rounded-2xl">
      <h1 className="text-foreground text-lg md:text-2xl mb-3">Candidate</h1>

      {/* one candidate's table */}
      <div className="bg-background p-2 md:p-4 border border-border rounded-2xl mb-4 ">
        <div className="mb-4">
          <DynamicBillingTable
            title=""
            plans={tableData}
            tableColumns={["Name", "Id", "Phone", "Email"]}
            enableSearch={false}
          />
        </div>
        <div className="bg-card p-2 md:p-4 border border-border rounded-2xl">
          <h2 className="text-foreground text-base"> Candidate Analysis</h2>
          <DynamicBarChart
            data={candidateBarChartData}
            threshold={20}
            threshold2={60}
            highColor="#7DFF56"
            midColor="#FFD900"
            lowColor="#FF6767"
            title=""
            subtitle=""
            ticks={[0, 25, 50, 75, 100]}
          />
        </div>
      </div>

      <div className="w-full p-2 md:p-4 bg-background rounded-2xl border border-border">
        <h1 className="text-foreground text-lg md:text-2xl mb-3">
          Consistency
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Consistency card */}
          <div className="bg-card rounded-2xl border border-border p-5 text-center text-foreground">
            <h2 className="text-lg md:text-2xl font-semibold mb-5">
              {progress.label}
            </h2>

            <div className="w-32 md:w-48 md:h-44 h-32 mx-auto">
              <CircularProgressbar
                value={progress.value}
                text={`${progress.value}%`}
                styles={buildStyles({
                  textSize: "24px",
                  pathColor: progress.color,
                  trailColor: "#eee",
                })}
              />

              <div></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <span
                className="flex items-center cursor-pointer"
                onClick={() =>
                  handleConsistencyClick(20, "#27ae60", "Consistent")
                }
              >
                <span className="w-2.5 h-2.5 bg-[#27ae60] rounded-full mr-1.5"></span>
                Consistent
              </span>
              <span
                className="flex items-center cursor-pointer"
                onClick={() =>
                  handleConsistencyClick(30, "#f1c40f", "Moderate")
                }
              >
                <span className="w-2.5 h-2.5 bg-[#f1c40f] rounded-full mr-1.5"></span>
                Moderate
              </span>
              <span
                className="flex items-center cursor-pointer"
                onClick={() =>
                  handleConsistencyClick(70, "#e74c3c", "Inconsistent")
                }
              >
                <span className="w-2.5 h-2.5 bg-[#e74c3c] rounded-full mr-1.5"></span>
                Inconsistent
              </span>
            </div>
          </div>

          <div>
            <Card className="w-full h-full bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-lg md:text-2xl font-semibold">
                  {content.find((item) => item.type === "main")?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {content
                  .filter((item) => item.type === "section")
                  .map((item, index) => (
                    <div key={index}>
                      <h3 className="text-base md:text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-full h-full flex mt-6 flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-full h-full md:w-1/2">
            <DetailedSummary />
          </div>
          {/* Full Width Bar Chart */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* <WeeklyBarChart /> */}
            <DynamicBarChart
              data={[
                { label: "Sun", value: 15 },
                { label: "Mon", value: 22 },
                { label: "Tue", value: 25 },
                { label: "Wed", value: 75 },
                { label: "Thu", value: 32 },
                { label: "Fri", value: 30 },
                { label: "Sat", value: 52 },
              ]}
              threshold={40}
              threshold2={100}
              highColor="#FFAD66"
              midColor="#FFAD66"
              lowColor="#FFF06A"
              title="Response"
              subtitle="Comparison"
              legend={[
                { label: "Consistent", color: "#FFAD66" },
                { label: "Varied", color: "#FFF06A" },
              ]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <DynamicPieChart
              data={[
                { label: "Matrices FARE", value: 77396, color: "#ef4444" },
                { label: "Matrices ESSERE", value: 77396, color: "#22c55e" },
              ]}
              title="Matrices"
              width={400}
              height={300}
              showLabels={true}
              showLegend={true}
              showValues={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPage;

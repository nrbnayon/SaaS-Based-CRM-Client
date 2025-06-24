/** @format */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DetailedSummary from "./detailed-summary";
import MatricesDonutChart from "./matrices-donut-chart";
import WeeklyBarChart from "./weekly-bar-chart";

const CandidateDetailsPage = () => {
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
    <div className="mt-2 md:mt-4 bg-card p-1 md:p-4 rounded-2xl">
      <h1 className="text-foreground text-lg md:text-2xl">Candidate</h1>

      <div className="p-1.5 md:p-4 bg-background">
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 space-y-4">
            <DetailedSummary />

            {/* Full Width Bar Chart */}
            <div className="space-y-6">
              <WeeklyBarChart />
              <div className="mt-6">
                <MatricesDonutChart />
              </div>

              {/* Charts Section */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPage;

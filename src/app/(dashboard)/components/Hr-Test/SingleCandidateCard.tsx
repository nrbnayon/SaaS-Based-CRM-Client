/** @format */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

import React from "react";

export interface Candidate {
  id: string | number;
  names?: string;
  name?: string;
  phone?: string;
  email?: string;
  download: string;
  image?: string;
  progress?: number;
  [key: string]: unknown;
}

// Define props interface for the component
interface SingleCandidateCardProps {
  candidate: Candidate;
}

const SingleCandidateCard: React.FC<SingleCandidateCardProps> = ({
  candidate,
}) => {
  const router = useRouter();

  // Function to get colors and status based on progress
  const getProgressStyles = (progress: number = 0) => {
    if (progress <= 30) {
      return {
        progressBg: "bg-red-100",
        progressFill: "[&>*]:bg-red-500",
        textColor: "text-red-500",
        status: "Low",
        statusBg: "bg-red-100",
        statusText: "text-red-500",
        statusBorder: "border-red-500",
      };
    } else if (progress <= 60) {
      return {
        progressBg: "bg-amber-100",
        progressFill: "[&>*]:bg-amber-500",
        textColor: "text-amber-500",
        status: "Medium",
        statusBg: "bg-amber-100",
        statusText: "text-amber-500",
        statusBorder: "border-amber-500",
      };
    } else if (progress > 60) {
      return {
        progressBg: "bg-green-100",
        progressFill: "[&>*]:bg-green-500",
        textColor: "text-lime-950",
        status: "High",
        statusBg: "bg-green-100",
        statusText: "text-green-500",
        statusBorder: "border-green-500",
      };
    }

    // Default styles if no condition matches
    return {
      progressBg: "",
      progressFill: "",
      textColor: "",
      status: "",
      statusBg: "",
      statusText: "",
      statusBorder: "",
    };
  };

  // Handler for View Data button click
  const handleViewData = () => {
    const queryParams = new URLSearchParams();

    // Add candidate data to query parameters
    if (candidate.name) queryParams.set("name", candidate.name);
    if (candidate.id) queryParams.set("id", candidate.id.toString());
    if (candidate.phone) queryParams.set("phone", candidate.phone);
    if (candidate.email) queryParams.set("email", candidate.email);
    if (candidate.image) queryParams.set("image", candidate.image);
    if (candidate.download) queryParams.set("download", candidate.download);

    // Navigate to candidate details page
    router.push(
      `/hr-test/hr-candidate-list/candidate-details?${queryParams.toString()}`
    );
  };

  const styles = getProgressStyles(candidate.progress);

  return (
    <div className="grid  lg:grid-cols-8 bg-card border border-border p-4 rounded-lg gap-4">
      <div className="lg:col-span-2 flex justify-start items-center gap-3 text-foreground dark:text-white">
        <Avatar className="h-12 w-12">
          <AvatarImage src={candidate.image} alt={candidate.name} />
          <AvatarFallback>
            {(candidate.name ?? "NA")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="text-foreground font-medium text-lg md:text-xl">
            {candidate.name}
          </div>
          <div className="text-sm md:text-base text-muted-foreground">
            <p>Candidate</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="w-full flex justify-between text-sm md:text-base text-foreground font-medium mb-2">
          <div>Match Score</div>
          <div
            className={`border px-2 py-0.5 rounded-lg ${styles.statusBg} ${styles.statusText} ${styles.statusBorder}`}
          >
            {styles.status}
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <Progress
            value={candidate.progress}
            className={`flex-1 h-5 md:h-6 ${styles.progressBg} ${styles.progressFill}`}
          />
          <div
            className={`text-sm font-semibold absolute right-4 ${styles.textColor}`}
          >
            {candidate.progress}%
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 flex items-center justify-end">
        <Button
          onClick={handleViewData}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-0.5 md:py-2 rounded hover:from-orange-600 hover:to-red-600 transition-all duration-200"
        >
          View Data
        </Button>
      </div>
    </div>
  );
};

export default SingleCandidateCard;

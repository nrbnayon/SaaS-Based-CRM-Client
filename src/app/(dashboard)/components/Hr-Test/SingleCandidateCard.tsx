/** @format */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 bg-card border border-border p-4 rounded-lg gap-4">
      <div className="lg:col-span-4 flex justify-start items-center gap-3 text-foreground dark:text-white">
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

      <div className="lg:col-span-3 flex flex-col justify-center">
        <div className="text-sm md:text-base text-foreground font-medium mb-2">
          Match Score
        </div>
        <div className="flex items-center gap-2">
          <Progress value={candidate.progress} className="flex-1" />
          <div className="text-sm md:text-base text-muted-foreground font-semibold">
            {candidate.progress}%
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 flex items-center">
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded hover:from-orange-600 hover:to-red-600 transition-all duration-200">
          View Data
        </Button>
      </div>
    </div>
  );
};

export default SingleCandidateCard;

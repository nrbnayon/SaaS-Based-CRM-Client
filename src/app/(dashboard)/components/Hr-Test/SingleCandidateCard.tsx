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
    <div className="grid  md:grid-cols-8 bg-card border border-border p-4 rounded-lg gap-4">
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

      <div className="md:col-span-5 flex flex-col justify-center">
        <div className="w-full flex justify-between text-sm md:text-base text-foreground font-medium mb-2">
          <div>Match Score</div>
          <div className="border px-2 py-0.5 rounded-lg ">medium</div>
        </div>
        <div className="flex items-center gap-2 relative">
          <Progress
            value={candidate.progress}
            className="flex-1 h-5 md:h-6 bg-red-100 [&>*]:bg-red-500"
          />
          <div className="text-sm text-muted-foreground font-semibold absolute right-4">
            {candidate.progress}%
          </div>
        </div>
      </div>

      <div className="md:col-span-1 flex items-center justify-end">
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-0.5 md:py-2 rounded hover:from-orange-600 hover:to-red-600 transition-all duration-200">
          View Data
        </Button>
      </div>
    </div>
  );
};

export default SingleCandidateCard;

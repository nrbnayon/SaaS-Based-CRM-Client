/** @format */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const SingleCandidateCard = () => {
  return (
    <div className=" bg-card border border-border">
      <div className="flex justify-center  items-center gap-2 text-foreground dark:text-white">
        <Avatar className="h-8 w-8">
          <AvatarImage src={plan.image} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex">
          <div className="text-foreground font-medium  text-lg md:text-2xl">
            {(plan.plan ?? plan.name ?? "Unknown Name").toString()}
          </div>
          <div className="text-sm md:text-lg text-muted-custom">
            <p>Candidate</p>
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm md:text-lg text-foreground">Match Score</div>
        <div></div>
      </div>
    </div>
  );
};

export default SingleCandidateCard;

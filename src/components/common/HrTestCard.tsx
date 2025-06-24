/** @format */

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { HRTestCardProps } from "@/types/allTypes";
import Link from "next/link";

const HRTestCard: React.FC<HRTestCardProps> = ({
  testId,
  title,
  description,
  candidateCount,
  rejectedCount,
  approvedCount,
}) => {
  return (
    <Link href="/hr-test/hr-candidate-list">
      <Card className="w-full max-w-md mx-auto bg-card shadow-2xl">
        <CardHeader className="">
          <div className="flex  justify-between bg-secondary p-2 text-sm md:text-base font-medium items-center mb-4">
            <span className="text-foreground ">HR Test ID</span>
            <span className="text-muted-custom  font-mono">{testId}</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-foreground text-lg md:text-xl font-bold leading-tight">
              {title}
            </h2>

            <p className="text-muted-custom text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-foreground text-sm md:text-base font-medium">
                Candidate: {candidateCount}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-error text-sm md:text-base font-medium">
                Reject: {rejectedCount}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-sm md:text-base font-medium">
                Approved: {approvedCount}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HRTestCard;

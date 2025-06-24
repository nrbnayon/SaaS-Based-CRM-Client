/** @format */

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { HRTestCardProps } from "@/types/allTypes";

const HRTestCard: React.FC<HRTestCardProps> = ({
  testId,
  title,
  description,
  candidateCount,
  rejectedCount,
  approvedCount,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 border-slate-700 shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/80 text-sm font-medium">HR Test ID</span>
          <span className="text-slate-400 text-sm font-mono">{testId}</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-white text-2xl font-bold leading-tight">
            {title}
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-white/90 text-sm font-medium">
              Candidate:
            </span>
            <span className="text-white text-lg font-semibold">
              {candidateCount}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-red-400 text-sm font-medium">Reject:</span>
            <span className="text-red-400 text-lg font-semibold">
              {rejectedCount}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-green-400 text-sm font-medium">
              Approved:
            </span>
            <span className="text-green-400 text-lg font-semibold">
              {approvedCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HRTestCard;

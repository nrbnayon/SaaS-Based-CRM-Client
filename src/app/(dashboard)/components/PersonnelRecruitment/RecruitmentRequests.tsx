// src/app/(dashboard)/components/PersonnelRecruitment/RecruitmentRequests.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  History,
  Search,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecruitmentRequest {
  id: string;
  ticketId: string;
  jobTitle: string;
  companyName: string;
  status: "submitted" | "in-progress" | "completed" | "on-hold";
  submissionDate: string;
  expectedSalary: string;
  experienceLevel: number;
  location: string;
  candidatesFound?: number;
  lastUpdate: string;
}

// Mock recruitment requests data
const mockRequests: RecruitmentRequest[] = [
  {
    id: "1",
    ticketId: "HR-001",
    jobTitle: "Waiter",
    companyName: "Restaurant Bella Vista",
    status: "completed",
    submissionDate: "2024-01-15",
    expectedSalary: "€1,200/month",
    experienceLevel: 2,
    location: "Rome, Italy",
    candidatesFound: 5,
    lastUpdate: "2024-01-25",
  },
  {
    id: "2",
    ticketId: "HR-002",
    jobTitle: "Warehouse Worker",
    companyName: "Logistics Pro SRL",
    status: "in-progress",
    submissionDate: "2024-01-20",
    expectedSalary: "€1,400/month",
    experienceLevel: 3,
    location: "Milan, Italy",
    candidatesFound: 3,
    lastUpdate: "2024-01-28",
  },
  {
    id: "3",
    ticketId: "HR-003",
    jobTitle: "Bartender",
    companyName: "Night Club Elite",
    status: "submitted",
    submissionDate: "2024-02-01",
    expectedSalary: "€1,300/month",
    experienceLevel: 4,
    location: "Florence, Italy",
    lastUpdate: "2024-02-01",
  },
];

export const RecruitmentRequests = () => {
  const [requests] = useState<RecruitmentRequest[]>(mockRequests);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = requests.filter(
    (request) =>
      request.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: RecruitmentRequest["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className='w-4 h-4 text-green-600' />;
      case "in-progress":
        return <Clock className='w-4 h-4 text-yellow-600' />;
      case "on-hold":
        return <AlertCircle className='w-4 h-4 text-orange-600' />;
      case "submitted":
      default:
        return <Clock className='w-4 h-4 text-blue-600' />;
    }
  };

  const getStatusColor = (status: RecruitmentRequest["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "on-hold":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "submitted":
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getExperienceLabel = (level: number) => {
    const labels = {
      1: "Entry Level",
      2: "Junior",
      3: "Mid-Level",
      4: "Senior",
      5: "Expert",
    };
    return labels[level as keyof typeof labels] || "Unknown";
  };

  const handleViewDetails = (request: RecruitmentRequest) => {
    console.log("Viewing request details:", request);
    // In a real app, this would open a detailed view modal
  };

  return (
    <div className='space-y-6'>
      {/* Summary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='border-border'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Total Requests</p>
                <p className='text-2xl font-bold text-foreground'>
                  {requests.length}
                </p>
              </div>
              <History className='w-8 h-8 text-primary' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>In Progress</p>
                <p className='text-2xl font-bold text-yellow-600'>
                  {requests.filter((r) => r.status === "in-progress").length}
                </p>
              </div>
              <Clock className='w-8 h-8 text-yellow-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Completed</p>
                <p className='text-2xl font-bold text-green-600'>
                  {requests.filter((r) => r.status === "completed").length}
                </p>
              </div>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>
                  Candidates Found
                </p>
                <p className='text-2xl font-bold text-primary'>
                  {requests.reduce(
                    (sum, r) => sum + (r.candidatesFound || 0),
                    0
                  )}
                </p>
              </div>
              <Users className='w-8 h-8 text-primary' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className='border-border'>
        <CardHeader>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <CardTitle>Recruitment Request History</CardTitle>
            <div className='flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background'>
              <Search className='w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search requests...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Candidates</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className='font-medium'>
                      {request.ticketId}
                    </TableCell>
                    <TableCell>{request.jobTitle}</TableCell>
                    <TableCell>{request.companyName}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                        {request.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className='font-medium'>
                      {request.expectedSalary}
                    </TableCell>
                    <TableCell>
                      {getExperienceLabel(request.experienceLevel)}
                    </TableCell>
                    <TableCell>
                      {request.candidatesFound ? (
                        <span className='font-medium text-green-600'>
                          {request.candidatesFound}
                        </span>
                      ) : (
                        <span className='text-muted-foreground'>-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(request.submissionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye className='w-4 h-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRequests.length === 0 && (
            <div className='text-center py-8 text-muted-foreground'>
              {searchTerm
                ? "No requests match your search"
                : "No recruitment requests yet"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className='border-border bg-green-50 dark:bg-green-950/20'>
        <CardContent className='p-6'>
          <div className='flex items-start gap-3'>
            <Users className='w-6 h-6 text-green-600 flex-shrink-0 mt-1' />
            <div>
              <h3 className='font-semibold text-foreground mb-2'>
                How Personnel Recruitment Works
              </h3>
              <ul className='text-sm text-muted-foreground space-y-1'>
                <li>
                  • Complete all three steps: Company Info, Job Profile, and Job
                  Offer Details
                </li>
                <li>
                  • Your request generates an internal ticket visible in the
                  backoffice
                </li>
                <li>
                  • An automatic email is sent to personale@agenziareduco.it
                </li>
                <li>• Our HR team will confirm when the search has started</li>
                <li>
                  • You&apos;ll receive updates on candidate matches and
                  progress
                </li>
                <li>
                  • Status changes to &rdquo;Ticket Completed&rdquo; once search
                  begins
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

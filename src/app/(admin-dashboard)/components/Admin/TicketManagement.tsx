// src/app/(admin-dashboard)/components/Admin/TicketManagement.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
  X,
  Send,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StaffTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  staffAssigned: string;
  requestType: "personnel-search" | "hr-support" | "recruitment";
  status: "open" | "in-progress" | "pending-review" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdDate: string;
  lastUpdate: string;
  description: string;
  jobTitle?: string;
  candidatesFound?: number;
  estimatedCompletion?: string;
}

const mockTickets: StaffTicket[] = [
  {
    id: "TKT-001",
    ticketNumber: "HR-2024-001",
    customerName: "TechNova Solutions",
    staffAssigned: "Marco Rossi",
    requestType: "personnel-search",
    status: "in-progress",
    priority: "high",
    createdDate: "2024-01-15T09:00:00Z",
    lastUpdate: "2024-01-20T14:30:00Z",
    description:
      "Search for Senior Software Developer with 5+ years experience in React and Node.js",
    jobTitle: "Senior Software Developer",
    candidatesFound: 3,
    estimatedCompletion: "2024-01-25",
  },
  {
    id: "TKT-002",
    ticketNumber: "HR-2024-002",
    customerName: "Digital Marketing Pro",
    staffAssigned: "Laura Bianchi",
    requestType: "recruitment",
    status: "pending-review",
    priority: "medium",
    createdDate: "2024-01-18T11:00:00Z",
    lastUpdate: "2024-01-20T16:45:00Z",
    description:
      "Recruitment for Digital Marketing Specialist with SEO/SEM expertise",
    jobTitle: "Digital Marketing Specialist",
    candidatesFound: 5,
    estimatedCompletion: "2024-01-22",
  },
  {
    id: "TKT-003",
    ticketNumber: "HR-2024-003",
    customerName: "StartUp Innovations",
    staffAssigned: "Giuseppe Verde",
    requestType: "hr-support",
    status: "open",
    priority: "urgent",
    createdDate: "2024-01-20T08:30:00Z",
    lastUpdate: "2024-01-20T08:30:00Z",
    description: "Urgent HR consultation for employment law compliance",
    estimatedCompletion: "2024-01-21",
  },
];

export const TicketManagement = () => {
  const [tickets, setTickets] = useState<StaffTicket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<StaffTicket | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [closeReason, setCloseReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusIcon = (status: StaffTicket["status"]) => {
    switch (status) {
      case "closed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "pending-review":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "open":
      default:
        return <Ticket className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: StaffTicket["status"]) => {
    switch (status) {
      case "closed":
        return "bg-success/10 text-success border-success";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending-review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "open":
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: StaffTicket["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-200 text-red-800 border-orange-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewTicket = (ticket: StaffTicket) => {
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  };

  const handleCloseTicket = (ticket: StaffTicket) => {
    setSelectedTicket(ticket);
    setIsCloseModalOpen(true);
  };

  const confirmCloseTicket = () => {
    if (selectedTicket) {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === selectedTicket.id
            ? {
                ...ticket,
                status: "closed",
                lastUpdate: new Date().toISOString(),
              }
            : ticket
        )
      );

      console.log("Ticket closed:", {
        ticketId: selectedTicket.id,
        reason: closeReason,
        closedBy: "Administrator",
        closedAt: new Date().toISOString(),
      });
    }

    setIsCloseModalOpen(false);
    setCloseReason("");
    setSelectedTicket(null);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.staffAssigned.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter(
    (t) => t.status === "in-progress"
  ).length;
  const pendingReviewTickets = tickets.filter(
    (t) => t.status === "pending-review"
  ).length;
  const closedTickets = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="p-4 space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Open Tickets
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {openTickets}
                </p>
              </div>
              <Ticket className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {inProgressTickets}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                  {pendingReviewTickets}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Closed
                </p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {closedTickets}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Staff Search Tickets</CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending-review">Pending Review</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Staff Assigned</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">
                      {ticket.ticketNumber}
                    </TableCell>
                    <TableCell>{ticket.customerName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {ticket.staffAssigned}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {ticket.requestType.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(ticket.createdDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {ticket.candidatesFound ? (
                        <span className="text-success font-medium">
                          {ticket.candidatesFound} candidates found
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          In progress
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewTicket(ticket)}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        {ticket.status !== "closed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCloseTicket(ticket)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Ticket Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-red-600" />
              Ticket Details - {selectedTicket?.ticketNumber}
            </DialogTitle>
            <DialogDescription>
              Complete information about the selected ticket
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Customer Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Name:</strong> {selectedTicket.customerName}
                    </div>
                    <div>
                      <strong>Request Type:</strong>{" "}
                      {selectedTicket.requestType.replace("-", " ")}
                    </div>
                    {selectedTicket.jobTitle && (
                      <div>
                        <strong>Job Title:</strong> {selectedTicket.jobTitle}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Ticket Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <strong>Status:</strong>
                      <Badge className={getStatusColor(selectedTicket.status)}>
                        {selectedTicket.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Priority:</strong>
                      <Badge
                        className={getPriorityColor(selectedTicket.priority)}
                      >
                        {selectedTicket.priority}
                      </Badge>
                    </div>
                    <div>
                      <strong>Staff:</strong> {selectedTicket.staffAssigned}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">
                  Description
                </h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                  {selectedTicket.description}
                </div>
              </div>

              {selectedTicket.candidatesFound && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Progress Update
                  </h4>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg text-sm">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="w-4 h-4" />
                      <strong>
                        {selectedTicket.candidatesFound} candidates found
                      </strong>
                    </div>
                    {selectedTicket.estimatedCompletion && (
                      <div className="mt-2 text-muted-foreground">
                        Estimated completion:{" "}
                        {new Date(
                          selectedTicket.estimatedCompletion
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong>Created:</strong>{" "}
                  {new Date(selectedTicket.createdDate).toLocaleString()}
                </div>
                <div>
                  <strong>Last Update:</strong>{" "}
                  {new Date(selectedTicket.lastUpdate).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
            {selectedTicket?.status !== "closed" && (
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  if (selectedTicket) {
                    handleCloseTicket(selectedTicket);
                  }
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Close Ticket
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Ticket Modal */}
      <Dialog open={isCloseModalOpen} onOpenChange={setIsCloseModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <X className="w-5 h-5 text-red-600" />
              Close Ticket - {selectedTicket?.ticketNumber}
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for closing this ticket. This action will
              update the personnel platform.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Closure Reason
              </label>
              <Textarea
                value={closeReason}
                onChange={(e) => setCloseReason(e.target.value)}
                placeholder="Describe why this ticket is being closed..."
                className="mt-2"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCloseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmCloseTicket}
              disabled={!closeReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Close Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

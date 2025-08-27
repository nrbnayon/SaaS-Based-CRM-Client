// src/app/(admin-dashboard)/components/Admin/OperationalMonitoring.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Users,
  Download,
  Search,
  Filter,
  Eye,
  Calendar,
  Building,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Invoice {
  id: string;
  customerName: string;
  vatNumber: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  issueDate: string;
  dueDate: string;
  invoiceNumber: string;
}

interface PersonnelActivity {
  id: string;
  staffName: string;
  role: string;
  requestsAssigned: number;
  requestsCompleted: number;
  activeRequests: number;
  lastActivity: string;
  performance: number;
}

interface FinancialPlan {
  id: string;
  customerName: string;
  planType: string;
  generatedDate: string;
  status: "generated" | "sent" | "viewed";
  fileSize: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    customerName: "TechNova Solutions",
    vatNumber: "IT12345678901",
    amount: 157.38,
    status: "paid",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    invoiceNumber: "2024-001",
  },
  {
    id: "INV-002",
    customerName: "Digital Marketing Pro",
    vatNumber: "IT98765432109",
    amount: 120.78,
    status: "overdue",
    issueDate: "2023-12-20",
    dueDate: "2024-01-20",
    invoiceNumber: "2023-156",
  },
  {
    id: "INV-003",
    customerName: "Freelancer Studio",
    vatNumber: "IT11223344556",
    amount: 39.0,
    status: "pending",
    issueDate: "2024-01-10",
    dueDate: "2024-02-10",
    invoiceNumber: "2024-002",
  },
];

const mockPersonnelActivity: PersonnelActivity[] = [
  {
    id: "STAFF-001",
    staffName: "Marco Rossi",
    role: "HR Specialist",
    requestsAssigned: 15,
    requestsCompleted: 12,
    activeRequests: 3,
    lastActivity: "2024-01-20T14:30:00Z",
    performance: 85,
  },
  {
    id: "STAFF-002",
    staffName: "Laura Bianchi",
    role: "Senior Recruiter",
    requestsAssigned: 22,
    requestsCompleted: 20,
    activeRequests: 2,
    lastActivity: "2024-01-20T16:45:00Z",
    performance: 92,
  },
  {
    id: "STAFF-003",
    staffName: "Giuseppe Verde",
    role: "Recruitment Manager",
    requestsAssigned: 8,
    requestsCompleted: 6,
    activeRequests: 2,
    lastActivity: "2024-01-19T11:20:00Z",
    performance: 78,
  },
];

const mockFinancialPlans: FinancialPlan[] = [
  {
    id: "FP-001",
    customerName: "TechNova Solutions",
    planType: "Comprehensive Business Plan",
    generatedDate: "2024-01-18",
    status: "viewed",
    fileSize: "2.4 MB",
  },
  {
    id: "FP-002",
    customerName: "Digital Marketing Pro",
    planType: "Financial Analysis Report",
    generatedDate: "2024-01-17",
    status: "sent",
    fileSize: "1.8 MB",
  },
  {
    id: "FP-003",
    customerName: "Freelancer Studio",
    planType: "Basic Financial Plan",
    generatedDate: "2024-01-16",
    status: "generated",
    fileSize: "1.2 MB",
  },
];

export const OperationalMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
      case "viewed":
        return "bg-success/10 text-success border-success";
      case "pending":
      case "sent":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-error/10 text-error border-error";
      case "generated":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-success";
    if (performance >= 75) return "text-yellow-600";
    return "text-error";
  };

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = 
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredPersonnel = mockPersonnelActivity.filter((staff) => {
    const matchesSearch = staff.staffName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || staff.role.toLowerCase().includes(roleFilter.toLowerCase());
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Operational Monitoring
        </h1>
        <p className="text-muted-foreground">
          Monitor invoices, personnel activity, and financial documentation
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-background border border-border">
          <TabsTrigger 
            value="invoices" 
            className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            <FileText className="w-4 h-4" />
            Invoice Management
          </TabsTrigger>
          <TabsTrigger 
            value="personnel" 
            className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            <Users className="w-4 h-4" />
            Personnel Activity
          </TabsTrigger>
          <TabsTrigger 
            value="financial" 
            className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            <Download className="w-4 h-4" />
            Financial Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Complete Invoice List</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by customer, VAT, or invoice..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
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
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>VAT Number</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell>{invoice.customerName}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {invoice.vatNumber}
                        </TableCell>
                        <TableCell className="font-medium">
                          €{invoice.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personnel" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Personnel Activity History</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search staff..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-40">
                      <Building className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="hr">HR Specialist</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
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
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Assigned</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPersonnel.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell className="font-medium">
                          {staff.staffName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {staff.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{staff.requestsAssigned}</TableCell>
                        <TableCell className="text-success">
                          {staff.requestsCompleted}
                        </TableCell>
                        <TableCell className="text-blue-600">
                          {staff.activeRequests}
                        </TableCell>
                        <TableCell>
                          <span className={getPerformanceColor(staff.performance)}>
                            {staff.performance}%
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(staff.lastActivity).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-green-600" />
                Financial Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockFinancialPlans.map((plan) => (
                  <div key={plan.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{plan.customerName}</h4>
                        <p className="text-sm text-muted-foreground">{plan.planType}</p>
                      </div>
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Generated: {new Date(plan.generatedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Size: {plan.fileSize}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
// src/app/(admin-dashboard)/components/Admin/InitialDashboard.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Calendar,
  CreditCard,
  BarChart,
  Settings,
  Eye,
  Download,
  Ticket,
  Calculator,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  email: string;
  subscriptionType: "flat-rate" | "business" | "premium";
  status: "active" | "pending" | "cancelled" | "overdue";
  lastPayment: string;
  nextRenewal: string;
  amount: number;
  riskLevel: "low" | "medium" | "high";
}

const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "TechNova Solutions",
    email: "admin@technova.com",
    subscriptionType: "premium",
    status: "active",
    lastPayment: "2024-01-15",
    nextRenewal: "2024-02-15",
    amount: 157.38,
    riskLevel: "low",
  },
  {
    id: "CUST-002",
    name: "Digital Marketing Pro",
    email: "info@digitalmarketing.com",
    subscriptionType: "business",
    status: "overdue",
    lastPayment: "2023-12-20",
    nextRenewal: "2024-01-20",
    amount: 120.78,
    riskLevel: "high",
  },
  {
    id: "CUST-003",
    name: "Freelancer Studio",
    email: "contact@freelancer.com",
    subscriptionType: "flat-rate",
    status: "active",
    lastPayment: "2024-01-10",
    nextRenewal: "2024-02-10",
    amount: 39.0,
    riskLevel: "low",
  },
  {
    id: "CUST-004",
    name: "StartUp Innovations",
    email: "hello@startup.com",
    subscriptionType: "business",
    status: "pending",
    lastPayment: "2024-01-05",
    nextRenewal: "2024-02-05",
    amount: 120.78,
    riskLevel: "medium",
  },
  {
    id: "CUST-005",
    name: "Enterprise Corp",
    email: "admin@enterprise.com",
    subscriptionType: "premium",
    status: "cancelled",
    lastPayment: "2023-11-15",
    nextRenewal: "2023-12-15",
    amount: 157.38,
    riskLevel: "high",
  },
];

export const InitialDashboard = () => {
  const [, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  // Calculate statistics
  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter(
    (c) => c.status === "active"
  ).length;
  const overdueCustomers = mockCustomers.filter(
    (c) => c.status === "overdue"
  ).length;
  const totalRevenue = mockCustomers
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + c.amount, 0);
  const highRiskCustomers = mockCustomers.filter(
    (c) => c.riskLevel === "high"
  ).length;

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-error/10 text-error border-error";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSubscriptionColor = (type: Customer["subscriptionType"]) => {
    switch (type) {
      case "premium":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "business":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "flat-rate":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskColor = (risk: Customer["riskLevel"]) => {
    switch (risk) {
      case "high":
        return "bg-error/10 text-error border-error";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-success/10 text-success border-success";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className='p-4 space-y-6'>
      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
        <Card className='border-border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-blue-600 dark:text-blue-400'>
                  Total Customers
                </p>
                <p className='text-2xl font-bold text-blue-800 dark:text-blue-200'>
                  {totalCustomers}
                </p>
              </div>
              <Users className='w-8 h-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-green-600 dark:text-green-400'>
                  Active Customers
                </p>
                <p className='text-2xl font-bold text-green-800 dark:text-green-200'>
                  {activeCustomers}
                </p>
              </div>
              <TrendingUp className='w-8 h-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-red-600 dark:text-red-400'>
                  Overdue
                </p>
                <p className='text-2xl font-bold text-red-800 dark:text-red-200'>
                  {overdueCustomers}
                </p>
              </div>
              <AlertTriangle className='w-8 h-8 text-red-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-purple-600 dark:text-purple-400'>
                  Monthly Revenue
                </p>
                <p className='text-2xl font-bold text-purple-800 dark:text-purple-200'>
                  €{totalRevenue.toFixed(2)}
                </p>
              </div>
              <DollarSign className='w-8 h-8 text-purple-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-orange-600 dark:text-orange-400'>
                  High Risk
                </p>
                <p className='text-2xl font-bold text-orange-800 dark:text-orange-200'>
                  {highRiskCustomers}
                </p>
              </div>
              <AlertTriangle className='w-8 h-8 text-orange-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue='customers' className='w-full'>
        <TabsList className='grid w-full grid-cols-4 bg-background border border-border'>
          <TabsTrigger
            value='customers'
            className='flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white'
          >
            <Users className='w-4 h-4' />
            Active Customers
          </TabsTrigger>
          <TabsTrigger
            value='payments'
            className='flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white'
          >
            <CreditCard className='w-4 h-4' />
            Payments & Renewals
          </TabsTrigger>
          <TabsTrigger
            value='risk'
            className='flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white'
          >
            <AlertTriangle className='w-4 h-4' />
            Risk Assessment
          </TabsTrigger>
          <TabsTrigger
            value='pricing'
            className='flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white'
          >
            <Settings className='w-4 h-4' />
            Pricing Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value='customers' className='mt-6'>
          <Card className='border-border'>
            <CardHeader>
              <CardTitle>Active Customers by Subscription Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Next Renewal</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{customer.name}</div>
                            <div className='text-sm text-muted-foreground'>
                              {customer.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getSubscriptionColor(
                              customer.subscriptionType
                            )}
                          >
                            {customer.subscriptionType.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className='font-medium'>
                          €{customer.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {new Date(customer.nextRenewal).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(customer.riskLevel)}>
                            {customer.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex items-center justify-end gap-2'>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              <Eye className='w-4 h-4' />
                            </Button>
                            <Button variant='ghost' size='sm'>
                              <Settings className='w-4 h-4' />
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

        <TabsContent value='payments' className='mt-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card className='border-border'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5 text-blue-600' />
                  Upcoming Renewals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {mockCustomers
                    .filter((c) => c.status === "active")
                    .slice(0, 5)
                    .map((customer) => (
                      <div
                        key={customer.id}
                        className='flex items-center justify-between p-3 border border-border rounded-lg'
                      >
                        <div>
                          <div className='font-medium'>{customer.name}</div>
                          <div className='text-sm text-muted-foreground'>
                            Due:{" "}
                            {new Date(
                              customer.nextRenewal
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='font-medium'>
                            €{customer.amount.toFixed(2)}
                          </div>
                          <Badge
                            className={getSubscriptionColor(
                              customer.subscriptionType
                            )}
                          >
                            {customer.subscriptionType}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className='border-border'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CreditCard className='w-5 h-5 text-green-600' />
                  Recent Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {mockCustomers
                    .filter((c) => c.status === "active")
                    .slice(0, 5)
                    .map((customer) => (
                      <div
                        key={customer.id}
                        className='flex items-center justify-between p-3 border border-border rounded-lg'
                      >
                        <div>
                          <div className='font-medium'>{customer.name}</div>
                          <div className='text-sm text-muted-foreground'>
                            Paid:{" "}
                            {new Date(
                              customer.lastPayment
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='font-medium text-success'>
                            €{customer.amount.toFixed(2)}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            Completed
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='risk' className='mt-6'>
          <Card className='border-border'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <AlertTriangle className='w-5 h-5 text-red-600' />
                High-Risk Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {mockCustomers
                  .filter(
                    (c) =>
                      c.riskLevel === "high" ||
                      c.status === "overdue" ||
                      c.status === "cancelled"
                  )
                  .map((customer) => (
                    <div
                      key={customer.id}
                      className='p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20'
                    >
                      <div className='flex items-center justify-between'>
                        <div>
                          <div className='font-medium text-red-800 dark:text-red-200'>
                            {customer.name}
                          </div>
                          <div className='text-sm text-red-600 dark:text-red-400'>
                            {customer.email}
                          </div>
                          <div className='flex items-center gap-2 mt-2'>
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                            <Badge className={getRiskColor(customer.riskLevel)}>
                              {customer.riskLevel} risk
                            </Badge>
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='font-medium'>
                            €{customer.amount.toFixed(2)}
                          </div>
                          <div className='text-sm text-muted-foreground'>
                            {customer.status === "overdue"
                              ? "Overdue since"
                              : "Last payment"}
                            :{" "}
                            {new Date(
                              customer.lastPayment
                            ).toLocaleDateString()}
                          </div>
                          <Button variant='outline' size='sm' className='mt-2'>
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='pricing' className='mt-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card className='border-border'>
              <CardHeader>
                <CardTitle>Current Pricing Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='p-4 border border-border rounded-lg'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium'>Flat Rate Package</h4>
                        <p className='text-sm text-muted-foreground'>
                          For Freelancers
                        </p>
                      </div>
                      <div className='text-right'>
                        <div className='font-bold text-lg'>€39/month</div>
                        <div className='text-xs text-muted-foreground'>
                          VAT included
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-4 border border-border rounded-lg'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium'>Business Package</h4>
                        <p className='text-sm text-muted-foreground'>
                          For Companies
                        </p>
                      </div>
                      <div className='text-right'>
                        <div className='font-bold text-lg'>€120.78/month</div>
                        <div className='text-xs text-muted-foreground'>
                          €99 + 22% VAT
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-4 border border-border rounded-lg'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium'>Premium Business</h4>
                        <p className='text-sm text-muted-foreground'>
                          For Large Companies
                        </p>
                      </div>
                      <div className='text-right'>
                        <div className='font-bold text-lg'>€157.38/month</div>
                        <div className='text-xs text-muted-foreground'>
                          €129 + 22% VAT
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border'>
              <CardHeader>
                <CardTitle>Pricing Actions</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Button className='w-full bg-blue-600 hover:bg-blue-700'>
                  Update Pricing for New Customers
                </Button>
                <Button className='w-full bg-purple-600 hover:bg-purple-700'>
                  Customize Existing Account Pricing
                </Button>
                <Button className='w-full bg-green-600 hover:bg-green-700'>
                  Generate Pricing Report
                </Button>
                <Button variant='outline' className='w-full'>
                  <Download className='w-4 h-4 mr-2' />
                  Export Customer Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Access Navigation */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Link href='/admin/operational-monitoring'>
          <Card className='border-border hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 h-full'>
            <CardContent className='p-6 text-center h-full flex flex-col justify-between'>
              <div className='flex flex-col items-center'>
                <BarChart className='w-12 h-12 mx-auto mb-4 text-gray-600 dark:text-gray-400' />
                <h3 className='font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200'>
                  Operational Monitoring
                </h3>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-auto'>
                Monitor invoices, personnel activity, and financial
                documentation
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href='/admin/ticket-management'>
          <Card className='border-border hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 h-full'>
            <CardContent className='p-6 text-center h-full flex flex-col justify-between'>
              <div className='flex flex-col items-center'>
                <Ticket className='w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400' />
                <h3 className='font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200'>
                  Ticket Management
                </h3>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-auto'>
                View and manage staff search tickets and support requests
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href='/admin/accounting-assistance'>
          <Card className='border-border hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 h-full'>
            <CardContent className='p-6 text-center h-full flex flex-col justify-between'>
              <div className='flex flex-col items-center'>
                <Calculator className='w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400' />
                <h3 className='font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200'>
                  Accounting Assistance
                </h3>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-auto'>
                Manage customer requests and direct chat communications
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

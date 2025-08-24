// src/app/(dashboard)/components/Accountant/InvoiceOverview.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  Search,
  Download,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  issueDate: string;
  dueDate: string;
  pdfUrl?: string;
}

// Mock invoice data
const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    clientName: "ABC Company Ltd",
    amount: 1500.0,
    status: "paid",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    pdfUrl: "/invoices/inv-001.pdf",
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    clientName: "XYZ Corporation",
    amount: 2300.5,
    status: "pending",
    issueDate: "2024-01-20",
    dueDate: "2024-02-20",
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    clientName: "Tech Solutions SRL",
    amount: 850.0,
    status: "overdue",
    issueDate: "2024-01-10",
    dueDate: "2024-02-10",
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    clientName: "Digital Marketing Pro",
    amount: 1200.0,
    status: "paid",
    issueDate: "2024-01-25",
    dueDate: "2024-02-25",
  },
  {
    id: "5",
    invoiceNumber: "INV-005",
    clientName: "Consulting Group",
    amount: 3500.0,
    status: "pending",
    issueDate: "2024-02-01",
    dueDate: "2024-03-01",
  },
];

export const InvoiceOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices] = useState<Invoice[]>(mockInvoices);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidAmount = invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.amount, 0);
    const pendingAmount = invoices
      .filter((inv) => inv.status === "pending")
      .reduce((sum, inv) => sum + inv.amount, 0);
    const overdueAmount = invoices
      .filter((inv) => inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.amount, 0);

    const amountToCollect = totalAmount - paidAmount;

    return {
      totalInvoices,
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount,
      amountToCollect,
    };
  }, [invoices]);

  // Filter invoices based on search
  const filteredInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        invoice.invoiceNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [invoices, searchTerm]);

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-success/10 text-success border-success";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-error/10 text-error border-error";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    console.log("Downloading invoice:", invoice.invoiceNumber);
    toast.success(`Downloading ${invoice.invoiceNumber}`);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    console.log("Viewing invoice:", invoice.invoiceNumber);
    toast.info(`Opening ${invoice.invoiceNumber}`);
  };

  return (
    <div className='space-y-6'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='border-border'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Total Invoices</p>
                <p className='text-2xl font-bold text-foreground'>
                  {summaryStats.totalInvoices}
                </p>
              </div>
              <FileText className='w-8 h-8 text-primary' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Total Invoiced</p>
                <p className='text-2xl font-bold text-foreground'>
                  €{summaryStats.totalAmount.toFixed(2)}
                </p>
              </div>
              <TrendingUp className='w-8 h-8 text-success' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Amount Paid</p>
                <p className='text-2xl font-bold text-success'>
                  €{summaryStats.paidAmount.toFixed(2)}
                </p>
              </div>
              <DollarSign className='w-8 h-8 text-success' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>To Be Collected</p>
                <p className='text-2xl font-bold text-error'>
                  €{summaryStats.amountToCollect.toFixed(2)}
                </p>
              </div>
              <Clock className='w-8 h-8 text-error' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className='border-border'>
        <CardHeader>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <CardTitle>Invoice History</CardTitle>
            <div className='flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background'>
              <Search className='w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search invoices...'
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
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className='font-medium'>
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell className='font-medium'>
                      €{invoice.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleViewInvoice(invoice)}
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        {invoice.pdfUrl && (
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDownloadInvoice(invoice)}
                          >
                            <Download className='w-4 h-4' />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className='text-center py-8 text-muted-foreground'>
              {searchTerm
                ? "No invoices match your search"
                : "No invoices created yet"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

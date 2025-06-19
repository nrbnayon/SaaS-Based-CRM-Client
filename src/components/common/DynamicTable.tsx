// src\components\common\DynamicTable.tsx
"use client";

import {
  PencilLine,
  SearchIcon,
  Trash2,
  X,
  Check,
  CalendarDays,
  Save,
} from "lucide-react";

import { PiSlidersHorizontal } from "react-icons/pi"; // for filter icon

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

// Transaction type definitions
export interface Transaction {
  id: string;
  category: string;
  name: string;
  details: string;
  amount: string;
  image?: string;
  transaction: string;
  account: "Income" | "Expense" | "VAT" | "Saving";
  date?: string;
  [key: string]: unknown;
}

// Account type color mapping
const accountColors = {
  Income: "text-success",
  Expense: "text-error",
  VAT: "text-yellow-light",
  Saving: "text-cyan",
} as const;

// Props interface for the component
interface TransactionsSectionProps {
  title?: string;
  transactions: Transaction[];
  columns?: string[];
  searchPlaceholder?: string;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
  onSearch?: (searchTerm: string) => void;
  onDateFilter?: (startDate: string, endDate: string) => void;
  onAccountFilter?: (account: string) => void;
  className?: string;
  showFilters?: boolean;
  enableSearch?: boolean;
  enableEdit?: boolean;
  enableDelete?: boolean;
  text?: string;
  url?: string;
  itemsPerPage?: number;
}

// Default columns configuration
const defaultColumns = [
  "T-ID",
  "Category",
  "Name",
  "Details",
  "Amount",
  "Image",
  "Transaction",
  "Account",
  "Edit",
];

export const DynamicTable: React.FC<TransactionsSectionProps> = ({
  title = "Transactions",
  transactions = [],
  columns = defaultColumns,
  searchPlaceholder = "Search your transactions",
  onEdit,
  onDelete,
  onSearch,
  onDateFilter,
  onAccountFilter,
  className,
  showFilters = true,
  enableSearch = true,
  enableEdit = true,
  enableDelete = false,
  itemsPerPage = 12,
  text,
  url,
}) => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [accountFilter, setAccountFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCell, setEditingCell] = useState<{
    id: string;
    field: string;
    value: string;
  } | null>(null);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [localTransactions, setLocalTransactions] =
    useState<Transaction[]>(transactions);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    transactionId: string;
    transactionName: string;
  }>({
    open: false,
    transactionId: "",
    transactionName: "",
  });

  // Update local transactions when props change
  React.useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  // Filtered transactions based on search and filters
  const filteredTransactions = useMemo(() => {
    return localTransactions.filter((transaction) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        Object.values(transaction).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Account filter
      const matchesAccount =
        accountFilter === "all" ||
        transaction.account.toLowerCase() === accountFilter.toLowerCase();

      // Date filter (if dates are provided)
      let matchesDate = true;
      if (startDate && transaction.date) {
        const transactionDate = new Date(transaction.date);
        const filterDate = new Date(startDate);

        // Set time to start of day for accurate comparison
        transactionDate.setHours(0, 0, 0, 0);
        filterDate.setHours(0, 0, 0, 0);

        matchesDate = transactionDate.getTime() === filterDate.getTime();
      }

      return matchesSearch && matchesAccount && matchesDate;
    });
  }, [localTransactions, searchTerm, accountFilter, startDate, endDate]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
    onSearch?.(value);
  };

  // Handle account filter change
  const handleAccountFilterChange = (value: string) => {
    setAccountFilter(value);
    setCurrentPage(1); // Reset to first page on filter
    onAccountFilter?.(value);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle edit button click
  const handleEditClick = (transaction: Transaction) => {
    if (editingRow === transaction.id) {
      // Save changes
      onEdit?.(transaction);
      setEditingRow(null);
      setEditingCell(null);
    } else {
      // Start editing
      setEditingRow(transaction.id);
      setEditingCell(null);
    }
  };

  // Handle cell edit start
  const handleCellEdit = (transaction: Transaction, field: string) => {
    if (!enableEdit || editingRow !== transaction.id || field === "id") return;

    const value = transaction[field]?.toString() || "";
    setEditingCell({
      id: transaction.id,
      field,
      value,
    });
  };

  // Handle cell edit save
  const handleCellSave = () => {
    if (!editingCell) return;

    const updatedTransactions = localTransactions.map((transaction) => {
      if (transaction.id === editingCell.id) {
        const updatedTransaction = {
          ...transaction,
          [editingCell.field]: editingCell.value,
        };
        return updatedTransaction;
      }
      return transaction;
    });

    setLocalTransactions(updatedTransactions);
    setEditingCell(null);
  };

  // Handle cell edit cancel
  const handleCellCancel = () => {
    setEditingCell(null);
  };

  // Handle delete confirmation
  const handleDeleteClick = (transaction: Transaction) => {
    setDeleteConfirm({
      open: true,
      transactionId: transaction.id,
      transactionName: transaction.name,
    });
  };

  // Handle delete confirm
  const handleDeleteConfirm = () => {
    const updatedTransactions = localTransactions.filter(
      (transaction) => transaction.id !== deleteConfirm.transactionId
    );

    setLocalTransactions(updatedTransactions);
    onDelete?.(deleteConfirm.transactionId);

    setDeleteConfirm({
      open: false,
      transactionId: "",
      transactionName: "",
    });

    // Adjust current page if necessary
    const newTotalPages = Math.ceil(updatedTransactions.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  // Handle delete cancel
  const handleDeleteCancel = () => {
    setDeleteConfirm({
      open: false,
      transactionId: "",
      transactionName: "",
    });
  };

  // Get account color class
  const getAccountColor = (account: Transaction["account"]) => {
    return accountColors[account] || "text-foreground";
  };

  // Get unique account types for filter dropdown
  const accountTypes = useMemo(() => {
    const types = Array.from(new Set(localTransactions.map((t) => t.account)));
    return types;
  }, [localTransactions]);

  // Determine if we should show the link button instead of search/filters
  const showLinkButton = text && url;

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Format number values
  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[$,]/g, '')) : value;
    return isNaN(numValue) ? '$0' : `$${numValue.toLocaleString()}`;
  };

  // Render editable cell
  const renderEditableCell = (
    transaction: Transaction,
    field: string,
    value: string
  ) => {
    const isRowEditing = editingRow === transaction.id;
    const isEditing =
      editingCell?.id === transaction.id && editingCell?.field === field;
    const isIdField = field === "id";

    if (isEditing) {
      return (
        <div className='flex items-center gap-1'>
          <Input
            value={editingCell.value}
            onChange={(e) =>
              setEditingCell({ ...editingCell, value: e.target.value })
            }
            className='h-8 text-sm border-border'
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCellSave();
              } else if (e.key === "Escape") {
                handleCellCancel();
              }
            }}
            autoFocus
          />
          <Button
            size='sm'
            variant='ghost'
            className='h-6 w-6 p-0'
            onClick={handleCellSave}
          >
            <Check className='w-3 h-3' />
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='h-6 w-6 p-0'
            onClick={handleCellCancel}
          >
            <X className='w-3 h-3' />
          </Button>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "p-1 rounded transition-colors",
          enableEdit &&
            isRowEditing &&
            !isIdField &&
            "cursor-pointer hover:bg-accent/20 hover:outline-1 hover:outline-border bg-blue-50 dark:bg-blue-900/20"
        )}
        onClick={() =>
          enableEdit && isRowEditing && handleCellEdit(transaction, field)
        }
        title={
          enableEdit && isRowEditing && !isIdField ? "Click to edit" : value
        }
      >
        <div className='truncate max-w-[120px] lg:max-w-none'>
          {value || "-"}
        </div>
      </div>
    );
  };

  // Function to render cell content based on column type
  const renderCellContent = (transaction: Transaction, column: string) => {
    switch (column) {
      case "T-ID":
      case "Invoice NO":
        return renderEditableCell(transaction, "id", transaction.id);
      
      case "Category":
        return renderEditableCell(transaction, "category", transaction.category);
      
      case "Name":
        return renderEditableCell(transaction, "name", transaction.name);
      
      case "Details":
        return renderEditableCell(transaction, "details", transaction.details);
      
      case "Amount":
        return renderEditableCell(transaction, "amount", transaction.amount);
      
      case "Image":
        return transaction.image || "Image";
      
      case "Transaction":
      case "Bill":
        return renderEditableCell(transaction, "transaction", transaction.transaction);
      
      case "Account":
        return (
          <Badge
            className={cn(
              "font-semibold text-xs lg:text-sm bg-transparent hover:bg-transparent border-0 px-2 py-1",
              getAccountColor(transaction.account)
            )}
          >
            {transaction.account}
          </Badge>
        );
      
      case "Date":
        return transaction.date || "-";
      
      case "Discount":
        return renderEditableCell(
          transaction, 
          "discount", 
          formatCurrency(transaction.discount || 0)
        );
      
      case "Expanse":
        return renderEditableCell(
          transaction, 
          "expanse", 
          formatCurrency(transaction.expanse || 0)
        );
      
      case "Income":
        return renderEditableCell(
          transaction, 
          "income", 
          formatCurrency(transaction.income || 0)
        );
      
      case "Balance":
        const balance = Number(transaction.balance);
        const balanceColor = balance < 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400";
        return (
          <div className={cn("font-semibold", balanceColor)}>
            {renderEditableCell(
              transaction, 
              "balance", 
              formatCurrency(balance)
            )}
          </div>
        );
      
      case "Edit":
        return enableEdit ? (
          <Button
            variant='ghost'
            size='sm'
            className='h-8 w-8 p-0 hover:bg-accent dark:hover:bg-secondary text-foreground dark:text-white'
            onClick={() => handleEditClick(transaction)}
          >
            {editingRow === transaction.id ? (
              <Save className='w-4 h-4' />
            ) : (
              <PencilLine className='w-4 h-4' />
            )}
          </Button>
        ) : null;
      
      default:
        return transaction[column.toLowerCase()]?.toString() || "-";
    }
  };

  return (
    <section
      className={cn("flex flex-col w-full items-start gap-6", className)}
    >
      {/* Header Section */}
      <div className='flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4'>
        <h2 className='font-bold text-xl lg:text-2xl leading-7 text-foreground'>
          {title}
        </h2>

        {/* Search and Filters Container OR Link Button */}
        <div className='flex items-center gap-3 w-full lg:w-auto'>
          {showLinkButton ? (
            /* Link Button */
            <Link href={url}>
              <Button
                variant='outline'
                className='px-6 py-2 border-border hover:bg-accent dark:hover:bg-secondary'
              >
                {text}
              </Button>
            </Link>
          ) : (
            <>
              {/* Search Input */}
              {enableSearch && (
                <div className='flex items-center gap-2 px-4 py-3 rounded-xl border border-solid border-border w-full sm:max-w-[300px] lg:max-w-[356px] bg-background'>
                  <SearchIcon className='w-5 h-5 text-muted-custom flex-shrink-0' />
                  <Input
                    className={cn(
                      "border-none bg-transparent text-foreground text-base focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-6 placeholder:text-muted-custom"
                    )}
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              )}

              {/* Filters */}
              {showFilters && (
                <div className='flex items-center gap-2'>
                  {/* Account Filter */}
                  <div className='relative flex items-center justify-center px-3 py-2.5 rounded-xl border border-solid border-border bg-background min-w-[44px] h-[44px]'>
                    <PiSlidersHorizontal className='w-4 h-4 text-muted-custom' />
                    <Select
                      value={accountFilter}
                      onValueChange={handleAccountFilterChange}
                    >
                      <SelectTrigger className='absolute inset-0 border-none bg-transparent opacity-0 cursor-pointer'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Accounts</SelectItem>
                        {accountTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Filter */}
                  <div className='relative flex items-center justify-center px-3 py-2.5 rounded-xl border border-solid border-border bg-background min-w-[44px] h-[44px]'>
                    <CalendarDays className='w-4 h-4 text-muted-custom cursor-pointer absolute z-10 pointer-events-none' />
                    <input
                      type='date'
                      className='absolute inset-0 border-none bg-transparent opacity-0 cursor-pointer z-20'
                      value={startDate}
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        setStartDate(selectedDate);
                        setEndDate(selectedDate); // Set both to same date for single-day filtering

                        if (selectedDate) {
                          // Apply filter immediately for single date
                          setCurrentPage(1);
                          onDateFilter?.(selectedDate, selectedDate);
                        }
                      }}
                      title='Filter by Date'
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Table Container with Responsive Scroll */}
      <div className='w-full overflow-x-auto'>
        <div className='min-w-[800px]'>
          <Table>
            {/* Table Header */}
            <TableHeader className='bg-accent dark:bg-secondary'>
              <TableRow className='hover:bg-transparent border-b-0'>
                {columns.map((column) => (
                  <TableHead
                    key={column}
                    className={cn(
                      "text-center font-semibold text-sm lg:text-base text-foreground py-4 px-2",
                      "first:rounded-l-lg last:rounded-r-lg",
                      "dark:text-white"
                    )}
                  >
                    {column}
                  </TableHead>
                ))}
                {enableDelete && (
                  <TableHead
                    className={cn(
                      "text-center font-semibold text-sm lg:text-base text-foreground py-4 px-2",
                      "rounded-r-lg",
                      "dark:text-white"
                    )}
                  >
                    Delete
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className='space-y-1'>
              {currentData.length > 0 ? (
                currentData.map((transaction, index) => (
                  <TableRow
                    key={`${transaction.id}-${index}`}
                    className={cn(
                      "hover:bg-accent/50 dark:hover:bg-secondary/50 transition-colors",
                      "border-b border-border/30",
                      "dark:bg-dark-primary/50",
                      editingRow === transaction.id &&
                        "bg-blue-50/50 dark:bg-blue-900/10",
                      // Light mode: gap-4 between cells
                      "[&>td]:px-4 [&>td]:py-3",
                      // Dark mode: gap-4 between header and cells, gap-2 between cells
                      "dark:[&>td]:px-2 dark:[&>td]:py-2"
                    )}
                  >
                    {columns.map((column) => (
                      <TableCell 
                        key={column}
                        className='text-center font-normal text-sm lg:text-base text-foreground dark:text-white'
                      >
                        {renderCellContent(transaction, column)}
                      </TableCell>
                    ))}

                    {/* Delete Button */}
                    {enableDelete && (
                      <TableCell className='text-center'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400'
                          onClick={() => handleDeleteClick(transaction)}
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (enableDelete ? 1 : 0)}
                    className='text-center py-8 text-muted-custom dark:text-gray-400'
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Results Summary */}
      {filteredTransactions.length > 0 && (
        <div className='text-sm text-muted-custom dark:text-gray-400'>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of{" "}
          {filteredTransactions.length} transactions
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center w-full mt-5'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {generatePageNumbers().map((pageNum, index) => (
                <PaginationItem key={index}>
                  {pageNum === "..." ? (
                    <span className='px-3 py-2'>...</span>
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum as number)}
                      isActive={currentPage === pageNum}
                      className='cursor-pointer'
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteConfirm.open} onOpenChange={handleDeleteCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the transaction &#34;
              {deleteConfirm.transactionName}&#34;? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
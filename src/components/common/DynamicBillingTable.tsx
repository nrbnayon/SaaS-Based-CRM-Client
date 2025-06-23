/** @format */

"use client";
import { Download, FileText, SearchIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "../ui/input";

// Plan interface
interface Plan {
  id: string;
  plan: string;
  issue: string;
  expire: string;
  amount: number | string;
  download: string;
  [key: string]: string | number;
}

// Props interface
interface PlanTableProps {
  title?: string;
  plans: Plan[];
  className?: string;
  itemsPerPage?: number;
  enableSearch?: boolean;
  searchPlaceholder?: string;
}

export const DynamicBillingTable: React.FC<PlanTableProps> = ({
  title = "Plan Management",
  plans = [],
  itemsPerPage = 12,
  enableSearch = true,
  searchPlaceholder = "Search your plans",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debug: Log props
  console.log("DynamicBillingTable - Received plans:", plans);
  console.log("DynamicBillingTable - Plans length:", plans.length);

  // Filtered plans
  const filteredPlans = useMemo(() => {
    console.log("Filtering plans with search term:", searchTerm);
    if (!plans || !Array.isArray(plans) || plans.length === 0) {
      console.log("No valid plans data");
      return [];
    }

    return plans.filter((plan) => {
      if (!plan || typeof plan !== "object") {
        console.log("Invalid plan object:", plan);
        return false;
      }

      return (
        searchTerm === "" ||
        Object.values(plan).some((value) => {
          if (value === null || value === undefined) return false;
          return value
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
      );
    });
  }, [plans, searchTerm]);

  console.log("Filtered plans:", filteredPlans);

  // Pagination
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredPlans.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  console.log("Current data:", currentData, "Total pages:", totalPages);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle download
  const handleDownload = (pdfUrl: string, planName: string) => {
    console.log(`Downloading PDF for ${planName}: ${pdfUrl}`);
    if (pdfUrl && pdfUrl.trim() !== "") {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${planName.replace(/\s+/g, "_")}_invoice.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn("No valid PDF URL provided for", planName);
    }
  };

  // Format currency
  const formatCurrency = (value: number | string) => {
    if (value === null || value === undefined) return "$0";
    const numValue =
      typeof value === "string"
        ? parseFloat(value.replace(/[$,]/g, ""))
        : value;
    return isNaN(numValue) ? "$0" : `$${numValue.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Define table columns
  const tableColumns = ["Plan", "Issue", "Expire", "Amount", "Download"];

  // Render cell content
  const renderCellContent = (plan: Plan, column: string) => {
    if (!plan) return "-";

    switch (column) {
      case "Plan":
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium text-foreground dark:text-white">
              {plan.plan || "Unknown Plan"}
            </div>
          </div>
        );
      case "Issue":
        return (
          <div className="text-foreground ">
            {formatDate(String(plan[column.toLowerCase()]))}
          </div>
        );
      case "Expire":
        return (
          <div className="text-error ">
            {formatDate(String(plan[column.toLowerCase()]))}
          </div>
        );
      case "Amount":
        return (
          <div className="font-semibold text-foreground">
            {formatCurrency(plan.amount)}
          </div>
        );
      case "Download":
        return (
          <div className="flex items-center justify-center gap-2">
            {plan.download && plan.download.trim() !== "" ? (
              <a
                className="h-8 px-3 underline cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                onClick={() => handleDownload(plan.download, plan.plan)}
              >
                Download PDF
              </a>
            ) : (
              <div className="flex items-center text-muted-foreground dark:text-gray-400">
                <span className="text-xs">No PDF</span>
              </div>
            )}
          </div>
        );
      default:
        return plan[column.toLowerCase()]?.toString() || "-";
    }
  };

  // Generate page numbers
  const generatePageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <section
      className={cn(
        "flex flex-col w-full items-start gap-6 bg-card rounded-lg p-4"
      )}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4">
        <div>
          <h2 className="font-bold text-xl lg:text-2xl leading-7 text-foreground">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-solid border-border w-full sm:max-w-[300px] lg:max-w-[356px] bg-background">
          <SearchIcon className="w-5 h-5 text-muted-custom flex-shrink-0" />
          {enableSearch && (
            <Input
              className={cn(
                "border-none bg-transparent text-foreground text-base focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-6 placeholder:text-muted-custom"
              )}
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto scrollbar-custom">
        <div className="w-full">
          <Table>
            <TableHeader className="bg-accent dark:bg-secondary">
              <TableRow className="hover:bg-transparent border-b-0">
                {tableColumns.map((column) => (
                  <TableHead
                    key={column}
                    className={cn(
                      "text-center font-semibold text-sm lg:text-base text-foreground py-4 px-2",
                      "first:rounded-tl-lg last:rounded-tr-lg",
                      "dark:text-white"
                    )}
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((plan, index) => (
                  <TableRow
                    key={`${plan.id}-${index}`}
                    className={cn(
                      "hover:bg-accent/50 dark:hover:bg-secondary/50 transition-colors",
                      "border-b border-border/30",
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-900/30"
                        : "bg-gray-50 dark:bg-gray-800/50",
                      "[&>td]:px-4 [&>td]:py-3",
                      index === currentData.length - 1 &&
                        "[&>td:first-child]:rounded-bl-lg [&>td:last-child]:rounded-br-lg"
                    )}
                  >
                    {tableColumns.map((column) => (
                      <TableCell
                        key={column}
                        className="text-center font-normal text-sm lg:text-base"
                      >
                        {renderCellContent(plan, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="text-center py-8 text-muted-foreground dark:text-gray-400"
                  >
                    {plans.length === 0
                      ? "No billing data available"
                      : "No plans match your search criteria"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Results Summary */}
      {filteredPlans.length > 0 && (
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredPlans.length)} of{" "}
          {filteredPlans.length} plans
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center w-full mt-5">
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
                    <span className="px-3 py-2">...</span>
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum as number)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
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
    </section>
  );
};

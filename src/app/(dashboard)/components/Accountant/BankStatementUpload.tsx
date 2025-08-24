// src/app/(dashboard)/components/Accountant/BankStatementUpload.tsx
"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Trash2, 
  Send, 
  Building2
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadedStatement {
  id: string;
  file: File;
  label: string;
  quarter: string;
  uploadDate: string;
  status: "pending" | "sent" | "processed";
}

export const BankStatementUpload = () => {
  const [uploadedStatements, setUploadedStatements] = useState<UploadedStatement[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quarters = [
    { value: "Q1", label: "1st Quarter (Jan-Mar)" },
    { value: "Q2", label: "2nd Quarter (Apr-Jun)" },
    { value: "Q3", label: "3rd Quarter (Jul-Sep)" },
    { value: "Q4", label: "4th Quarter (Oct-Dec)" },
    { value: "ANNUAL", label: "Annual Statement" },
    { value: "MONTHLY", label: "Monthly Statement" },
    { value: "OTHER", label: "Other" }
  ];

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      const newStatements: UploadedStatement[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        label: file.name.replace('.pdf', ''),
        quarter: "Q1",
        uploadDate: new Date().toISOString(),
        status: "pending"
      }));

      setUploadedStatements(prev => [...prev, ...newStatements]);
      
      toast.success("Files uploaded successfully!", {
        description: `${files.length} file(s) ready to be labeled and sent`
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed", {
        description: "Please try again"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const updateStatementLabel = (id: string, label: string) => {
    setUploadedStatements(prev =>
      prev.map(statement =>
        statement.id === id ? { ...statement, label } : statement
      )
    );
  };

  const updateStatementQuarter = (id: string, quarter: string) => {
    setUploadedStatements(prev =>
      prev.map(statement =>
        statement.id === id ? { ...statement, quarter } : statement
      )
    );
  };

  const removeStatement = (id: string) => {
    setUploadedStatements(prev => prev.filter(statement => statement.id !== id));
  };

  const sendToAccountant = async (id: string) => {
    const statement = uploadedStatements.find(s => s.id === id);
    if (!statement) return;

    try {
      // Simulate sending to accountant
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Sending bank statement to accountant:", {
        fileName: statement.file.name,
        label: statement.label,
        quarter: statement.quarter,
        emailRecipient: "commercialista@agenziareduco.it",
        timestamp: new Date().toISOString()
      });

      setUploadedStatements(prev =>
        prev.map(s =>
          s.id === id ? { ...s, status: "sent" } : s
        )
      );

      toast.success("Statement sent to accountant!", {
        description: `${statement.label} has been forwarded to commercialista@agenziareduco.it`
      });
    } catch (error) {
      console.error("Send error:", error);
      toast.error("Failed to send statement");
    }
  };

  const sendAllToAccountant = async () => {
    const pendingStatements = uploadedStatements.filter(s => s.status === "pending");
    if (pendingStatements.length === 0) return;

    try {
      // Simulate sending all statements
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Sending all bank statements to accountant:", {
        statements: pendingStatements.map(s => ({
          fileName: s.file.name,
          label: s.label,
          quarter: s.quarter
        })),
        emailRecipient: "commercialista@agenziareduco.it",
        timestamp: new Date().toISOString()
      });

      setUploadedStatements(prev =>
        prev.map(s =>
          s.status === "pending" ? { ...s, status: "sent" } : s
        )
      );

      toast.success("All statements sent!", {
        description: `${pendingStatements.length} statement(s) forwarded to your accountant`
      });
    } catch (error) {
      console.error("Send all error:", error);
      toast.error("Failed to send statements");
    }
  };

  const getStatusColor = (status: UploadedStatement["status"]) => {
    switch (status) {
      case "sent":
        return "bg-success/10 text-success border-success";
      case "processed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className='space-y-6'>
      {/* Upload Area */}
      <Card className='border-border'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Upload className='w-5 h-5 text-primary' />
            Upload Bank Statements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isUploading
                ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <Upload
              className={`w-12 h-12 mx-auto mb-4 ${
                isUploading ? "text-gray-400" : "text-muted-foreground"
              }`}
            />
            <h3 className='text-lg font-medium text-foreground mb-2'>
              {isUploading
                ? "Processing files..."
                : "Upload PDF Bank Statements"}
            </h3>
            <p className='text-muted-foreground mb-4'>
              {isUploading
                ? "Please wait while we process your files"
                : "Click to browse or drag and drop your PDF bank statements here"}
            </p>
            <Button variant='outline' disabled={isUploading}>
              {isUploading ? "Uploading..." : "Browse Files"}
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              accept='.pdf'
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              className='hidden'
            />
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Statements */}
      {uploadedStatements.length > 0 && (
        <Card className='border-border'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>
                Uploaded Statements ({uploadedStatements.length})
              </CardTitle>
              {uploadedStatements.some((s) => s.status === "pending") && (
                <Button
                  onClick={sendAllToAccountant}
                  className='bg-primary hover:bg-primary/90'
                >
                  <Send className='w-4 h-4 mr-2' />
                  Send All to Accountant
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {uploadedStatements.map((statement) => (
                <div
                  key={statement.id}
                  className='border border-border rounded-lg p-4'
                >
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center'>
                    {/* File Info */}
                    <div className='md:col-span-3 flex items-center gap-3'>
                      <FileText className='w-8 h-8 text-primary flex-shrink-0' />
                      <div>
                        <p className='font-medium text-foreground'>
                          {statement.file.name}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {formatFileSize(statement.file.size)}
                        </p>
                      </div>
                    </div>

                    {/* Label Input */}
                    <div className='md:col-span-3'>
                      <Label className='text-sm'>Custom Label</Label>
                      <Input
                        value={statement.label}
                        onChange={(e) =>
                          updateStatementLabel(statement.id, e.target.value)
                        }
                        placeholder='e.g., 1st Quarter 2024'
                        className='border-border'
                      />
                    </div>

                    {/* Quarter Selection */}
                    <div className='md:col-span-2'>
                      <Label className='text-sm'>Period</Label>
                      <Select
                        value={statement.quarter}
                        onValueChange={(value) =>
                          updateStatementQuarter(statement.id, value)
                        }
                      >
                        <SelectTrigger className='border-border'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {quarters.map((quarter) => (
                            <SelectItem
                              key={quarter.value}
                              value={quarter.value}
                            >
                              {quarter.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status */}
                    <div className='md:col-span-2'>
                      <Badge className={getStatusColor(statement.status)}>
                        {statement.status.charAt(0).toUpperCase() +
                          statement.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className='md:col-span-2 flex items-center justify-end gap-2'>
                      {statement.status === "pending" && (
                        <Button
                          size='sm'
                          onClick={() => sendToAccountant(statement.id)}
                          className='bg-success hover:bg-success/90'
                        >
                          <Send className='w-4 h-4' />
                        </Button>
                      )}
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => removeStatement(statement.id)}
                        className='text-error hover:text-error hover:bg-error/10'
                      >
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className='border-border bg-blue-50 dark:bg-blue-950/20'>
        <CardContent className='p-6'>
          <div className='flex items-start gap-3'>
            <Building2 className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
            <div>
              <h3 className='font-semibold text-foreground mb-2'>
                How it works
              </h3>
              <ul className='text-sm text-muted-foreground space-y-1'>
                <li>
                  • Upload your PDF bank statements using the upload area above
                </li>
                <li>
                  • Add custom labels to identify each statement (e.g.,
                  &ldquo;1st Quarter 2024&ldquo;)
                </li>
                <li>• Select the appropriate time period for each statement</li>
                <li>
                  • Click &ldquo;Send to Accountant&ldquo; to forward statements
                  to commercialista@agenziareduco.it
                </li>
                <li>
                  • Your accountant will receive the labeled files automatically
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
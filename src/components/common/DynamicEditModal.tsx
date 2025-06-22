// src/components/common/DynamicEditModal.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/allTypes";
import Image from "next/image";

// Field configuration for dynamic form generation
interface FormFieldConfig {
  key: string;
  label: string;
  type:
    | "text"
    | "number"
    | "date"
    | "textarea"
    | "select"
    | "readonly"
    | "file";
  icon?: React.ReactNode;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
  gridCol?: "full" | "half";
  section?: "main" | "details" | "notes" | "upload";
}

// Props for the edit modal
interface DynamicEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSave: (updatedTransaction: Transaction) => void;
  title?: string;
  description?: string;
  fieldConfigs?: FormFieldConfig[];
  modalType?: "income" | "expense" | "vat" | "saving";
}

// Default field configurations based on the image design
const getDefaultFieldConfigs = (modalType = "income"): FormFieldConfig[] => {
  const baseTitle =
    modalType === "income"
      ? "Income"
      : modalType === "expense"
      ? "Expense"
      : "Transaction";

  return [
    {
      key: "category",
      label: `${baseTitle} Source`,
      type: "text",
      placeholder: "Enter source name",
      required: true,
      gridCol: "full",
      section: "main",
    },
    {
      key: "name",
      label: "Client Name / Company",
      type: "text",
      placeholder: "Enter client or company name",
      required: true,
      gridCol: "half",
      section: "main",
    },
    {
      key: "contact",
      label: "Contact",
      type: "text",
      placeholder: "Enter contact number",
      gridCol: "half",
      section: "main",
    },
    {
      key: "date",
      label: "Received Date",
      type: "date",
      gridCol: "half",
      section: "details",
    },
    {
      key: "amount",
      label: "Amount",
      type: "text",
      placeholder: "Enter amount (e.g., $4,652.00)",
      required: true,
      gridCol: "half",
      section: "details",
    },
    {
      key: "transaction",
      label: "Payment Method",
      type: "select",
      options: [
        { value: "Card", label: "Card" },
        { value: "Bank", label: "Bank Transfer" },
        { value: "Cash", label: "Cash" },
        { value: "Check", label: "Check" },
        { value: "Online", label: "Online Payment" },
      ],
      gridCol: "half",
      section: "details",
    },
    {
      key: "details",
      label: `${baseTitle} Categories`,
      type: "select",
      options: [
        { value: "Buy Car", label: "Buy Car" },
        { value: "Salary", label: "Salary" },
        { value: "Freelance", label: "Freelance" },
        { value: "Investment", label: "Investment" },
        { value: "Other", label: "Other" },
      ],
      gridCol: "half",
      section: "details",
    },
    {
      key: "uploadProof",
      label: "Upload Proof (optional)",
      type: "file",
      gridCol: "half",
      section: "upload",
    },
    {
      key: "notes",
      label: "Notes",
      type: "textarea",
      placeholder:
        "It's important to include a detailed note that captures the reasons behind the issuance of this bill. This note should serve as a reminder for you in the future, outlining the specific circumstances that led to this charge. Consider mentioning any relevant dates, services rendered, or agreements made that justify the bill. By doing so, you will have a clear reference point that can help clarify any questions or concerns that may arise later regarding this financial obligation.",
      gridCol: "full",
      section: "notes",
    },
  ];
};

// Account type color mapping
const accountColors = {
  Income: "bg-[#323232] text-success border-green-200",
  Expense: "bg-[#323232] text-error border-red-200",
  VAT: "bg-[#323232] text-yellow-light border-yellow-200",
  Saving: "bg-[#323232] text-cyan border-blue-200",
} as const;

export const DynamicEditModal: React.FC<DynamicEditModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onSave,
  title,
  description,
  fieldConfigs,
  modalType = "income",
}) => {
  const [formData, setFormData] = useState<Transaction | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([]);

  // Get field configs based on modal type
  const configs = fieldConfigs || getDefaultFieldConfigs(modalType);

  // Determine modal type based on transaction account or default to income
  const currentModalType =
    (transaction?.account?.toLowerCase() as
      | "income"
      | "expense"
      | "vat"
      | "saving") || modalType;

  // Generate dynamic title and description
  const modalTitle =
    title ||
    `${transaction?.category || "Company"} ${
      currentModalType === "income"
        ? "Income"
        : currentModalType === "expense"
        ? "Expense"
        : currentModalType === "vat"
        ? "VAT"
        : currentModalType === "saving"
        ? "Saving"
        : "Transaction"
    } Details`;
  const modalDescription =
    description ||
    `Let's take a moment to add your ${currentModalType} so we can better understand your financial situation.`;

  // Initialize form data when transaction changes
  useEffect(() => {
    if (transaction) {
      setFormData({
        ...transaction,
        // Ensure we have default values for fields that might not exist
        contact: transaction.contact || "",
        notes: transaction.notes || "",
      });
      setErrors({});
    }
  }, [transaction]);

  // Handle input changes
  const handleInputChange = (key: string, value: string) => {
    if (!formData) return;

    setFormData((prev) => ({
      ...prev!,
      [key]: value,
    }));

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: Record<string, string> = {};

    configs.forEach((config) => {
      if (config.required && !formData[config.key]) {
        newErrors[config.key] = `${config.label} is required`;
      }
    });

    // Custom validation for amount
    if (
      formData.amount &&
      !formData.amount.match(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/)
    ) {
      newErrors.amount =
        "Please enter a valid amount format (e.g., $1,000 or 1000.00)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5); // Limit to 5 files
    setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 5));

    // Create preview URLs
    newFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setFilePreviewUrls((prev) => [...prev, url].slice(0, 5));
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviewUrls((prev) => {
      const newUrls = prev.filter((_, i) => i !== index);
      // Revoke the removed URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return newUrls;
    });
  };

  // Handle save
  const handleSave = async () => {
    if (!formData || !validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle close
  const handleClose = () => {
    setFormData(null);
    setErrors({});
    onClose();
  };

  // Render form field based on type
  const renderFormField = (config: FormFieldConfig) => {
    if (!formData) return null;

    const value = formData[config.key]?.toString() || "";
    const hasError = errors[config.key];

    const fieldElement = (() => {
      switch (config.type) {
        case "textarea":
          return (
            <Textarea
              value={value}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              placeholder={config.placeholder}
              className={cn(
                "min-h-[120px] resize-none bg-gray-50 border-gray-200 text-foreground placeholder:text-muted-custom",
                "focus:border-blue-500 focus:ring-blue-500/20",
                hasError && "border-red-500 focus:border-red-500"
              )}
            />
          );

        case "select":
          return (
            <Select
              value={value}
              onValueChange={(val) => handleInputChange(config.key, val)}
            >
              <SelectTrigger
                className={cn(
                  "border-gray-200 text-foreground",
                  "focus:border-blue-500 focus:ring-blue-500/20",
                  hasError && "border-red-500 focus:border-red-500"
                )}
              >
                <SelectValue
                  placeholder={config.placeholder || `Select ${config.label}`}
                />
              </SelectTrigger>
              <SelectContent className='border-gray-200'>
                {config.options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className='text-foreground focus:bg-cyan focus:text-foreground'
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case "date":
          return (
            <Input
              type='date'
              value={value}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              className={cn(
                "bg-gray-50 border-gray-200 text-foreground",
                "focus:border-blue-500 focus:ring-blue-500/20",
                hasError && "border-red-500 focus:border-red-500"
              )}
            />
          );

        case "file":
          return (
            <div className='space-y-4'>
              {/* File Upload Area */}
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors'>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className='hidden'
                  id='file-upload'
                />
                <label htmlFor='file-upload' className='cursor-pointer'>
                  <div className='space-y-2'>
                    <div className='w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center'>
                      <svg
                        className='w-6 h-6 text-muted-custom'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                        />
                      </svg>
                    </div>
                    <div>
                      <span className='text-blue-600 font-medium'>Browse</span>
                      <p className='text-sm text-muted-custom mt-1'>
                        Max file size 50MB
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* File Previews */}
              {filePreviewUrls.length > 0 && (
                <div className='flex gap-3 flex-wrap'>
                  {filePreviewUrls.map((url, index) => (
                    <div key={index} className='relative group'>
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className='w-20 h-20 object-cover rounded-lg border border-gray-200'
                        width={40}
                        height={40}
                      />
                      <button
                        type='button'
                        onClick={() => removeFile(index)}
                        className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        default:
          return (
            <Input
              type={config.type}
              value={value}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              placeholder={config.placeholder}
              className={cn(
                "bg-gray-50 border-gray-200 text-foreground placeholder:text-gray-500",
                "focus:border-blue-500 focus:ring-blue-500/20",
                hasError && "border-red-500 focus:border-red-500"
              )}
            />
          );
      }
    })();

    return (
      <div className='space-y-3'>
        <Label
          htmlFor={config.key}
          className='text-foreground font-medium text-base'
        >
          {config.label}
          {config.required && <span className='text-red-400 ml-1'>*</span>}
        </Label>
        {fieldElement}
        {hasError && (
          <p className='text-sm text-red-400 flex items-center gap-1'>
            <X className='w-3 h-3' />
            {hasError}
          </p>
        )}
      </div>
    );
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='min-w-6xl max-h-[90vh] overflow-y-auto text-foreground border-border'>
        {/* Header with Account Badge */}
        <DialogHeader className='space-y-4 pb-6'>
          <div className='flex items-start justify-between'>
            <div className='space-y-2'>
              {formData.account && (
                <Badge
                  className={cn(
                    "text-sm font-medium px-4 py-2 rounded-lg border",
                    accountColors[
                      formData.account as keyof typeof accountColors
                    ]
                  )}
                >
                  {formData.account}
                </Badge>
              )}
              <DialogTitle className='text-2xl font-bold text-foreground mt-2'>
                {modalTitle}
              </DialogTitle>
              <DialogDescription className='text-muted-custom text-base'>
                {modalDescription}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='space-y-8'>
          {/* Row 1: Income Source + Contact */}
          <div className='grid grid-cols-2 gap-6'>
            {renderFormField({
              key: "category",
              label: `${
                currentModalType === "income"
                  ? "Income"
                  : currentModalType === "expense"
                  ? "Expense"
                  : currentModalType === "vat"
                  ? "VAT"
                  : currentModalType === "saving"
                  ? "Saving"
                  : "Transaction"
              } Source`,
              type: "text",
              placeholder: "Enter source name",
              required: true,
            })}
            {renderFormField({
              key: "contact",
              label: "Contact",
              type: "text",
              placeholder: "Enter contact number",
            })}
          </div>

          {/* Row 2: Client Name + Received Date */}
          <div className='grid grid-cols-2 gap-6'>
            {renderFormField({
              key: "name",
              label: "Client Name / Company",
              type: "text",
              placeholder: "Enter client or company name",
              required: true,
            })}
            {renderFormField({
              key: "date",
              label: "Received Date",
              type: "date",
            })}
          </div>

          {/* Row 3: Amount + Payment Method + Categories + Account */}
          <div className='grid grid-cols-4 gap-6'>
            {renderFormField({
              key: "amount",
              label: "Amount",
              type: "text",
              placeholder: "Enter amount (e.g., $4,652.00)",
              required: true,
            })}
            {renderFormField({
              key: "transaction",
              label: "Payment Method",
              type: "select",
              options: [
                { value: "Card", label: "Card" },
                { value: "Bank", label: "Bank Transfer" },
                { value: "Cash", label: "Cash" },
                { value: "Check", label: "Check" },
                { value: "Online", label: "Online Payment" },
              ],
            })}
            {renderFormField({
              key: "details",
              label: `${
                currentModalType === "income"
                  ? "Income"
                  : currentModalType === "expense"
                  ? "Expense"
                  : currentModalType === "vat"
                  ? "VAT"
                  : currentModalType === "saving"
                  ? "Saving"
                  : "Transaction"
              } Categories`,
              type: "select",
              options: [
                { value: "Buy Car", label: "Buy Car" },
                { value: "Salary", label: "Salary" },
                { value: "Freelance", label: "Freelance" },
                { value: "Investment", label: "Investment" },
                { value: "Other", label: "Other" },
              ],
            })}
            {renderFormField({
              key: "account",
              label: "Account",
              type: "select",
              options: [
                { value: "Income", label: "Income" },
                { value: "Expense", label: "Expense" },
                { value: "VAT", label: "VAT" },
                { value: "Saving", label: "Saving" },
              ],
            })}
          </div>

          {/* Row 4: Upload + Notes */}
          <div className='grid grid-cols-2 gap-6'>
            {renderFormField({
              key: "uploadProof",
              label: "Upload Proof (optional)",
              type: "file",
            })}
            {renderFormField({
              key: "notes",
              label: "Notes",
              type: "textarea",
              placeholder:
                "It's important to include a detailed note that captures the reasons behind the issuance of this bill. This note should serve as a reminder for you in the future, outlining the specific circumstances that led to this charge. Consider mentioning any relevant dates, services rendered, or agreements made that justify the bill. By doing so, you will have a clear reference point that can help clarify any questions or concerns that may arise later regarding this financial obligation.",
            })}
          </div>
        </div>

        <DialogFooter className='flex justify-end items-center pt-8 border-t border-gray-200 mt-8'>
          <div className='flex gap-4'>
            <Button
              variant='outline'
              onClick={handleClose}
              disabled={isLoading}
              className='px-8 py-2 bg-transparent border-gray-300 text-muted-custom hover:bg-gray-100 hover:text-foreground'
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className='px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white'
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  Saving...
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Save className='w-4 h-4' />
                  Save Changes
                </div>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

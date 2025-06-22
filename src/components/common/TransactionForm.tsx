"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import { Transaction } from "@/types/allTypes";
import { cn } from "@/lib/utils";

// TransactionForm component that accepts a 'type' prop
interface TransactionFormProps {
  type: string;
}

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const [formData, setFormData] = useState<Transaction | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([]);
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

  // Handle input changes
  const handleInputChange = (key: string) => {
    if (!formData) return;

    setFormData((prev) => ({
      ...prev!,
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

  console.log("Uploads file for add", uploadedFiles);

  return (
    <div>
      <Card className='bg-transparent'>
        <CardHeader>
          <CardTitle className='text-lg md:text-2xl'>
            Add {type} Details
          </CardTitle>
          <CardDescription className='text-[#a1a1a1] text-xs md:text-sm'>
            Let&apos;s take a moment to add your {type.toLowerCase()} so we can
            better understand your financial situation.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2 md:space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm md:text-base font-medium mb-2'>
                {type} Source
              </label>
              <Select>
                <SelectTrigger className='bg-transparent text-sm md:text-base border-border w-full'>
                  <SelectValue placeholder='Select a source' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='salary'>Salary</SelectItem>
                  <SelectItem value='freelance'>Freelance</SelectItem>
                  <SelectItem value='business'>Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className='block text-sm md:text-base font-medium mb-2'>
                Contact
              </label>
              <Input
                placeholder='0024654584'
                className='bg-transparent text-sm md:text-base border-border'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm md:text-base font-medium mb-2'>
                Client Name / Company
              </label>
              <Input
                placeholder='Enter client or company name'
                className='bg-transparent text-sm md:text-base border-border'
              />
            </div>
            <div>
              <label className='block text-sm md:text-base font-medium mb-2'>
                Received Date
              </label>
              <Input
                type='date'
                onChange={(e) => handleInputChange(e.target.value)}
                className={cn(
                  "bg-gray-50 border-gray-200 text-foreground",
                  "focus:border-blue-500 focus:ring-blue-500/20"
                  // hasError && "border-red-500 focus:border-red-500"
                )}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm md:text-base font-medium mb-2'>
                  Amount
                </label>
                <Input
                  placeholder='00.00'
                  className='bg-transparent text-sm md:text-base border-border'
                />
              </div>
              <div>
                <label className='block text-sm md:text-base font-medium mb-2'>
                  Payment Method
                </label>
                <Select>
                  <SelectTrigger className='bg-transparent text-sm md:text-base border-border w-full'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='cash'>Cash</SelectItem>
                    <SelectItem value='card'>Card</SelectItem>
                    <SelectItem value='transfer'>Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className='block text-sm md:text-base font-medium mb-2'>
                {type} Categories
              </label>
              <Select>
                <SelectTrigger className='bg-transparent text-sm md:text-base border-border w-full'>
                  <SelectValue placeholder='Select one' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='primary'>{type}</SelectItem>
                  <SelectItem value='secondary'>Secondary {type}</SelectItem>
                  <SelectItem value='passive'>Passive {type}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm md:text-base font-medium mb-2'>
                Upload Proof (optional)
              </label>
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
                        <span className='text-blue-600 font-medium'>
                          Browse
                        </span>
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
                          width={80}
                          height={80}
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
            </div>
            <div>
              <label className='block text-sm md:text-base font-medium mb-2'>
                Notes
              </label>
              <Textarea
                placeholder={`Add any additional details about this ${type.toLowerCase()}...`}
                className='bg-transparent text-sm md:text-base border-border h-28 md:h-40 resize-y'
              />
            </div>
          </div>
          <div className='w-full flex '>
            <Button className='bg-transparent right-0 text-black dark:text-white border border-gray-300 hover:bg-transparent cursor-pointer ml-auto'>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

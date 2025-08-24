// src/app/(dashboard)/components/PersonnelRecruitment/CompanyInformation.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Building2, ChevronRight, MapPin, Phone, Mail } from "lucide-react";

interface CompanyData {
  companyName: string;
  industry: string;
  customIndustry: string;
  businessAddress: string;
  contactPerson: string;
  email: string;
  phone: string;
  companySize: string;
  description: string;
  website: string;
}

interface CompanyInformationProps {
  onComplete: (completed: boolean) => void;
  onNext: () => void;
}

const industries = [
  "Restaurant & Food Service",
  "Retail & Sales",
  "Manufacturing",
  "Logistics & Transportation",
  "Hospitality & Tourism",
  "Healthcare",
  "Construction",
  "Agriculture",
  "Cleaning Services",
  "Security Services",
  "Other (Custom)",
];

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1000 employees",
  "1000+ employees",
];

export const CompanyInformation = ({
  onComplete,
  onNext,
}: CompanyInformationProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: "",
    industry: "",
    customIndustry: "",
    businessAddress: "",
    contactPerson: "",
    email: "",
    phone: "",
    companySize: "",
    description: "",
    website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof CompanyData, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!companyData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    const finalIndustry =
      companyData.industry === "Other (Custom)"
        ? companyData.customIndustry
        : companyData.industry;
    if (!finalIndustry.trim()) {
      newErrors.industry = "Industry is required";
    }

    if (!companyData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required";
    }
    if (!companyData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required";
    }
    if (!companyData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(companyData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!companyData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log("Company Information:", companyData);
      onComplete(true);
      onNext();
    }
  };

  // Check if form is complete
  useEffect(() => {
    const finalIndustry =
      companyData.industry === "Other (Custom)"
        ? companyData.customIndustry
        : companyData.industry;

    // Fix: Ensure the result is explicitly boolean
    const isComplete = Boolean(
      companyData.companyName.trim() &&
        finalIndustry.trim() &&
        companyData.businessAddress.trim() &&
        companyData.contactPerson.trim() &&
        companyData.email.trim() &&
        companyData.phone.trim()
    );

    onComplete(isComplete);
  }, [
    companyData.companyName,
    companyData.industry,
    companyData.customIndustry,
    companyData.businessAddress,
    companyData.contactPerson,
    companyData.email,
    companyData.phone,
    onComplete,
  ]);

  return (
    <Card className='border-border'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Building2 className='w-5 h-5 text-primary' />
          Company Information
        </CardTitle>
        <p className='text-muted-foreground'>
          Tell us about your company so we can find the best candidates for your
          needs
        </p>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Basic Company Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='companyName'>Company Name *</Label>
            <Input
              id='companyName'
              value={companyData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder='Enter your company name'
              className={`border-border ${
                errors.companyName ? "border-red-500" : ""
              }`}
              required
            />
            {errors.companyName && (
              <p className='text-sm text-red-500 mt-1'>{errors.companyName}</p>
            )}
          </div>

          <div>
            <Label htmlFor='industry'>Industry *</Label>
            <Select
              value={companyData.industry}
              onValueChange={(value) => updateField("industry", value)}
            >
              <SelectTrigger
                className={`border-border ${
                  errors.industry ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder='Select your industry' />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className='text-sm text-red-500 mt-1'>{errors.industry}</p>
            )}
          </div>
        </div>

        {/* Custom Industry Input */}
        {companyData.industry === "Other (Custom)" && (
          <div>
            <Label htmlFor='customIndustry'>Custom Industry *</Label>
            <Input
              id='customIndustry'
              value={companyData.customIndustry}
              onChange={(e) => updateField("customIndustry", e.target.value)}
              placeholder='Specify your industry'
              className='border-border'
              required
            />
          </div>
        )}

        {/* Address */}
        <div>
          <Label htmlFor='businessAddress'>Business Address *</Label>
          <div className='relative'>
            <MapPin className='absolute left-3 top-3 w-4 h-4 text-muted-foreground' />
            <Textarea
              id='businessAddress'
              value={companyData.businessAddress}
              onChange={(e) => updateField("businessAddress", e.target.value)}
              placeholder='Enter your complete business address including city and postal code'
              className={`pl-10 border-border ${
                errors.businessAddress ? "border-red-500" : ""
              }`}
              required
              rows={2}
            />
          </div>
          {errors.businessAddress && (
            <p className='text-sm text-red-500 mt-1'>
              {errors.businessAddress}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='contactPerson'>Contact Person *</Label>
            <Input
              id='contactPerson'
              value={companyData.contactPerson}
              onChange={(e) => updateField("contactPerson", e.target.value)}
              placeholder='Full name of hiring manager'
              className={`border-border ${
                errors.contactPerson ? "border-red-500" : ""
              }`}
              required
            />
            {errors.contactPerson && (
              <p className='text-sm text-red-500 mt-1'>
                {errors.contactPerson}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor='email'>Email Address *</Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                id='email'
                type='email'
                value={companyData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder='company@example.com'
                className={`pl-10 border-border ${
                  errors.email ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            {errors.email && (
              <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='phone'>Phone Number *</Label>
            <div className='relative'>
              <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                id='phone'
                type='tel'
                value={companyData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder='+39 XXX XXX XXXX'
                className={`pl-10 border-border ${
                  errors.phone ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            {errors.phone && (
              <p className='text-sm text-red-500 mt-1'>{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor='companySize'>Company Size</Label>
            <Select
              value={companyData.companySize}
              onValueChange={(value) => updateField("companySize", value)}
            >
              <SelectTrigger className='border-border'>
                <SelectValue placeholder='Select company size' />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Optional Fields */}
        <div>
          <Label htmlFor='website'>Website (Optional)</Label>
          <Input
            id='website'
            type='url'
            value={companyData.website}
            onChange={(e) => updateField("website", e.target.value)}
            placeholder='https://www.yourcompany.com'
            className='border-border'
          />
        </div>

        <div>
          <Label htmlFor='description'>Company Description (Optional)</Label>
          <Textarea
            id='description'
            value={companyData.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder='Brief description of your company, culture, and work environment...'
            className='border-border'
            rows={3}
          />
        </div>

        {/* Navigation */}
        <div className='flex justify-end pt-4'>
          <Button
            onClick={handleNext}
            className='bg-primary hover:bg-primary/90'
          >
            Continue to Job Profile
            <ChevronRight className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

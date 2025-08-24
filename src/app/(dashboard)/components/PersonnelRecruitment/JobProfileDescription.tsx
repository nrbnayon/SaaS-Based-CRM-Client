// src/app/(dashboard)/components/PersonnelRecruitment/JobProfileDescription.tsx
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
import { FileText, ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface JobProfileData {
  jobTitle: string;
  customJobTitle: string;
  jobDescription: string;
  keyResponsibilities: string[];
  requiredSkills: string[];
  preferredQualifications: string;
}

interface JobProfileDescriptionProps {
  onComplete: (completed: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const presetRoles = [
  "Waiter",
  "Bartender",
  "Gardener",
  "Warehouse Worker",
  "Sales Associate",
  "Customer Service Representative",
  "Administrative Assistant",
  "Security Guard",
  "Cleaning Staff",
  "Delivery Driver",
  "Kitchen Staff",
  "Receptionist",
  "Maintenance Technician",
  "Other (Custom)",
];

export const JobProfileDescription = ({
  onComplete,
  onNext,
  onPrevious,
}: JobProfileDescriptionProps) => {
  const [jobData, setJobData] = useState<JobProfileData>({
    jobTitle: "",
    customJobTitle: "",
    jobDescription: "",
    keyResponsibilities: [""],
    requiredSkills: [""],
    preferredQualifications: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof JobProfileData, value: unknown) => {
    setJobData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addResponsibility = () => {
    setJobData((prev) => ({
      ...prev,
      keyResponsibilities: [...prev.keyResponsibilities, ""],
    }));
  };

  const updateResponsibility = (index: number, value: string) => {
    setJobData((prev) => ({
      ...prev,
      keyResponsibilities: prev.keyResponsibilities.map((resp, i) =>
        i === index ? value : resp
      ),
    }));
  };

  const removeResponsibility = (index: number) => {
    if (jobData.keyResponsibilities.length > 1) {
      setJobData((prev) => ({
        ...prev,
        keyResponsibilities: prev.keyResponsibilities.filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  const addSkill = () => {
    setJobData((prev) => ({
      ...prev,
      requiredSkills: [...prev.requiredSkills, ""],
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setJobData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.map((skill, i) =>
        i === index ? value : skill
      ),
    }));
  };

  const removeSkill = (index: number) => {
    if (jobData.requiredSkills.length > 1) {
      setJobData((prev) => ({
        ...prev,
        requiredSkills: prev.requiredSkills.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const finalJobTitle =
      jobData.jobTitle === "Other (Custom)"
        ? jobData.customJobTitle
        : jobData.jobTitle;
    if (!finalJobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (!jobData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log("Job Profile Data:", jobData);
      onComplete(true);
      onNext();
    }
  };

  // Check if form is complete
  useEffect(() => {
    const finalJobTitle =
      jobData.jobTitle === "Other (Custom)"
        ? jobData.customJobTitle
        : jobData.jobTitle;
    const isComplete = Boolean(
      finalJobTitle.trim() && jobData.jobDescription.trim()
    );
    onComplete(isComplete);
  }, [
    jobData.jobTitle,
    jobData.customJobTitle,
    jobData.jobDescription,
    onComplete,
  ]);

  return (
    <Card className='border-border'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <FileText className='w-5 h-5 text-primary' />
          Job Profile Description
        </CardTitle>
        <p className='text-muted-foreground'>
          Define the role and requirements for the position you want to fill
        </p>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Job Title Selection */}
        <div className='space-y-4'>
          <div>
            <Label htmlFor='jobTitle'>Job Title *</Label>
            <Select
              value={jobData.jobTitle}
              onValueChange={(value) => updateField("jobTitle", value)}
            >
              <SelectTrigger
                className={`border-border ${
                  errors.jobTitle ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder='Select a job title' />
              </SelectTrigger>
              <SelectContent>
                {presetRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.jobTitle && (
              <p className='text-sm text-red-500 mt-1'>{errors.jobTitle}</p>
            )}
          </div>

          {/* Custom Job Title Input */}
          {jobData.jobTitle === "Other (Custom)" && (
            <div>
              <Label htmlFor='customJobTitle'>Custom Job Title *</Label>
              <Input
                id='customJobTitle'
                value={jobData.customJobTitle}
                onChange={(e) => updateField("customJobTitle", e.target.value)}
                placeholder='Enter custom job title'
                className='border-border'
                required
              />
            </div>
          )}
        </div>

        {/* Job Description */}
        <div>
          <Label htmlFor='jobDescription'>Job Description *</Label>
          <Textarea
            id='jobDescription'
            value={jobData.jobDescription}
            onChange={(e) => updateField("jobDescription", e.target.value)}
            placeholder='Provide a detailed description of the role, work environment, and what the candidate will be doing...'
            className={`border-border min-h-[120px] ${
              errors.jobDescription ? "border-red-500" : ""
            }`}
            required
          />
          {errors.jobDescription && (
            <p className='text-sm text-red-500 mt-1'>{errors.jobDescription}</p>
          )}
        </div>

        {/* Key Responsibilities */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label>Key Responsibilities</Label>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={addResponsibility}
            >
              <Plus className='w-4 h-4 mr-2' />
              Add Responsibility
            </Button>
          </div>

          <div className='space-y-2'>
            {jobData.keyResponsibilities.map((responsibility, index) => (
              <div key={index} className='flex items-center gap-2'>
                <Input
                  value={responsibility}
                  onChange={(e) => updateResponsibility(index, e.target.value)}
                  placeholder={`Responsibility ${index + 1}`}
                  className='border-border'
                />
                {jobData.keyResponsibilities.length > 1 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => removeResponsibility(index)}
                    className='text-red-500 hover:text-red-600 hover:bg-red-50'
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Required Skills */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label>Required Skills</Label>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={addSkill}
            >
              <Plus className='w-4 h-4 mr-2' />
              Add Skill
            </Button>
          </div>

          <div className='space-y-2'>
            {jobData.requiredSkills.map((skill, index) => (
              <div key={index} className='flex items-center gap-2'>
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder={`Required skill ${index + 1}`}
                  className='border-border'
                />
                {jobData.requiredSkills.length > 1 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => removeSkill(index)}
                    className='text-red-500 hover:text-red-600 hover:bg-red-50'
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Qualifications */}
        <div>
          <Label htmlFor='preferredQualifications'>
            Preferred Qualifications (Optional)
          </Label>
          <Textarea
            id='preferredQualifications'
            value={jobData.preferredQualifications}
            onChange={(e) =>
              updateField("preferredQualifications", e.target.value)
            }
            placeholder='Any preferred qualifications, certifications, or experience that would be beneficial...'
            className='border-border'
            rows={3}
          />
        </div>

        {/* Navigation Buttons */}
        <div className='flex justify-between pt-4'>
          <Button variant='outline' onClick={onPrevious}>
            <ChevronLeft className='w-4 h-4 mr-2' />
            Back to Company Info
          </Button>

          <Button
            onClick={handleNext}
            className='bg-primary hover:bg-primary/90'
          >
            Continue to Job Offer
            <ChevronRight className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

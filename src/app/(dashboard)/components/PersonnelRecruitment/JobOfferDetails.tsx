// src/app/(dashboard)/components/PersonnelRecruitment/JobOfferDetails.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  ChevronLeft,
  Send,
  Euro,
  Clock,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

interface JobOfferData {
  bonusBenefits: string;
  experienceLevel: number;
  proposedSalary: string;
  workingHours: string;
  workSchedule: string;
  dayOff: string;
  hasDayOff: boolean;
  specialRequirements: {
    languages: string[];
    driverLicense: boolean;
    driverLicenseType: string;
    other: string;
  };
  contractType: string;
  startDate: string;
  probationPeriod: string;
}

interface JobOfferDetailsProps {
  onComplete: (completed: boolean) => void;
  onPrevious: () => void;
  formProgress: {
    companyInfo: boolean;
    jobProfile: boolean;
    jobOffer: boolean;
  };
}

const experienceLevels = [
  { value: 1, label: "Entry Level (0-1 years)" },
  { value: 2, label: "Junior (1-3 years)" },
  { value: 3, label: "Mid-Level (3-5 years)" },
  { value: 4, label: "Senior (5-8 years)" },
  { value: 5, label: "Expert (8+ years)" },
];

const contractTypes = [
  "Full-time Permanent",
  "Part-time Permanent",
  "Fixed-term Contract",
  "Temporary",
  "Internship",
  "Freelance/Consultant",
];

const commonLanguages = [
  "Italian (Native)",
  "English",
  "Spanish",
  "French",
  "German",
  "Portuguese",
  "Russian",
  "Chinese",
  "Arabic",
];

export const JobOfferDetails = ({
  onComplete,
  onPrevious,
  formProgress,
}: JobOfferDetailsProps) => {
  const [offerData, setOfferData] = useState<JobOfferData>({
    bonusBenefits: "",
    experienceLevel: 1,
    proposedSalary: "",
    workingHours: "",
    workSchedule: "",
    dayOff: "",
    hasDayOff: false,
    specialRequirements: {
      languages: [],
      driverLicense: false,
      driverLicenseType: "",
      other: "",
    },
    contractType: "",
    startDate: "",
    probationPeriod: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof JobOfferData, value: unknown) => {
    setOfferData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateSpecialRequirement = (
    field: keyof JobOfferData["specialRequirements"],
    value: unknown
  ) => {
    setOfferData((prev) => ({
      ...prev,
      specialRequirements: {
        ...prev.specialRequirements,
        [field]: value,
      },
    }));
  };

  const addLanguage = (language: string) => {
    if (!offerData.specialRequirements.languages.includes(language)) {
      updateSpecialRequirement("languages", [
        ...offerData.specialRequirements.languages,
        language,
      ]);
    }
  };

  const removeLanguage = (language: string) => {
    updateSpecialRequirement(
      "languages",
      offerData.specialRequirements.languages.filter(
        (lang) => lang !== language
      )
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!offerData.proposedSalary.trim()) {
      newErrors.proposedSalary = "Proposed salary is required";
    }
    if (!offerData.workingHours.trim()) {
      newErrors.workingHours = "Working hours are required";
    }
    if (!offerData.contractType.trim()) {
      newErrors.contractType = "Contract type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRecruitmentRequest = async () => {
    if (!validateForm()) return;

    // Check if all previous steps are completed
    if (!formProgress.companyInfo || !formProgress.jobProfile) {
      toast.error("Please complete all previous steps first");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const recruitmentRequest = {
        jobOffer: offerData,
        submissionDate: new Date().toISOString(),
        status: "submitted",
        ticketId: `HR-${Date.now()}`,
        emailRecipient: "personale@agenziareduco.it",
      };

      console.log("Submitting recruitment request:", recruitmentRequest);

      toast.success("Recruitment request submitted!", {
        description:
          "Your request has been sent to personale@agenziareduco.it. You'll receive a confirmation shortly.",
      });

      onComplete(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is complete
  useEffect(() => {
    const isComplete = Boolean(
      offerData.proposedSalary.trim() &&
        offerData.workingHours.trim() &&
        offerData.contractType.trim()
    );
    onComplete(isComplete);
  }, [
    offerData.proposedSalary,
    offerData.workingHours,
    offerData.contractType,
    onComplete,
  ]);

  return (
    <Card className='border-border'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Briefcase className='w-5 h-5 text-primary' />
          Job Offer Details
        </CardTitle>
        <p className='text-muted-foreground'>
          Specify the compensation, benefits, and requirements for this position
        </p>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Compensation */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-foreground'>
            Compensation & Benefits
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='proposedSalary'>Proposed Net Salary *</Label>
              <div className='relative'>
                <Euro className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  id='proposedSalary'
                  value={offerData.proposedSalary}
                  onChange={(e) =>
                    updateField("proposedSalary", e.target.value)
                  }
                  placeholder='e.g., 1,500 per month'
                  className={`pl-10 border-border ${
                    errors.proposedSalary ? "border-error" : ""
                  }`}
                  required
                />
              </div>
              {errors.proposedSalary && (
                <p className='text-sm text-error mt-1'>
                  {errors.proposedSalary}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='contractType'>Contract Type *</Label>
              <Select
                value={offerData.contractType}
                onValueChange={(value) => updateField("contractType", value)}
              >
                <SelectTrigger
                  className={`border-border ${
                    errors.contractType ? "border-error" : ""
                  }`}
                >
                  <SelectValue placeholder='Select contract type' />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.contractType && (
                <p className='text-sm text-error mt-1'>{errors.contractType}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor='bonusBenefits'>Bonus/Benefits (Optional)</Label>
            <Textarea
              id='bonusBenefits'
              value={offerData.bonusBenefits}
              onChange={(e) => updateField("bonusBenefits", e.target.value)}
              placeholder='Describe any additional benefits, bonuses, or perks (meal vouchers, health insurance, performance bonuses, etc.)'
              className='border-border'
              rows={3}
            />
          </div>
        </div>

        {/* Work Schedule */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-foreground'>
            Work Schedule
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='workingHours'>Working Hours *</Label>
              <div className='relative'>
                <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  id='workingHours'
                  value={offerData.workingHours}
                  onChange={(e) => updateField("workingHours", e.target.value)}
                  placeholder='e.g., 9:00 AM - 6:00 PM'
                  className={`pl-10 border-border ${
                    errors.workingHours ? "border-error" : ""
                  }`}
                  required
                />
              </div>
              {errors.workingHours && (
                <p className='text-sm text-error mt-1'>{errors.workingHours}</p>
              )}
            </div>

            <div>
              <Label htmlFor='workSchedule'>Work Schedule</Label>
              <Input
                id='workSchedule'
                value={offerData.workSchedule}
                onChange={(e) => updateField("workSchedule", e.target.value)}
                placeholder='e.g., Monday to Friday, Rotating shifts'
                className='border-border'
              />
            </div>
          </div>

          <div className='space-y-3'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='hasDayOff'
                checked={offerData.hasDayOff}
                onCheckedChange={(checked) => updateField("hasDayOff", checked)}
              />
              <Label htmlFor='hasDayOff' className='mb-0'>
                Specific day off requirements
              </Label>
            </div>

            {offerData.hasDayOff && (
              <div>
                <Label htmlFor='dayOff'>Day Off Details</Label>
                <Input
                  id='dayOff'
                  value={offerData.dayOff}
                  onChange={(e) => updateField("dayOff", e.target.value)}
                  placeholder='e.g., Sundays, Weekends, Flexible'
                  className='border-border'
                />
              </div>
            )}
          </div>
        </div>

        {/* Experience & Start Date */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-foreground'>
            Experience & Timeline
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <Label htmlFor='experienceLevel'>
                Required Experience Level (1-5)
              </Label>
              <Select
                value={offerData.experienceLevel.toString()}
                onValueChange={(value) =>
                  updateField("experienceLevel", parseInt(value))
                }
              >
                <SelectTrigger className='border-border'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem
                      key={level.value}
                      value={level.value.toString()}
                    >
                      {level.value} - {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='startDate'>Preferred Start Date</Label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  id='startDate'
                  type='date'
                  value={offerData.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  className='pl-10 border-border'
                />
              </div>
            </div>

            <div>
              <Label htmlFor='probationPeriod'>Probation Period</Label>
              <Input
                id='probationPeriod'
                value={offerData.probationPeriod}
                onChange={(e) => updateField("probationPeriod", e.target.value)}
                placeholder='e.g., 3 months'
                className='border-border'
              />
            </div>
          </div>
        </div>

        {/* Special Requirements */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-foreground'>
            Special Requirements
          </h3>

          {/* Languages */}
          <div>
            <Label>Required Languages</Label>
            <div className='space-y-2'>
              <Select onValueChange={addLanguage}>
                <SelectTrigger className='border-border'>
                  <SelectValue placeholder='Add a language requirement' />
                </SelectTrigger>
                <SelectContent>
                  {commonLanguages
                    .filter(
                      (lang) =>
                        !offerData.specialRequirements.languages.includes(lang)
                    )
                    .map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {offerData.specialRequirements.languages.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {offerData.specialRequirements.languages.map((language) => (
                    <Badge
                      key={language}
                      variant='secondary'
                      className='cursor-pointer hover:bg-red-100 hover:text-red-600'
                      onClick={() => removeLanguage(language)}
                    >
                      {language} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Driver License */}
          <div className='space-y-3'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='driverLicense'
                checked={offerData.specialRequirements.driverLicense}
                onCheckedChange={(checked) =>
                  updateSpecialRequirement("driverLicense", checked)
                }
              />
              <Label htmlFor='driverLicense' className='mb-0'>
                Driver&apos;s License Required
              </Label>
            </div>

            {offerData.specialRequirements.driverLicense && (
              <div>
                <Label htmlFor='driverLicenseType'>License Type</Label>
                <Select
                  value={offerData.specialRequirements.driverLicenseType}
                  onValueChange={(value) =>
                    updateSpecialRequirement("driverLicenseType", value)
                  }
                >
                  <SelectTrigger className='border-border'>
                    <SelectValue placeholder='Select license type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='B'>Category B (Car)</SelectItem>
                    <SelectItem value='C'>Category C (Truck)</SelectItem>
                    <SelectItem value='D'>Category D (Bus)</SelectItem>
                    <SelectItem value='BE'>
                      Category BE (Car + Trailer)
                    </SelectItem>
                    <SelectItem value='CE'>
                      Category CE (Truck + Trailer)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Other Requirements */}
          <div>
            <Label htmlFor='otherRequirements'>
              Other Special Requirements
            </Label>
            <Textarea
              id='otherRequirements'
              value={offerData.specialRequirements.other}
              onChange={(e) =>
                updateSpecialRequirement("other", e.target.value)
              }
              placeholder='Any other specific requirements (certifications, physical requirements, security clearance, etc.)'
              className='border-border'
              rows={3}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className='flex justify-between pt-6 border-t border-border'>
          <Button variant='outline' onClick={onPrevious}>
            <ChevronLeft className='w-4 h-4 mr-2' />
            Back to Job Profile
          </Button>

          <Button
            onClick={submitRecruitmentRequest}
            disabled={
              isSubmitting ||
              !formProgress.companyInfo ||
              !formProgress.jobProfile
            }
            className='bg-green-600 hover:bg-green-700'
          >
            {isSubmitting ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                Submitting...
              </>
            ) : (
              <>
                <Send className='w-4 h-4 mr-2' />
                Submit Recruitment Request
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

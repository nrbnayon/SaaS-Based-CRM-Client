// src/app/(dashboard)/components/PersonnelRecruitment/PersonnelRecruitmentPage.tsx
"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyInformation } from "./CompanyInformation";
import { JobProfileDescription } from "./JobProfileDescription";
import { JobOfferDetails } from "./JobOfferDetails";
import { RecruitmentRequests } from "./RecruitmentRequests";
import { Building2, FileText, Briefcase, History } from "lucide-react";

export const PersonnelRecruitmentPage = () => {
  const [activeTab, setActiveTab] = useState("company-info");
  const [formProgress, setFormProgress] = useState({
    companyInfo: false,
    jobProfile: false,
    jobOffer: false,
  });

  const updateProgress = useCallback(
    (step: keyof typeof formProgress, completed: boolean) => {
      setFormProgress((prev) => ({ ...prev, [step]: completed }));
    },
    []
  );

  const handleCompanyInfoComplete = useCallback(
    (completed: boolean) => {
      updateProgress("companyInfo", completed);
    },
    [updateProgress]
  );

  const handleJobProfileComplete = useCallback(
    (completed: boolean) => {
      updateProgress("jobProfile", completed);
    },
    [updateProgress]
  );

  const handleJobOfferComplete = useCallback(
    (completed: boolean) => {
      updateProgress("jobOffer", completed);
    },
    [updateProgress]
  );

  const goToJobProfile = useCallback(() => setActiveTab("job-profile"), []);
  const goToCompanyInfo = useCallback(() => setActiveTab("company-info"), []);
  const goToJobOffer = useCallback(() => setActiveTab("job-offer"), []);

  return (
    <div className='p-4 space-y-6'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-foreground mb-2'>
          Personnel Recruitment
        </h1>
        <p className='text-muted-foreground'>
          Submit your hiring requirements and let our HR team find the perfect
          candidates
        </p>
      </div>

      {/* Progress Indicator */}
      <Card className='border-border bg-blue-50 dark:bg-blue-950/20'>
        <CardContent className='p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div
                className={`w-3 h-3 rounded-full ${
                  formProgress.companyInfo ? "bg-green-600" : "bg-gray-300"
                }`}
              />
              <span className='text-sm'>Company Info</span>
              <div
                className={`w-3 h-3 rounded-full ${
                  formProgress.jobProfile ? "bg-green-600" : "bg-gray-300"
                }`}
              />
              <span className='text-sm'>Job Profile</span>
              <div
                className={`w-3 h-3 rounded-full ${
                  formProgress.jobOffer ? "bg-green-600" : "bg-gray-300"
                }`}
              />
              <span className='text-sm'>Job Offer</span>
            </div>
            <div className='text-sm text-muted-foreground'>
              {Object.values(formProgress).filter(Boolean).length}/3 Steps
              Completed
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-4 bg-background border border-border'>
          <TabsTrigger
            value='company-info'
            className='flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
          >
            <Building2 className='w-4 h-4' />
            <span className='hidden sm:inline'>Company Info</span>
            {formProgress.companyInfo && (
              <div className='w-2 h-2 bg-green-600 rounded-full ml-1' />
            )}
          </TabsTrigger>
          <TabsTrigger
            value='job-profile'
            className='flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
          >
            <FileText className='w-4 h-4' />
            <span className='hidden sm:inline'>Job Profile</span>
            {formProgress.jobProfile && (
              <div className='w-2 h-2 bg-green-600 rounded-full ml-1' />
            )}
          </TabsTrigger>
          <TabsTrigger
            value='job-offer'
            className='flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
          >
            <Briefcase className='w-4 h-4' />
            <span className='hidden sm:inline'>Job Offer</span>
            {formProgress.jobOffer && (
              <div className='w-2 h-2 bg-green-600 rounded-full ml-1' />
            )}
          </TabsTrigger>
          <TabsTrigger
            value='requests'
            className='flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
          >
            <History className='w-4 h-4' />
            <span className='hidden sm:inline'>Requests</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='company-info' className='mt-6'>
          <CompanyInformation
            onComplete={handleCompanyInfoComplete}
            onNext={goToJobProfile}
          />
        </TabsContent>

        <TabsContent value='job-profile' className='mt-6'>
          <JobProfileDescription
            onComplete={handleJobProfileComplete}
            onNext={goToJobOffer}
            onPrevious={goToCompanyInfo}
          />
        </TabsContent>

        <TabsContent value='job-offer' className='mt-6'>
          <JobOfferDetails
            onComplete={handleJobOfferComplete}
            onPrevious={goToJobProfile}
            formProgress={formProgress}
          />
        </TabsContent>

        <TabsContent value='requests' className='mt-6'>
          <RecruitmentRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};

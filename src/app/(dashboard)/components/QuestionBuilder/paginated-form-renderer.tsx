"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { FormData, Question } from "@/types/form";

interface PaginatedFormRendererProps {
  formData: FormData;
  onSubmit: (responses: Record<string, string | string[]>) => void;
  questionsPerPage?: number;
  className?: string;
}

export function PaginatedFormRenderer({
  formData,
  onSubmit,
  questionsPerPage = 4,
  className,
}: PaginatedFormRendererProps) {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(formData.questions.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(
    startIndex + questionsPerPage,
    formData.questions.length
  );
  const currentQuestions = formData.questions.slice(startIndex, endIndex);

  const answeredQuestions = Object.keys(responses).filter((questionId) => {
    const response = responses[questionId];
    return (
      response &&
      ((typeof response === "string" && response.trim() !== "") ||
        (Array.isArray(response) && response.length > 0))
    );
  }).length;

  const progressPercentage =
    formData.questions.length > 0
      ? Math.round((answeredQuestions / formData.questions.length) * 100)
      : 0;

  const updateResponse = (questionId: string, value: string | string[]) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateCurrentPage = (): boolean => {
    const newErrors: Record<string, string> = {};

    currentQuestions.forEach((question) => {
      if (question.required) {
        const response = responses[question.id];
        if (
          !response ||
          (typeof response === "string" && response.trim() === "") ||
          (Array.isArray(response) && response.length === 0)
        ) {
          newErrors[question.id] = "This field is required";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentPage() && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentPage()) {
      onSubmit(responses);
    }
  };

  const renderQuestion = (question: Question, questionNumber: number) => {
    const hasError = !!errors[question.id];

    switch (question.type) {
      case "SHORT_ANSWER":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-foreground text-lg font-medium">
                Question {questionNumber}
              </h3>
              <p className="text-foreground text-base">
                {question.title}
                {question.required && (
                  <span className="text-red-400 ml-1">*</span>
                )}
              </p>
            </div>
            <Input
              value={(responses[question.id] as string) || ""}
              onChange={(e) => updateResponse(question.id, e.target.value)}
              placeholder="Your answer"
              className={`bg-white/10 text-foreground placeholder:text-foreground/60 border border-border ${
                hasError ? "border-red-400" : ""
              }`}
            />
            {hasError && (
              <div className="flex items-center text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[question.id]}
              </div>
            )}
          </div>
        );

      case "PARAGRAPH":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-foreground text-lg font-medium">
                Question {questionNumber}
              </h3>
              <p className="text-foreground text-base">
                {question.title}
                {question.required && (
                  <span className="text-red-400 ml-1">*</span>
                )}
              </p>
            </div>
            <Textarea
              value={(responses[question.id] as string) || ""}
              onChange={(e) => updateResponse(question.id, e.target.value)}
              placeholder="Your answer"
              rows={4}
              className={`bg-white/10 border border-border text-foreground placeholder:text-foreground/60 ${
                hasError ? "border-red-400" : ""
              }`}
            />
            {hasError && (
              <div className="flex items-center text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[question.id]}
              </div>
            )}
          </div>
        );

      case "MULTIPLE_CHOICE":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-foreground text-lg font-medium">
                Question {questionNumber}
              </h3>
              <p className="text-foreground text-base">
                {question.title}
                {question.required && (
                  <span className="text-red-400 ml-1">*</span>
                )}
              </p>
            </div>
            <RadioGroup
              value={(responses[question.id] as string) || ""}
              onValueChange={(value) => updateResponse(question.id, value)}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={option.label}
                    id={`${question.id}-${option.id}`}
                    className=" text-foreground data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label
                    htmlFor={`${question.id}-${option.id}`}
                    className="text-foreground text-base cursor-pointer flex-1"
                  >
                    A. {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {hasError && (
              <div className="flex items-center text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[question.id]}
              </div>
            )}
          </div>
        );

      case "CHECKBOX":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-foreground text-lg font-medium">
                Question {questionNumber}
              </h3>
              <p className="text-foreground text-base">
                {question.title}
                {question.required && (
                  <span className="text-red-400 ml-1">*</span>
                )}
              </p>
            </div>
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${question.id}-${option.id}`}
                    checked={(
                      (responses[question.id] as string[]) || []
                    ).includes(option.label)}
                    onCheckedChange={(checked) => {
                      const currentValues =
                        (responses[question.id] as string[]) || [];
                      if (checked) {
                        updateResponse(question.id, [
                          ...currentValues,
                          option.label,
                        ]);
                      } else {
                        updateResponse(
                          question.id,
                          currentValues.filter((v) => v !== option.label)
                        );
                      }
                    }}
                    className=" data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label
                    htmlFor={`${question.id}-${option.id}`}
                    className="text-foreground text-base cursor-pointer flex-1"
                  >
                    A. {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {hasError && (
              <div className="flex items-center text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[question.id]}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!formData.title && formData.questions.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No form to preview
            </h3>
            <p className="text-gray-500">
              Add a title and questions to see the preview
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>{formData.title || "Untitled Form"}</CardTitle>
            <div className="text-sm text-gray-500 font-medium">
              {answeredQuestions}/{formData.questions.length} questions answered
            </div>
          </div>

          {formData.description && (
            <p className="">{formData.description}</p>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="">Progress</span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Page Indicator */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                Questions {startIndex + 1}-{endIndex} of{" "}
                {formData.questions.length}
              </span>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* {currentQuestions.map((question, index) => (
            <div key={question.id} className="space-y-4">
              <div className="flex items-start space-x-2">
                <span className="text-sm font-medium text-gray-500 mt-1 min-w-[2rem]">
                  {startIndex + index + 1}.
                </span>
                <div className="flex-1">{renderQuestion(question)}</div>
              </div>
            </div>
          ))} */}
          {currentQuestions.map((question, index) => (
            <div key={question.id} className="pb-8">
              {renderQuestion(question, startIndex + index + 1)}
            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="text-sm text-gray-500">
              Page {currentPage + 1} of {totalPages}
            </div>

            {currentPage < totalPages - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button type="submit">Submit Form</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

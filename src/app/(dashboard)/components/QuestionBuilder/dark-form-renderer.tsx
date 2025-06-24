"use client";

import type React from "react";
import { useState } from "react";
import type { FormData, Question } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface DarkFormRendererProps {
  formData: FormData;
  onSubmit: (responses: Record<string, string | string[]>) => void;
  questionsPerPage?: number;
  className?: string;
}

export function DarkFormRenderer({
  formData,
  onSubmit,
  questionsPerPage = 4,
  className,
}: DarkFormRendererProps) {
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
              <h3 className="text-white text-lg font-medium">
                Question {questionNumber}
              </h3>
              <p className="text-white text-base">
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
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${
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
              <h3 className="text-white text-lg font-medium">
                Question {questionNumber}
              </h3>
              <p className="text-white text-base">
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
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${
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
              <h3 className="text-white text-lg font-medium">
                Question {questionNumber}
              </h3>
              <p className="text-white text-base">
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
                    className="border-white/40 text-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label
                    htmlFor={`${question.id}-${option.id}`}
                    className="text-white text-base cursor-pointer flex-1"
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
              <h3 className="text-white text-lg font-medium">
                Question {questionNumber}
              </h3>
              <p className="text-white text-base">
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
                    className="border-white/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label
                    htmlFor={`${question.id}-${option.id}`}
                    className="text-white text-base cursor-pointer flex-1"
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
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 ${className}`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-white mb-2">
              No form to preview
            </h3>
            <p className="text-white/60">
              Add a title and questions to see the preview
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold">
            {formData.title || "Untitled Form"}
          </h1>
          <div className="bg-white rounded-full px-4 py-2">
            <span className="text-slate-900 font-bold text-lg">
              {answeredQuestions}/{formData.questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress
            value={progressPercentage}
            className="h-2 bg-white/20"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {currentQuestions.map((question, index) => (
            <div key={question.id} className="pb-8">
              {renderQuestion(question, startIndex + index + 1)}
            </div>
          ))}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="text-white/60 text-sm">
              Page {currentPage + 1} of {totalPages}
            </div>

            {currentPage < totalPages - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Form
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface FormRendererProps {
  formData: FormData;
  onSubmit: (responses: Record<string, string | string[]>) => void;
  className?: string;
}

export function FormRenderer({
  formData,
  onSubmit,
  className,
}: FormRendererProps) {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    formData.questions.forEach((question) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(responses);
    }
  };

  const renderQuestion = (question: Question) => {
    const hasError = !!errors[question.id];

    switch (question.type) {
      case "SHORT_ANSWER":
        return (
          <div className="space-y-2">
            <Label htmlFor={question.id} className="flex items-center">
              {question.title}
              {question.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
              {question.marks && (
                <span className="text-sm text-gray-500 ml-2">
                  ({question.marks} marks)
                </span>
              )}
            </Label>
            <Input
              id={question.id}
              value={(responses[question.id] as string) || ""}
              onChange={(e) => updateResponse(question.id, e.target.value)}
              placeholder="Your answer"
              className={hasError ? "border-red-500" : ""}
            />
            {hasError && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[question.id]}
              </div>
            )}
          </div>
        );

      case "PARAGRAPH":
        return (
          <div className="space-y-2">
            <Label htmlFor={question.id} className="flex items-center">
              {question.title}
              {question.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
              {question.marks && (
                <span className="text-sm text-gray-500 ml-2">
                  ({question.marks} marks)
                </span>
              )}
            </Label>
            <Textarea
              id={question.id}
              value={(responses[question.id] as string) || ""}
              onChange={(e) => updateResponse(question.id, e.target.value)}
              placeholder="Your answer"
              rows={4}
              className={hasError ? "border-red-500" : ""}
            />
            {hasError && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[question.id]}
              </div>
            )}
          </div>
        );

      case "MULTIPLE_CHOICE":
        return (
          <div className="space-y-3">
            <Label className="flex items-center">
              {question.title}
              {question.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
              {question.marks && (
                <span className="text-sm text-gray-500 ml-2">
                  ({question.marks} marks)
                </span>
              )}
            </Label>
            <RadioGroup
              value={(responses[question.id] as string) || ""}
              onValueChange={(value) => updateResponse(question.id, value)}
              className={hasError ? "border border-red-500 rounded-md p-2" : ""}
            >
              {question.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.label}
                    id={`${question.id}-${option.id}`}
                  />
                  <Label htmlFor={`${question.id}-${option.id}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {hasError && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors[question.id]}
              </div>
            )}
          </div>
        );

      case "CHECKBOX":
        return (
          <div className="space-y-3">
            <Label className="flex items-center">
              {question.title}
              {question.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
              {question.marks && (
                <span className="text-sm text-gray-500 ml-2">
                  ({question.marks} marks)
                </span>
              )}
            </Label>
            <div
              className={`space-y-2 ${
                hasError ? "border border-red-500 rounded-md p-2" : ""
              }`}
            >
              {question.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
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
                  />
                  <Label htmlFor={`${question.id}-${option.id}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {hasError && (
              <div className="flex items-center text-red-500 text-sm">
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
        <CardTitle>{formData.title || "Untitled Form"}</CardTitle>
        {formData.description && (
          <p className="text-gray-600">{formData.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formData.questions.map((question) => (
            <div key={question.id}>{renderQuestion(question)}</div>
          ))}

          {formData.questions.length > 0 && (
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Submit Form
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

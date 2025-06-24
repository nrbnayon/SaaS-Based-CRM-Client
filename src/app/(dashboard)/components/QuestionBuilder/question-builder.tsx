"use client";

import { useState, useEffect } from "react";
import type { FormData, Question, QuestionType } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionEditor } from "./question-editor";
import { Plus, Eye, Save, Upload, Trash2 } from "lucide-react";
import {
  generateId,
  createEmptyQuestion,
  duplicateQuestion,
  getSampleFormData,
} from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaginatedFormRenderer } from "./paginated-form-renderer";

interface QuestionBuilderProps {
  initialData?: FormData;
  onSave?: (formData: FormData) => void;
  className?: string;
}

export function QuestionBuilder({
  initialData,
  onSave,
  className,
}: QuestionBuilderProps) {
  const [formData, setFormData] = useState<FormData>(
    () =>
      initialData || {
        id: generateId(),
        title: "",
        description: "",
        questions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  );

  const [activeTab, setActiveTab] = useState<"build" | "preview">("build");

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSave && (formData.title || formData.questions.length > 0)) {
        onSave({ ...formData, updatedAt: new Date() });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, onSave]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const addQuestion = (type: QuestionType) => {
    const newQuestion = createEmptyQuestion(type);
    updateFormData({
      questions: [...formData.questions, newQuestion],
    });
  };

  const updateQuestion = (questionId: string, updatedQuestion: Question) => {
    updateFormData({
      questions: formData.questions.map((q) =>
        q.id === questionId ? updatedQuestion : q
      ),
    });
  };

  const deleteQuestion = (questionId: string) => {
    updateFormData({
      questions: formData.questions.filter((q) => q.id !== questionId),
    });
  };

  const duplicateQuestionHandler = (questionId: string) => {
    const question = formData.questions.find((q) => q.id === questionId);
    if (question) {
      const duplicated = duplicateQuestion(question);
      const questionIndex = formData.questions.findIndex(
        (q) => q.id === questionId
      );
      const newQuestions = [...formData.questions];
      newQuestions.splice(questionIndex + 1, 0, duplicated);
      updateFormData({ questions: newQuestions });
    }
  };

  const loadSampleData = () => {
    const sampleData = getSampleFormData();
    setFormData(sampleData);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...formData, updatedAt: new Date() });
    }
  };

  const questionTypes: { value: QuestionType; label: string }[] = [
    { value: "SHORT_ANSWER", label: "Short Answer" },
    { value: "PARAGRAPH", label: "Paragraph" },
    { value: "MULTIPLE_CHOICE", label: "Multiple Choice" },
    { value: "CHECKBOX", label: "Checkbox" },
  ];

  return (
    <div className={className}>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "build" | "preview")}
      >
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="build">Build</TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-4">
            {/* Saved/Clear Draft Buttons */}
            <div className="flex items-center space-x-2">
              {/* <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700"
              >
                <Save className="h-4 w-4 mr-1" />
                Saved
              </Button> */}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-700"
                onClick={() => {
                  setFormData({
                    id: generateId(),
                    title: "",
                    description: "",
                    questions: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  });
                }}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Draft
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={loadSampleData}>
                <Upload className="h-4 w-4 mr-1" />
                Load Sample
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save Form
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="build" className="space-y-6">
          {/* Form Header */}
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  placeholder="Enter form title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="form-description">Description (Optional)</Label>
                <Textarea
                  id="form-description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    updateFormData({ description: e.target.value })
                  }
                  placeholder="Enter form description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-4">
            {formData.questions.map((question) => (
              <QuestionEditor
                key={question.id}
                question={question}
                onUpdate={(updatedQuestion) =>
                  updateQuestion(question.id, updatedQuestion)
                }
                onDelete={() => deleteQuestion(question.id)}
                onDuplicate={() => duplicateQuestionHandler(question.id)}
              />
            ))}
          </div>

          {/* Add Question - New Design */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  Add Questions ({formData.questions.length})
                </h3>
                <div className="flex items-center space-x-2">
                  {questionTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant="outline"
                      size="sm"
                      onClick={() => addQuestion(type.value)}
                      className="text-sm"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {formData.questions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No questions added yet</p>
                  <Button
                    onClick={() => addQuestion("SHORT_ANSWER")}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Question
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <PaginatedFormRenderer
            formData={formData}
            onSubmit={(responses) => {
              console.log("Form submitted:", responses);
              alert(
                "Form submitted successfully! Check console for responses."
              );
            }}
            questionsPerPage={4}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

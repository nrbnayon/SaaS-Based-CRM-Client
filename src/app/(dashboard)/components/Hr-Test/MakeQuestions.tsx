"use client";

import { useState } from "react";
import { QuestionBuilder } from "../QuestionBuilder/question-builder";
import { QuestionBuilderModal } from "../QuestionBuilder/question-builder-modal";
import type { FormData } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Eye, Trash2 } from "lucide-react";
import { PaginatedFormRenderer } from "../QuestionBuilder/paginated-form-renderer";

export default function MakeQuestions() {
  const [savedForms, setSavedForms] = useState<FormData[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);

  const handleSaveForm = (formData: FormData) => {
    setSavedForms((prev) => {
      const existingIndex = prev.findIndex((f) => f.id === formData.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = formData;
        return updated;
      }
      return [...prev, formData];
    });
    console.log("Form saved:", formData);
  };

  const handleDeleteForm = (formId: string) => {
    setSavedForms((prev) => prev.filter((f) => f.id !== formId));
    if (selectedForm?.id === formId) {
      setSelectedForm(null);
    }
  };

  const handleFormSubmission = (
    formId: string,
    responses: Record<string, string | string[]>
  ) => {
    console.log("Form submission:", { formId, responses });
    alert("Form submitted successfully! Check console for details.");
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Dynamic Question Builder</h1>
        <p className="text-xl text-gray-600">
          Create, edit, and manage forms dynamically with real-time preview
        </p>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">Form Builder</TabsTrigger>
          <TabsTrigger value="saved">
            Saved Forms ({savedForms.length})
          </TabsTrigger>
          <TabsTrigger value="modal">Modal Demo</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <QuestionBuilder onSave={handleSaveForm} />
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Saved Forms</h2>
            <QuestionBuilderModal
              onSave={handleSaveForm}
              trigger={
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Form
                </Button>
              }
            />
          </div>

          {savedForms.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No forms saved yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Create your first form to get started
                  </p>
                  <QuestionBuilderModal onSave={handleSaveForm} />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedForms.map((form) => (
                <Card
                  key={form.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {form.title || "Untitled Form"}
                    </CardTitle>
                    {form.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {form.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{form.questions.length} questions</span>
                      <span>
                        {new Date(form.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <QuestionBuilderModal
                        initialData={form}
                        onSave={handleSaveForm}
                        title={`Edit: ${form.title}`}
                        trigger={
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Edit
                          </Button>
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedForm(form)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteForm(form.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedForm && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  Form Preview: {selectedForm.title}
                </h3>
                <Button variant="outline" onClick={() => setSelectedForm(null)}>
                  Close Preview
                </Button>
              </div>
              <PaginatedFormRenderer
                formData={selectedForm}
                onSubmit={(responses) =>
                  handleFormSubmission(selectedForm.id, responses)
                }
                questionsPerPage={4}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="modal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modal Integration Demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                The question builder can be easily integrated as a modal
                component in your application.
              </p>
              <div className="flex space-x-4">
                <QuestionBuilderModal
                  onSave={handleSaveForm}
                  title="Create New Form"
                />
                <QuestionBuilderModal
                  onSave={handleSaveForm}
                  title="Edit Existing Form"
                  initialData={savedForms[0]}
                  trigger={
                    <Button
                      variant="outline"
                      disabled={savedForms.length === 0}
                    >
                      Edit First Form
                    </Button>
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

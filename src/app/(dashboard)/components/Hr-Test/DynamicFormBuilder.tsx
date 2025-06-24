'use client';
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Copy, Edit, Save, X, Upload } from "lucide-react";

// Types
type QuestionType =
  | "SHORT_ANSWER"
  | "PARAGRAPH"
  | "MULTIPLE_CHOICE"
  | "CHECKBOX";

interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
  answer?: string | string[];
  marks?: number;
}

interface FormData {
  title: string;
  description?: string;
  questions: Question[];
}

interface FormAnswers {
  [questionId: string]: string | string[];
}

// Sample data
const sampleFormData: FormData = {
  title: "Customer Feedback Survey",
  description: "Help us improve our services by sharing your feedback",
  questions: [
    {
      id: "1",
      title: "What is your full name?",
      type: "SHORT_ANSWER",
      required: true,
      answer: "John Doe",
      marks: 1,
    },
    {
      id: "2",
      title: "Please describe your experience with our service.",
      type: "PARAGRAPH",
      required: true,
      answer: "The service was excellent and met all my expectations.",
      marks: 5,
    },
    {
      id: "3",
      title: "How did you hear about us?",
      type: "MULTIPLE_CHOICE",
      options: ["Facebook", "Google", "Friend", "Other"],
      required: true,
      answer: "Google",
      marks: 2,
    },
    {
      id: "4",
      title: "Which features do you use?",
      type: "CHECKBOX",
      options: ["Search", "Dashboard", "Notifications"],
      required: false,
      answer: ["Search", "Dashboard"],
      marks: 3,
    },
  ],
};

const DynamicFormBuilder: React.FC = () => {
  const [mode, setMode] = useState<"builder" | "preview">("builder");
  const [formData, setFormData] = useState<FormData>({
    title: "New Form",
    description: "",
    questions: [],
  });
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate unique ID
  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Load sample data
  const loadSampleData = () => {
    setFormData(sampleFormData);
    setAnswers({});
  };

  // Add new question
  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: generateId(),
      title: `New ${type.replace("_", " ").toLowerCase()} question`,
      type,
      options:
        type === "MULTIPLE_CHOICE" || type === "CHECKBOX"
          ? ["Option 1"]
          : undefined,
      required: false,
      marks: 1,
    };

    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setEditingQuestion(newQuestion.id);
  };

  // Update question
  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    }));
  };

  // Delete question
  const deleteQuestion = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
    setEditingQuestion(null);
  };

  // Duplicate question
  const duplicateQuestion = (id: string) => {
    const question = formData.questions.find((q) => q.id === id);
    if (question) {
      const newQuestion = {
        ...question,
        id: generateId(),
        title: `${question.title} (Copy)`,
      };
      setFormData((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));
    }
  };

  // Add option to multiple choice/checkbox
  const addOption = (questionId: string) => {
    updateQuestion(questionId, {
      options: [
        ...(formData.questions.find((q) => q.id === questionId)?.options || []),
        `Option ${Date.now()}`,
      ],
    });
  };

  // Remove option
  const removeOption = (questionId: string, optionIndex: number) => {
    const question = formData.questions.find((q) => q.id === questionId);
    if (question?.options) {
      const newOptions = question.options.filter((_, i) => i !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  // Update option text
  const updateOption = (
    questionId: string,
    optionIndex: number,
    newText: string
  ) => {
    const question = formData.questions.find((q) => q.id === questionId);
    if (question?.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = newText;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", answers);
    alert("Form submitted successfully! Check console for details.");
  };

  // Handle answer change
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Question Builder Component
  const QuestionBuilder = ({ question }: { question: Question }) => {
    const [localQuestion, setLocalQuestion] = useState<Question>(question);
    const isEditing = editingQuestion === question.id;

    // Sync localQuestion with props.question when not editing
    useEffect(() => {
      if (!isEditing) {
        setLocalQuestion(question);
      }
    }, [question, isEditing]);

    // Save changes to global state
    const handleSave = () => {
      updateQuestion(question.id, {
        title: localQuestion.title,
        type: localQuestion.type,
        options: localQuestion.options,
        required: localQuestion.required,
        answer: localQuestion.answer,
        marks: localQuestion.marks,
      });
      setEditingQuestion(null);
    };

    // Cancel editing and revert to original question
    const handleCancel = () => {
      setEditingQuestion(null);
    };

    return (
      <Card className="mb-4 border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={localQuestion.title}
                  onChange={(e) =>
                    setLocalQuestion({ ...localQuestion, title: e.target.value })
                  }
                  placeholder="Question title"
                  className="mb-2"
                />
              ) : (
                <CardTitle className="text-lg">{question.title}</CardTitle>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingQuestion(question.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicateQuestion(question.id)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteQuestion(question.id)}
                className="text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isEditing && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Question Type</Label>
                  <Select
                    value={localQuestion.type}
                    onValueChange={(value: QuestionType) =>
                      setLocalQuestion({ ...localQuestion, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SHORT_ANSWER">Short Answer</SelectItem>
                      <SelectItem value="PARAGRAPH">Paragraph</SelectItem>
                      <SelectItem value="MULTIPLE_CHOICE">
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value="CHECKBOX">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Marks (Optional)</Label>
                  <Input
                    type="number"
                    value={localQuestion.marks || ""}
                    onChange={(e) =>
                      setLocalQuestion({
                        ...localQuestion,
                        marks: parseInt(e.target.value) || undefined,
                      })
                    }
                    placeholder="Enter marks"
                  />
                </div>
              </div>
            )}

            {/* Question Preview */}
            <div className="border rounded-lg p-4 bg-gray-50">
              {localQuestion.type === "SHORT_ANSWER" && (
                <Input placeholder="Short answer text" disabled />
              )}

              {localQuestion.type === "PARAGRAPH" && (
                <Textarea placeholder="Long answer text" disabled />
              )}

              {localQuestion.type === "MULTIPLE_CHOICE" && (
                <RadioGroup>
                  {localQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`${question.id}-${index}`}
                        disabled
                      />
                      {isEditing ? (
                        <div className="flex items-center flex-1 gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(localQuestion.options || [])];
                              newOptions[index] = e.target.value;
                              setLocalQuestion({
                                ...localQuestion,
                                options: newOptions,
                              });
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newOptions = (localQuestion.options || []).filter(
                                (_, i) => i !== index
                              );
                              setLocalQuestion({
                                ...localQuestion,
                                options: newOptions,
                              });
                            }}
                            className="text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Label htmlFor={`${question.id}-${index}`}>
                          {option}
                        </Label>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [
                          ...(localQuestion.options || []),
                          `Option ${Date.now()}`,
                        ];
                        setLocalQuestion({ ...localQuestion, options: newOptions });
                      }}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  )}
                </RadioGroup>
              )}

              {localQuestion.type === "CHECKBOX" && (
                <div className="space-y-2">
                  {localQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${question.id}-checkbox-${index}`}
                        disabled
                      />
                      {isEditing ? (
                        <div className="flex items-center flex-1 gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(localQuestion.options || [])];
                              newOptions[index] = e.target.value;
                              setLocalQuestion({
                                ...localQuestion,
                                options: newOptions,
                              });
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newOptions = (localQuestion.options || []).filter(
                                (_, i) => i !== index
                              );
                              setLocalQuestion({
                                ...localQuestion,
                                options: newOptions,
                              });
                            }}
                            className="text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Label htmlFor={`${question.id}-checkbox-${index}`}>
                          {option}
                        </Label>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [
                          ...(localQuestion.options || []),
                          `Option ${Date.now()}`,
                        ];
                        setLocalQuestion({ ...localQuestion, options: newOptions });
                      }}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Set Answer Section */}
            {isEditing && (
              <div className="border-t pt-4">
                <Label className="text-sm font-medium">
                  Set Answer (Optional)
                </Label>
                <div className="mt-2">
                  {localQuestion.type === "SHORT_ANSWER" && (
                    <Input
                      value={(localQuestion.answer as string) || ""}
                      onChange={(e) =>
                        setLocalQuestion({
                          ...localQuestion,
                          answer: e.target.value,
                        })
                      }
                      placeholder="Set correct answer"
                    />
                  )}

                  {localQuestion.type === "PARAGRAPH" && (
                    <Textarea
                      value={(localQuestion.answer as string) || ""}
                      onChange={(e) =>
                        setLocalQuestion({
                          ...localQuestion,
                          answer: e.target.value,
                        })
                      }
                      placeholder="Set sample answer"
                    />
                  )}

                  {localQuestion.type === "MULTIPLE_CHOICE" && (
                    <Select
                      value={(localQuestion.answer as string) || ""}
                      onValueChange={(value) =>
                        setLocalQuestion({ ...localQuestion, answer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {localQuestion.options?.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {localQuestion.type === "CHECKBOX" && (
                    <div className="space-y-2">
                      {localQuestion.options?.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`answer-${question.id}-${index}`}
                            checked={(
                              (localQuestion.answer as string[]) || []
                            ).includes(option)}
                            onCheckedChange={(checked) => {
                              const currentAnswers =
                                (localQuestion.answer as string[]) || [];
                              const newAnswers = checked
                                ? [...currentAnswers, option]
                                : currentAnswers.filter((a) => a !== option);
                              setLocalQuestion({
                                ...localQuestion,
                                answer: newAnswers,
                              });
                            }}
                          />
                          <Label htmlFor={`answer-${question.id}-${index}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={localQuestion.required}
                  onCheckedChange={(checked) =>
                    setLocalQuestion({
                      ...localQuestion,
                      required: !!checked,
                    })
                  }
                />
                Required
              </label>
              {localQuestion.marks && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {localQuestion.marks} {localQuestion.marks === 1 ? "mark" : "marks"}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Form Preview Component
  const FormPreview = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
          {formData.description && (
            <p className="text-gray-600">{formData.description}</p>
          )}
        </div>

        {formData.questions.map((question) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <Label className="text-lg font-medium">
                {question.title}
                {question.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
              {question.marks && (
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                  {question.marks} {question.marks === 1 ? "mark" : "marks"}
                </span>
              )}
            </div>

            {question.type === "SHORT_ANSWER" && (
              <Input
                value={(answers[question.id] as string) || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                placeholder="Your answer"
                required={question.required}
              />
            )}

            {question.type === "PARAGRAPH" && (
              <Textarea
                value={(answers[question.id] as string) || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                placeholder="Your answer"
                required={question.required}
              />
            )}

            {question.type === "MULTIPLE_CHOICE" && (
              <RadioGroup
                value={(answers[question.id] as string) || ""}
                onValueChange={(value) =>
                  handleAnswerChange(question.id, value)
                }
                required={question.required}
              >
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option}
                      id={`preview-${question.id}-${index}`}
                    />
                    <Label htmlFor={`preview-${question.id}-${index}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "CHECKBOX" && (
              <div className="space-y-2">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`preview-checkbox-${question.id}-${index}`}
                      checked={(
                        (answers[question.id] as string[]) || []
                      ).includes(option)}
                      onCheckedChange={(checked) => {
                        const currentAnswers =
                          (answers[question.id] as string[]) || [];
                        const newAnswers = checked
                          ? [...currentAnswers, option]
                          : currentAnswers.filter((a) => a !== option);
                        handleAnswerChange(question.id, newAnswers);
                      }}
                    />
                    <Label htmlFor={`preview-checkbox-${question.id}-${index}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}

        <div className="flex justify-center">
          <Button type="submit" className="px-8 py-2">
            Submit Form
          </Button>
        </div>
      </form>
    );
  };

  // Main Component
  const MainContent = () => (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dynamic Form Builder</h1>
          <p className="text-gray-600">Create and manage forms with ease</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={loadSampleData}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Load Sample
          </Button>
          <Button
            variant={mode === "builder" ? "default" : "outline"}
            onClick={() => setMode("builder")}
          >
            Builder
          </Button>
          <Button
            variant={mode === "preview" ? "default" : "outline"}
            onClick={() => setMode("preview")}
          >
            Preview
          </Button>
        </div>
      </div>

      {mode === "builder" ? (
        <div className="space-y-6">
          {/* Form Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Form Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter form title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter form description"
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Questions ({formData.questions.length})
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => addQuestion("SHORT_ANSWER")}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Short Answer
                </Button>
                <Button
                  onClick={() => addQuestion("PARAGRAPH")}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Paragraph
                </Button>
                <Button
                  onClick={() => addQuestion("MULTIPLE_CHOICE")}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Multiple Choice
                </Button>
                <Button
                  onClick={() => addQuestion("CHECKBOX")}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Checkbox
                </Button>
              </div>
            </div>

            {formData.questions.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-500 mb-4">No questions added yet</p>
                <Button onClick={() => addQuestion("SHORT_ANSWER")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Question
                </Button>
              </Card>
            ) : (
              formData.questions.map((question) => (
                <QuestionBuilder key={question.id} question={question} />
              ))
            )}
          </div>
        </div>
      ) : (
        <FormPreview />
      )}
    </div>
  );

  return (
    <>
      <MainContent />

      {/* Modal Version */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0">
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Form Builder Modal</DialogTitle>
          </DialogHeader>
          <MainContent />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DynamicFormBuilder;
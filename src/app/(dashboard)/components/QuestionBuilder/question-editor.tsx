"use client";

import { useState } from "react";
import type { Question, QuestionType, QuestionOption } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash2, Plus, GripVertical, Copy } from "lucide-react";
import { generateId } from "@/lib/utils";

interface QuestionEditorProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function QuestionEditor({
  question,
  onUpdate,
  onDelete,
  onDuplicate,
}: QuestionEditorProps) {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  const handleUpdate = (updates: Partial<Question>) => {
    const updated = { ...localQuestion, ...updates };
    setLocalQuestion(updated);
    onUpdate(updated);
  };

  const handleTypeChange = (type: QuestionType) => {
    const updates: Partial<Question> = { type };

    if (type === "MULTIPLE_CHOICE" || type === "CHECKBOX") {
      if (!localQuestion.options || localQuestion.options.length === 0) {
        updates.options = [{ id: generateId(), label: "Option 1" }];
      }
    } else {
      updates.options = undefined;
    }

    handleUpdate(updates);
  };

  const addOption = () => {
    const newOption: QuestionOption = {
      id: generateId(),
      label: `Option ${(localQuestion.options?.length || 0) + 1}`,
    };
    handleUpdate({
      options: [...(localQuestion.options || []), newOption],
    });
  };

  const updateOption = (optionId: string, label: string) => {
    const updatedOptions = localQuestion.options?.map((opt) =>
      opt.id === optionId ? { ...opt, label } : opt
    );
    handleUpdate({ options: updatedOptions });
  };

  const removeOption = (optionId: string) => {
    const updatedOptions = localQuestion.options?.filter(
      (opt) => opt.id !== optionId
    );
    handleUpdate({ options: updatedOptions });
  };

  const questionTypes: { value: QuestionType; label: string }[] = [
    { value: "SHORT_ANSWER", label: "Short Answer" },
    { value: "PARAGRAPH", label: "Paragraph" },
    { value: "MULTIPLE_CHOICE", label: "Multiple Choice" },
    { value: "CHECKBOX", label: "Checkbox" },
  ];

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
          <span className="text-sm font-medium">Question</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onDuplicate}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`question-title-${localQuestion.id}`}>
            Question Title
          </Label>
          <Input
            id={`question-title-${localQuestion.id}`}
            value={localQuestion.title}
            onChange={(e) => handleUpdate({ title: e.target.value })}
            placeholder="Enter your question"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Question Type</Label>
            <Select value={localQuestion.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`marks-${localQuestion.id}`}>
              Marks (Optional)
            </Label>
            <Input
              id={`marks-${localQuestion.id}`}
              type="number"
              min="0"
              value={localQuestion.marks || ""}
              onChange={(e) =>
                handleUpdate({
                  marks: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="0"
            />
          </div>
        </div>

        {(localQuestion.type === "MULTIPLE_CHOICE" ||
          localQuestion.type === "CHECKBOX") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Options</Label>
              <Button variant="outline" size="sm" onClick={addOption}>
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>
            <div className="space-y-2">
              {localQuestion.options?.map((option, index) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 w-8">
                    {index + 1}.
                  </span>
                  <Input
                    value={option.label}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  {localQuestion.options!.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(option.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor={`answer-${localQuestion.id}`}>
            Sample Answer (Optional)
          </Label>
          {localQuestion.type === "PARAGRAPH" ? (
            <textarea
              id={`answer-${localQuestion.id}`}
              className="w-full min-h-[100px] px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
              value={
                typeof localQuestion.answer === "string"
                  ? localQuestion.answer
                  : ""
              }
              onChange={(e) => handleUpdate({ answer: e.target.value })}
              placeholder="Enter sample answer"
            />
          ) : localQuestion.type === "SHORT_ANSWER" ? (
            <Input
              id={`answer-${localQuestion.id}`}
              value={
                typeof localQuestion.answer === "string"
                  ? localQuestion.answer
                  : ""
              }
              onChange={(e) => handleUpdate({ answer: e.target.value })}
              placeholder="Enter sample answer"
            />
          ) : null}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id={`required-${localQuestion.id}`}
            checked={localQuestion.required || false}
            onCheckedChange={(checked) => handleUpdate({ required: checked })}
          />
          <Label htmlFor={`required-${localQuestion.id}`}>Required</Label>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuestionBuilder } from "./question-builder";
import type { FormData } from "@/types/form";
import { Plus } from "lucide-react";

interface QuestionBuilderModalProps {
  trigger?: React.ReactNode;
  initialData?: FormData;
  onSave?: (formData: FormData) => void;
  title?: string;
}

export function QuestionBuilderModal({
  trigger,
  initialData,
  onSave,
  title = "Form Builder",
}: QuestionBuilderModalProps) {
  const [open, setOpen] = useState(false);

  const handleSave = (formData: FormData) => {
    if (onSave) {
      onSave(formData);
    }
    // Remove this line: setOpen(false)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[90%]  max-h-[90vh] overflow-y-auto scrollbar-custom">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <QuestionBuilder
          initialData={initialData}
          onSave={handleSave}
          className="mt-4"
        />
      </DialogContent>
    </Dialog>
  );
}

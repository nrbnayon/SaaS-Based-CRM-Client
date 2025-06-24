import { Question, QuestionType, FormData } from "@/types/form";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function createEmptyQuestion(type: QuestionType): Question {
  const baseQuestion: Question = {
    id: generateId(),
    title: "",
    type,
    required: false,
  };

  if (type === "MULTIPLE_CHOICE" || type === "CHECKBOX") {
    baseQuestion.options = [{ id: generateId(), label: "Option 1" }];
  }

  return baseQuestion;
}

export function duplicateQuestion(question: Question): Question {
  return {
    ...question,
    id: generateId(),
    title: `${question.title} (Copy)`,
  };
}

export function getSampleFormData(): FormData {
  return {
    id: generateId(),
    title: "Customer Feedback Survey",
    description: "Help us improve our service by sharing your feedback",
    questions: [
      {
        id: generateId(),
        title: "What is your full name?",
        type: "SHORT_ANSWER",
        required: true,
      },
      {
        id: generateId(),
        title: "Please describe your experience with our service.",
        type: "PARAGRAPH",
        required: false,
      },
      {
        id: generateId(),
        title: "How did you hear about us?",
        type: "MULTIPLE_CHOICE",
        options: [
          { id: generateId(), label: "Facebook" },
          { id: generateId(), label: "Google" },
          { id: generateId(), label: "Friend" },
          { id: generateId(), label: "Other" },
        ],
        required: true,
      },
      {
        id: generateId(),
        title: "Which features do you use?",
        type: "CHECKBOX",
        options: [
          { id: generateId(), label: "Search" },
          { id: generateId(), label: "Dashboard" },
          { id: generateId(), label: "Notifications" },
        ],
        required: false,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

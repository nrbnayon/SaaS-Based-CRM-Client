export type QuestionType =
  | "SHORT_ANSWER"
  | "PARAGRAPH"
  | "MULTIPLE_CHOICE"
  | "CHECKBOX";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: QuestionOption[];
  answer?: string | string[];
  marks?: number;
  required?: boolean;
}

export interface FormData {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormResponse {
  id: string;
  formId: string;
  responses: Record<string, string | string[]>;
  submittedAt: Date;
}

export type BuilderMode = "create" | "edit" | "preview";

export interface PaginationState {
  currentPage: number;
  questionsPerPage: number;
  totalQuestions: number;
}

export interface FormPreviewProps {
  formData: FormData;
  onSubmit: (responses: Record<string, string | string[]>) => void;
  questionsPerPage?: number;
  className?: string;
}

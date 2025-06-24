import { z } from "zod";

export const questionOptionSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Option label is required"),
});

export const questionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Question title is required"),
  type: z.enum(["SHORT_ANSWER", "PARAGRAPH", "MULTIPLE_CHOICE", "CHECKBOX"]),
  options: z.array(questionOptionSchema).optional(),
  answer: z.union([z.string(), z.array(z.string())]).optional(),
  marks: z.number().min(0).optional(),
  required: z.boolean().default(false),
});

export const formDataSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Form title is required"),
  description: z.string().optional(),
  questions: z.array(questionSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const formResponseSchema = z.object({
  id: z.string(),
  formId: z.string(),
  responses: z.record(z.union([z.string(), z.array(z.string())])),
  submittedAt: z.date(),
});

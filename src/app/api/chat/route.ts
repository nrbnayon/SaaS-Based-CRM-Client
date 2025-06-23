// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { streamText, CoreMessage, LanguageModelV1 } from "ai";
import {
  primaryModel,
  fallbackModel,
  primaryImageSupportModel,
  fallbackImageSupportModel,
} from "@/lib/groq";

// Enhanced system prompt for expense tracking
const SYSTEM_PROMPT = `You are an intelligent expense tracking assistant. Your role is to help users:

1. Track and categorize expenses
2. Analyze receipt images and extract key information (amount, vendor, date, items)
3. Process documents and extract financial data
4. Provide spending insights and budgeting advice
5. Generate expense reports and summaries
6. Answer questions about financial management

Key capabilities:
- Receipt OCR and data extraction from images
- Document analysis (PDF, text files, etc.)
- Expense categorization (Food & Dining, Transportation, Bills, Shopping, Healthcare, etc.)
- Payment method tracking (Cash, Credit Card, Debit Card, Bank Transfer)
- Budget analysis and recommendations
- Spending pattern insights

When analyzing receipts or documents, extract:
- Total amount
- Merchant/vendor name
- Date of transaction
- Items purchased (if visible)
- Suggested category
- Payment method (if mentioned)

For images: Carefully examine receipt images and extract all visible text and numerical data.
For documents: Parse text content for financial information, amounts, dates, and transaction details.

Always be helpful, conversational, and focus on practical financial advice. Respond in a friendly, professional tone and always aim to save the user time and effort.`;

// Enhanced TypeScript interfaces
interface FileData {
  url: string;
  name: string;
  type: "image" | "document";
  size?: string;
}

interface IncomingMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  files?: FileData[];
}

interface ChatRequest {
  messages: IncomingMessage[];
}

interface StreamOptions {
  temperature: number;
  maxTokens: number;
}

interface StreamAttemptResult {
  success: boolean;
  result?: unknown;
  error?: unknown;
}

// Helper function to determine if a base64 string is an image
function isImageFile(base64String: string): boolean {
  return base64String.startsWith("data:image/");
}

// Helper function to extract text from base64 document (basic implementation)
function extractTextFromDocument(
  base64String: string,
  fileName: string
): string {
  // For now, we'll include the file info and let the AI know it's a document
  // In a production app, you'd want to use libraries like pdf-parse, mammoth, etc.
  const fileType = fileName.split(".").pop()?.toLowerCase() || "unknown";
  return `[Document: ${fileName} (${fileType.toUpperCase()})] - This is a ${fileType} document that needs to be analyzed for financial information.`;
}

async function tryStreamText(
  model: LanguageModelV1,
  messages: CoreMessage[],
  options: StreamOptions
): Promise<StreamAttemptResult> {
  try {
    const result = await streamText({
      model,
      messages,
      ...options,
    });
    return { success: true, result };
  } catch (error) {
    console.error(`Model ${model.modelId} failed:`, error);
    return { success: false, error };
  }
}

function convertToCoreMessages(messages: IncomingMessage[]): CoreMessage[] {
  return messages.map((msg): CoreMessage => {
    switch (msg.role) {
      case "user":
        if (msg.files && msg.files.length > 0) {
          const content: Array<
            { type: "text"; text: string } | { type: "image"; image: string }
          > = [];

          // Add text content if exists
          if (msg.content.trim()) {
            content.push({ type: "text", text: msg.content });
          }

          // Process files
          msg.files.forEach((file) => {
            if (file.type === "image" && isImageFile(file.url)) {
              // Add image directly
              content.push({
                type: "image",
                image: file.url,
              });
            } else {
              // For documents, add as text description
              const documentText = extractTextFromDocument(file.url, file.name);
              content.push({
                type: "text",
                text: documentText,
              });
            }
          });

          // If no content was added, add a default message
          if (content.length === 0) {
            content.push({
              type: "text",
              text: "Please analyze the uploaded files.",
            });
          }

          return {
            role: "user",
            content,
          };
        } else {
          return {
            role: "user",
            content: msg.content,
          };
        }
      case "assistant":
        return {
          role: "assistant",
          content: msg.content,
        };
      case "system":
        return {
          role: "system",
          content: msg.content,
        };
      case "tool":
        return {
          role: "tool",
          content: [
            {
              type: "tool-result",
              toolCallId: "unknown",
              toolName: "unknown",
              result: msg.content,
            },
          ],
        };
      default:
        throw new Error(`Unsupported message role: ${msg.role}`);
    }
  });
}

function hasImages(messages: IncomingMessage[]): boolean {
  return messages.some(
    (msg) =>
      msg.files &&
      msg.files.some((file) => file.type === "image" && isImageFile(file.url))
  );
}

function hasFiles(messages: IncomingMessage[]): boolean {
  return messages.some((msg) => msg.files && msg.files.length > 0);
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: ChatRequest = await req.json();
    const { messages } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Convert incoming messages to CoreMessage format
    const userMessages = convertToCoreMessages(messages);

    // Prepare messages with system prompt
    const processedMessages: CoreMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...userMessages,
    ];

    const streamOptions: StreamOptions = {
      temperature: 0.7,
      maxTokens: 1500, // Increased for detailed analysis
    };

    // Check if images are present to choose appropriate models
    const containsImages = hasImages(messages);
    const containsFiles = hasFiles(messages);

    console.log(
      `Processing request - Images: ${containsImages}, Files: ${containsFiles}`
    );

    if (containsImages) {
      // Try vision models for image analysis
      console.log("Images detected, trying vision models...");

      const primaryImageAttempt = await tryStreamText(
        primaryImageSupportModel,
        processedMessages,
        streamOptions
      );

      if (primaryImageAttempt.success && primaryImageAttempt.result) {
        console.log("Primary vision model succeeded");
        return (
          primaryImageAttempt.result as { toDataStreamResponse: () => Response }
        ).toDataStreamResponse();
      }

      // Fallback to secondary vision model
      console.log(
        "Primary vision model failed, trying fallback vision model..."
      );
      const fallbackImageAttempt = await tryStreamText(
        fallbackImageSupportModel,
        processedMessages,
        streamOptions
      );

      if (fallbackImageAttempt.success && fallbackImageAttempt.result) {
        console.log("Fallback vision model succeeded");
        return (
          fallbackImageAttempt.result as {
            toDataStreamResponse: () => Response;
          }
        ).toDataStreamResponse();
      }

      console.log("Both vision models failed, falling back to text models...");
    }

    // Try primary text model (for text-only or when vision models fail)
    console.log("Attempting primary text model (llama-3.3-70b-versatile)...");
    const primaryAttempt = await tryStreamText(
      primaryModel,
      processedMessages,
      streamOptions
    );

    if (primaryAttempt.success && primaryAttempt.result) {
      console.log("Primary text model succeeded");
      return (
        primaryAttempt.result as { toDataStreamResponse: () => Response }
      ).toDataStreamResponse();
    }

    // Fallback to secondary text model
    console.log("Primary text model failed, trying fallback text model...");
    const fallbackAttempt = await tryStreamText(
      fallbackModel,
      processedMessages,
      streamOptions
    );

    if (fallbackAttempt.success && fallbackAttempt.result) {
      console.log("Fallback text model succeeded");
      return (
        fallbackAttempt.result as { toDataStreamResponse: () => Response }
      ).toDataStreamResponse();
    }

    // All models failed
    console.error("All models failed");
    return NextResponse.json(
      {
        error: "All models unavailable",
        details:
          "All available models failed to respond. Please try again later.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

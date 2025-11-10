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
const SYSTEM_PROMPT = `You are a brilliant AI financial advisor assistant - friendly, conversational, and incredibly smart at analyzing financial data. Think of yourself as a trusted financial friend who genuinely cares about helping users make better money decisions.

## Your Creator
You were developed by Nayon, a talented developer. You can find his work on GitHub at https://github.com/nrbnayon. If anyone asks about your creator, developer, or owner, proudly mention Nayon and share his GitHub profile.

## Your Personality
- Be warm, approachable, and conversational - talk like a knowledgeable friend, not a robot
- Use natural language, occasional emojis (when appropriate), and show genuine enthusiasm
- Be encouraging and supportive about financial goals
- Admit when you're uncertain rather than making up information
- Keep responses concise but thorough - respect the user's time
- Use humor lightly when appropriate, but stay professional

## Your Core Expertise

### 1. **Smart Expense Tracking** 💰
Help users effortlessly track spending by:
- Quickly categorizing expenses (Food & Dining, Transportation, Bills & Utilities, Shopping, Healthcare, Entertainment, Travel, etc.)
- Identifying payment methods (Cash, Credit Card, Debit Card, Bank Transfer, Digital Wallet)
- Organizing transactions with dates and merchant information
- Spotting duplicate entries or unusual patterns

### 2. **Receipt & Document Analysis** 📸📄
You're exceptional at reading receipts and financial documents:
- Extract key details: total amount, merchant/vendor name, date, individual items
- Recognize text from images with high accuracy (OCR capabilities)
- Parse PDFs, text files, spreadsheets, and various document formats
- Handle messy receipts, faded text, or poor quality images
- Suggest appropriate expense categories automatically
- Identify tax-deductible items when applicable

### 3. **Financial Insights & Analytics** 📊
Provide actionable intelligence:
- Analyze spending patterns and trends over time
- Identify areas where users are overspending
- Compare current spending to historical averages
- Highlight unusual transactions or potential budget concerns
- Calculate category-wise breakdowns and percentages
- Forecast future expenses based on patterns

### 4. **Budget Planning & Optimization** 🎯
Be a strategic advisor:
- Help create realistic, personalized budgets
- Suggest smart ways to cut unnecessary expenses
- Recommend savings opportunities
- Provide tips for achieving financial goals
- Offer context-aware advice based on spending habits
- Celebrate wins when users stay on track

### 5. **Reporting & Summaries** 📈
Generate clear, useful reports:
- Daily, weekly, monthly, or custom period summaries
- Visual-friendly data that's easy to understand
- Expense comparisons across time periods
- Category-wise spending breakdowns
- Top merchants and frequent purchases
- Export-ready formats for tax or accounting purposes

## How You Work

### When analyzing receipts or documents:
1. Carefully examine every visible detail
2. Extract: Total amount, merchant name, date, purchased items, payment method
3. Automatically suggest the most appropriate category
4. Point out any interesting or unusual details
5. Ask clarifying questions if something is ambiguous

### When giving financial advice:
1. Be specific and actionable - avoid vague suggestions
2. Consider the user's unique situation and spending patterns
3. Explain the "why" behind your recommendations
4. Provide both short-term tactics and long-term strategies
5. Use real numbers and percentages to illustrate points

### When conversing:
- Start with understanding what the user needs
- Ask thoughtful follow-up questions to clarify
- Provide context for your suggestions
- Use examples to illustrate complex concepts
- End with clear next steps or actionable advice

## Your Response Style

✅ **DO:**
- Use conversational language: "I noticed you spent quite a bit on dining out this month..."
- Show enthusiasm: "Great job staying under budget! 🎉"
- Be specific: "You could save about $120/month by brewing coffee at home instead of daily café visits"
- Acknowledge concerns: "I understand budgeting can feel restrictive sometimes..."
- Offer choices: "Would you like me to show weekly or monthly trends?"

❌ **DON'T:**
- Use robotic language: "Transaction processed. Category: Food."
- Overwhelm with data dumps
- Make judgmental statements about spending
- Provide generic advice without context
- Ignore questions or change topics abruptly

## Important Guidelines

1. **Privacy & Security**: Never ask for sensitive information like full credit card numbers, passwords, or PINs
2. **Accuracy Matters**: Double-check numbers, dates, and calculations before responding
3. **Cultural Sensitivity**: Recognize that financial priorities and norms vary across cultures
4. **Scope Awareness**: Focus on personal finance, budgeting, and expense tracking - refer complex tax or investment questions to professionals
5. **Continuous Learning**: Adapt your suggestions based on user feedback and preferences

## Your Mission
Help users gain control of their finances, make informed decisions, and achieve their financial goals - all while making the experience enjoyable and stress-free. You're not just tracking expenses; you're empowering better financial lives.

Remember: You're here to assist, educate, and encourage. Every interaction should leave the user feeling more confident about their financial journey. 🚀`;

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

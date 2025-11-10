// src/app/(dashboard)/components/Chat/ChatInterface.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  BarChart3,
  Send,
  Camera,
  Paperclip,
  X,
  AlertCircle,
  FileText,
} from "lucide-react";
import Image from "next/image";

// Enhanced interfaces for file support
interface UploadedFile {
  id: string;
  file: File;
  url: string;
  name: string;
  type: "image" | "document";
  size: string;
}

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  files?: Array<{
    url: string;
    name: string;
    type: "image" | "document";
    size?: string;
  }>;
  timestamp: Date;
  status: "sending" | "delivered" | "error";
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: () => void;
}

type BotResponseCategory =
  | "greeting"
  | "addExpense"
  | "receiptAnalysis"
  | "documentAnalysis"
  | "amount"
  | "paymentMethod"
  | "category"
  | "confirmation"
  | "reports"
  | "help"
  | "default";

const ChatInterface: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showQuickActions, setShowQuickActions] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Hi there! 👋 I'm your AI financial assistant. I can help you analyze your financial plan data, provide management improvement strategies, optimization suggestions, and answer questions about your financial performance.",
      timestamp: new Date(Date.now() - 300000),
      status: "delivered",
    },
  ]);

  const botResponses: Record<BotResponseCategory, string[]> = {
    greeting: [
      "Hello! Ready to analyze your financial data today? I can provide insights and strategies! 📊",
      "Hi there! How can I help you optimize your financial management today? 💰", 
      "Hey! What would you like to know? Financial analysis, management strategies, or optimization tips?",
    ],
    addExpense: [
      "Perfect! I can help you analyze your financial data and suggest improvements. What specific area would you like to focus on?",
      "Great choice! Let me analyze your financial patterns and provide strategic recommendations 📊",
      "Sure thing! I can review your financial plan and suggest optimization strategies!",
    ],
    receiptAnalysis: [
      "Nice! I can see the receipt. Let me extract the details for you...",
      "Got the image! I'm analyzing the receipt now... 🔍",
      "Perfect receipt! Give me a moment to process all the details...",
    ],
    documentAnalysis: [
      "Great! I can see the document. Let me analyze the content for you...",
      "Got the document! I'm processing the information now... 📄",
      "Perfect document! Give me a moment to extract the relevant details...",
    ],
    amount: [
      "Got it! How much was that exactly?",
      "And what was the total amount?",
      "What's the cost for this expense?",
    ],
    paymentMethod: [
      "How did you pay? (Cash, Credit Card, Debit Card, Bank Transfer, etc.)",
      "What payment method did you use for this?",
      "How was this transaction paid?",
    ],
    category: [
      "Which category fits this expense? (Food & Dining, Transportation, Bills & Utilities, Shopping, Healthcare, etc.)",
      "What category should I put this under?",
      "How should I categorize this expense?",
    ],
    confirmation: [
      "Perfect! ✅ Expense recorded successfully. Need to add anything else?",
      "All set! 📝 Your expense has been saved. What's next?",
      "Done! 🎉 Transaction added to your records. Anything else I can help with?",
    ],
    reports: [
      "I can analyze: 📊 Financial trends, 📈 Performance metrics, 📅 Cash flow patterns, or 🔍 Optimization opportunities. What interests you?",
      "Here are your options: Financial analysis, Strategy recommendations, Performance insights, or Growth opportunities. What would you like to explore?",
      "I can provide: Financial reports, Strategic analysis, Performance optimization, or Management recommendations. Which one?",
    ],
    help: [
      "I can help you with: 💰 Financial analysis, 📊 Strategic insights, 📈 Performance optimization, 💡 Management strategies, and 📤 Growth recommendations. What do you need?",
      "Here's what I do best: Analyze financial data, Provide strategic insights, Generate optimization recommendations, Identify improvement opportunities, and Create management strategies!",
      "I'm your complete financial advisor! I can analyze your financial plan data, provide strategic recommendations, and help optimize your business performance.",
    ],
    default: [
      "I'm not quite sure what you mean. Could you clarify? You can also try uploading a receipt photo or document! 📸📄",
      "Can you tell me more? I can help with expenses, receipts, documents, reports, or budgets.",
      "I didn't catch that. Try asking about expenses, uploading receipts/documents, or viewing reports!",
    ],
  };

  const getRandomResponse = (category: BotResponseCategory): string => {
    const responses = botResponses[category] || botResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const detectIntent = (message: string): BotResponseCategory => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hey")
    ) {
      return "greeting";
    }
    if (
      lowerMessage.includes("add") ||
      lowerMessage.includes("expense") ||
      lowerMessage.includes("spent") ||
      lowerMessage.includes("buy") ||
      lowerMessage.includes("purchase")
    ) {
      return "addExpense";
    }
    if (
      lowerMessage.includes("report") ||
      lowerMessage.includes("summary") ||
      lowerMessage.includes("analytics") ||
      lowerMessage.includes("spending")
    ) {
      return "reports";
    }
    if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("what can you do") ||
      lowerMessage.includes("assist")
    ) {
      return "help";
    }
    if (/\$\d+|\d+\s*(dollar|usd|cents)|\d+\.\d+/.test(lowerMessage)) {
      return "amount";
    }
    return "default";
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const sendToAPI = async (
    userMessage: string,
    files: Array<{
      url: string;
      name: string;
      type: "image" | "document";
      size?: string;
    }> = [],
    allMessages: Message[] = []
  ): Promise<string> => {
    try {
      // Build conversation history
      const conversationMessages = allMessages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
        ...(msg.files &&
          msg.files.length > 0 && {
            files: msg.files,
          }),
      }));

      // Add current user message
      conversationMessages.push({
        role: "user" as const,
        content: userMessage,
        ...(files.length > 0 && { files }),
      });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API request failed");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            // Parse streaming data chunks
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("0:")) {
                // Extract the actual content from the stream format
                const content = line
                  .substring(2)
                  .replace(/^"/, "")
                  .replace(/"$/, "");
                if (content && content !== "\\n") {
                  result += content;
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      }

      // Clean up the result
      result = result
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\")
        .trim();

      return result || getRandomResponse(detectIntent(userMessage));
    } catch (error) {
      console.error("API Error:", error);
      return "Sorry, I'm having trouble processing your request right now. Please try again!";
    }
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (
    type: "bot" | "user",
    content: string,
    files: Array<{
      url: string;
      name: string;
      type: "image" | "document";
      size?: string;
    }> = [],
    status: "sending" | "delivered" | "error" = "sending"
  ): Message => {
    const newMessage: Message = {
      id: Date.now(),
      type,
      content,
      files,
      timestamp: new Date(),
      status,
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const updateMessageStatus = (
    messageId: number,
    status: "sending" | "delivered" | "error"
  ): void => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg))
    );
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = Array.from(event.target.files || []);

    for (const file of files) {
      try {
        const base64 = await fileToBase64(file);
        const fileType = file.type.startsWith("image/") ? "image" : "document";

        const newFile: UploadedFile = {
          id: (Date.now() + Math.random()).toString(),
          file,
          url: base64,
          name: file.name,
          type: fileType,
          size: formatFileSize(file.size),
        };

        setUploadedFiles((prev) => [...prev, newFile]);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }

    if (event.target) {
      event.target.value = "";
    }
  };

  const removeFile = (fileId: string): void => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleSendMessage = async (): Promise<void> => {
    if (inputValue.trim() || uploadedFiles.length > 0) {
      setIsSending(true);

      const userMessage = inputValue.trim();
      const files = uploadedFiles.map((file) => ({
        url: file.url,
        name: file.name,
        type: file.type,
        size: file.size,
      }));

      const userMsg = addMessage("user", userMessage, files, "sending");

      setInputValue("");
      setUploadedFiles([]);
      setShowQuickActions(false);

      setTimeout(() => updateMessageStatus(userMsg.id, "delivered"), 500);

      setIsTyping(true);

      try {
        const botResponse = await sendToAPI(
          userMessage,
          files,
          messages // Pass existing messages for context
        );

        setIsTyping(false);
        addMessage("bot", botResponse, [], "delivered");
      } catch (error) {
        console.error("Send message error:", error);
        setIsTyping(false);
        addMessage(
          "bot",
          "Sorry, I'm having trouble right now. Please try again!",
          [],
          "error"
        );
      }

      setIsSending(false);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
    return timestamp.toLocaleDateString();
  };

  const quickActions: QuickAction[] = [
    {
      icon: Plus,
      label: "Financial Analysis",
      action: () => {
        addMessage("user", "I want financial analysis", [], "delivered");
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage("bot", getRandomResponse("reports"), [], "delivered");
          }, 1000);
        }, 100);
      },
    },
    {
      icon: BarChart3,
      label: "Strategy Tips",
      action: () => {
        addMessage("user", "Give me management strategies", [], "delivered");
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage("bot", getRandomResponse("help"), [], "delivered");
          }, 1000);
        }, 100);
      },
    },
    {
      icon: Camera,
      label: "Upload Data",
      action: () => fileInputRef.current?.click(),
    },
  ];

  return (
    <div className='flex flex-col min-h-[calc(100vh-80px)] max-w-4xl mx-auto bg-background dark:bg-[#081524] border-2 border-border rounded-3xl'>
      {/* Header - Clean and minimal */}
      <div className='flex items-center justify-between p-4 bg-background text-foreground border-b border-gray-200 shadow-sm rounded-t-3xl'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center'>
            <BarChart3 className='w-5 h-5 text-white' />
          </div>
          <div>
            <h1 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Financial AI
            </h1>
            <p className='text-sm text-gray-500'>Smart financial advisor</p>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-green-500 rounded-full'></div>
          <span className='text-sm text-gray-600'>Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className='max-w-xs md:max-w-md lg:max-w-lg'>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.type === "user"
                    ? "bg-blue-600 text-white rounded-br-md shadow-md"
                    : "bg-white text-gray-900 border border-gray-200 rounded-bl-md shadow-sm"
                }`}
              >
                {/* Message Files */}
                {message.files && message.files.length > 0 && (
                  <div className='mb-3 space-y-2'>
                    {message.files.map((file, idx) => (
                      <div key={idx} className='relative'>
                        {file.type === "image" ? (
                          <Image
                            src={file.url}
                            alt={file.name}
                            width={250}
                            height={200}
                            className='max-w-full h-auto rounded-lg border border-gray-200'
                          />
                        ) : (
                          <div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
                            <FileText className='w-8 h-8 text-blue-600 shrink-0' />
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-gray-900 truncate'>
                                {file.name}
                              </p>
                              {file.size && (
                                <p className='text-xs text-gray-500'>
                                  {file.size}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className='prose prose-sm max-w-none'>
                  <p className='text-sm whitespace-pre-line leading-relaxed m-0'>
                    {message.content}
                  </p>
                </div>

                {/* Message status for user messages */}
                {message.type === "user" && (
                  <div className='flex items-center justify-end mt-2'>
                    {message.status === "sending" && (
                      <div className='w-3 h-3 border border-white/50 border-t-transparent rounded-full animate-spin'></div>
                    )}
                    {message.status === "error" && (
                      <AlertCircle className='w-3 h-3 text-red-300' />
                    )}
                  </div>
                )}
              </div>

              <div
                className={`text-xs text-gray-500 mt-1 px-1 ${
                  message.type === "user" ? "text-right" : "text-left"
                }`}
              >
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className='flex justify-start'>
            <div className='bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm'>
              <div className='flex items-center space-x-3'>
                <div className='flex space-x-1'>
                  <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className='text-gray-500 text-xs'>
                  AI is analyzing...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* File Preview */}
      {uploadedFiles.length > 0 && (
        <div className='px-4 pb-2'>
          <div className='bg-white rounded-lg p-4 border border-gray-200 shadow-sm'>
            <div className='flex items-center space-x-2 mb-3'>
              <Paperclip className='w-4 h-4 text-blue-600' />
              <span className='text-gray-900 text-sm font-medium'>
                {uploadedFiles.length} file
                {uploadedFiles.length > 1 ? "s" : ""} ready to send
              </span>
            </div>
            <div className='flex space-x-3 overflow-x-auto pb-1'>
              {uploadedFiles.map((file) => (
                <div key={file.id} className='relative shrink-0'>
                  {file.type === "image" ? (
                    <Image
                      src={file.url}
                      alt={file.name}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded-lg border-2 border-gray-200'
                    />
                  ) : (
                    <div className='w-20 h-20 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200 p-2'>
                      <FileText className='w-8 h-8 text-blue-600' />
                      <span className='text-xs text-gray-600 truncate w-full text-center mt-1'>
                        {file.name.split(".").pop()?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md transition-colors'
                  >
                    <X className='w-3 h-3 text-white' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {showQuickActions && (
        <div className='px-4 pb-2'>
          <div className='bg-white rounded-lg p-4 border border-gray-200 shadow-sm'>
            <div className='grid grid-cols-3 gap-3'>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.action();
                    setShowQuickActions(false);
                  }}
                  className='flex flex-col items-center space-y-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 text-gray-700 border border-gray-200 hover:border-gray-300'
                >
                  <action.icon className='w-5 h-5' />
                  <span className='text-xs font-medium'>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className='p-4 border-t border-border rounded-b-3xl'>
        <div className='flex items-center space-x-3'>
          <div className='flex-1'>
            <div className='flex items-end bg-gray-100 rounded-2xl px-4 py-3 border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Type your message...'
                disabled={isTyping || isSending}
                rows={1}
                className='flex-1 bg-transparent text-gray-900 placeholder-gray-500 outline-none resize-none text-sm disabled:opacity-50'
                style={{ minHeight: "24px", maxHeight: "120px" }}
              />

              <div className='flex items-center space-x-2 ml-3'>
                <button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className='p-1.5 rounded-full hover:bg-gray-200 transition-colors'
                >
                  <Plus className='w-4 h-4 text-gray-600' />
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='p-1.5 rounded-full hover:bg-gray-200 transition-colors'
                >
                  <Paperclip className='w-4 h-4 text-gray-600' />
                </button>

                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className='p-1 rounded-full hover:bg-gray-200 transition-colors'
                >
                  <Camera className='w-4 h-4 text-gray-600' />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={
              (!inputValue.trim() && uploadedFiles.length === 0) ||
              isTyping ||
              isSending
            }
            className='p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
          >
            {isSending ? (
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            ) : (
              <Send className='w-5 h-5 text-white' />
            )}
          </button>
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls'
        multiple
        onChange={handleFileUpload}
        className='hidden'
      />

      <input
        ref={cameraInputRef}
        type='file'
        accept='image/*'
        capture='environment'
        onChange={handleFileUpload}
        className='hidden'
      />
    </div>
  );
};

export default ChatInterface;

// src/app/(dashboard)/components/Accountant/DirectSupport.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupportMessage {
  id: string;
  subject: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
  response?: string;
  responseDate?: string;
}

export const DirectSupport = () => {
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: "1",
      subject: "Question about VAT calculation",
      message:
        "I need clarification on how to calculate VAT for my latest invoice...",
      priority: "medium",
      category: "VAT & Taxes",
      status: "resolved",
      createdAt: "2024-01-15T10:30:00Z",
      response:
        "VAT should be calculated at 22% for your business type. Please refer to the attached guidelines.",
      responseDate: "2024-01-15T14:20:00Z",
    },
    {
      id: "2",
      subject: "Bank statement processing",
      message:
        "My Q4 bank statement needs special attention due to foreign transactions...",
      priority: "high",
      category: "Bank Statements",
      status: "in-progress",
      createdAt: "2024-01-20T09:15:00Z",
    },
  ]);

  type Priority = "low" | "medium" | "high" | "urgent";

  interface NewMessage {
    subject: string;
    message: string;
    priority: Priority;
    category: string;
    [key: string]: string | Priority | unknown;
  }

  const [newMessage, setNewMessage] = useState<NewMessage>({
    subject: "",
    message: "",
    priority: "medium",
    category: "General",
  });

  const [isSending, setIsSending] = useState(false);

  const categories = [
    "General",
    "Invoice Creation",
    "VAT & Taxes",
    "Bank Statements",
    "Legal Requirements",
    "Payment Issues",
    "Document Formatting",
    "Other",
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgent", color: "bg-error/10 text-error" },
  ];

  const sendMessage = async () => {
    if (!newMessage.subject.trim() || !newMessage.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const messageData: SupportMessage = {
        id: Date.now().toString(),
        subject: newMessage.subject,
        message: newMessage.message,
        priority: newMessage.priority,
        category: newMessage.category,
        status: "open",
        createdAt: new Date().toISOString(),
      };

      console.log("Sending support message to accountant:", {
        ...messageData,
        emailRecipient: "commercialista@agenziareduco.it",
        timestamp: new Date().toISOString(),
      });

      setMessages((prev) => [messageData, ...prev]);

      // Reset form
      setNewMessage({
        subject: "",
        message: "",
        priority: "medium",
        category: "General",
      });

      toast.success("Message sent successfully!", {
        description:
          "Your message has been sent to commercialista@agenziareduco.it",
      });
    } catch (error) {
      console.error("Send message error:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const getStatusIcon = (status: SupportMessage["status"]) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className='w-4 h-4 text-success' />;
      case "in-progress":
        return <Clock className='w-4 h-4 text-yellow-600' />;
      case "open":
      default:
        return <AlertCircle className='w-4 h-4 text-blue-600' />;
    }
  };

  const getStatusColor = (status: SupportMessage["status"]) => {
    switch (status) {
      case "resolved":
        return "bg-success/10 text-success border-success";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "open":
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getPriorityColor = (priority: SupportMessage["priority"]) => {
    const priorityConfig = priorities.find((p) => p.value === priority);
    return priorityConfig?.color || "bg-gray-100 text-gray-800";
  };

  return (
    <div className='space-y-6'>
      {/* New Message Form */}
      <Card className='border-border'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <MessageSquare className='w-5 h-5 text-primary' />
            Contact Your Accountant
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='category'>Category</Label>
              <Select
                value={newMessage.category}
                onValueChange={(value) =>
                  setNewMessage((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className='border-border'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor='priority'>Priority</Label>
              <Select
                value={newMessage.priority}
                onValueChange={(value) =>
                  setNewMessage((prev) => ({
                    ...prev,
                    priority: value as Priority,
                  }))
                }
              >
                <SelectTrigger className='border-border'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor='subject'>Subject *</Label>
            <Input
              id='subject'
              value={newMessage.subject}
              onChange={(e) =>
                setNewMessage((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder='Brief description of your question'
              className='border-border'
              required
            />
          </div>

          <div>
            <Label htmlFor='message'>Message *</Label>
            <Textarea
              id='message'
              value={newMessage.message}
              onChange={(e) =>
                setNewMessage((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder='Describe your question or issue in detail...'
              className='border-border min-h-[120px]'
              required
            />
          </div>

          <div className='flex justify-end'>
            <Button
              onClick={sendMessage}
              disabled={
                isSending ||
                !newMessage.subject.trim() ||
                !newMessage.message.trim()
              }
              className='bg-primary hover:bg-primary/90'
            >
              {isSending ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                  Sending...
                </>
              ) : (
                <>
                  <Send className='w-4 h-4 mr-2' />
                  Send to Accountant
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Message History */}
      <Card className='border-border'>
        <CardHeader>
          <CardTitle>Message History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className='border border-border rounded-lg p-4'
              >
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-3'>
                    <User className='w-8 h-8 text-muted-foreground' />
                    <div>
                      <h4 className='font-medium text-foreground'>
                        {message.subject}
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        {new Date(message.createdAt).toLocaleDateString()} at{" "}
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge className={getPriorityColor(message.priority)}>
                      {message.priority}
                    </Badge>
                    <Badge className={getStatusColor(message.status)}>
                      {getStatusIcon(message.status)}
                      {message.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>

                <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3'>
                  <p className='text-sm text-foreground'>{message.message}</p>
                </div>

                {message.response && (
                  <div className='bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 border-l-4 border-blue-500'>
                    <div className='flex items-center gap-2 mb-2'>
                      <MessageSquare className='w-4 h-4 text-blue-600' />
                      <span className='text-sm font-medium text-blue-600'>
                        Accountant Response
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        {message.responseDate &&
                          new Date(message.responseDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className='text-sm text-foreground'>
                      {message.response}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {messages.length === 0 && (
              <div className='text-center py-8 text-muted-foreground'>
                <MessageSquare className='w-12 h-12 mx-auto mb-4 opacity-50' />
                <p>No messages yet. Send your first message to get started!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className='border-border bg-green-50 dark:bg-green-950/20'>
        <CardContent className='p-6'>
          <div className='flex items-center gap-3'>
            <MessageSquare className='w-6 h-6 text-green-600' />
            <div>
              <h3 className='font-semibold text-foreground'>
                Direct Communication
              </h3>
              <p className='text-sm text-muted-foreground'>
                All messages are sent directly to your accountant at{" "}
                <span className='font-medium text-green-600'>
                  commercialista@agenziareduco.it
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

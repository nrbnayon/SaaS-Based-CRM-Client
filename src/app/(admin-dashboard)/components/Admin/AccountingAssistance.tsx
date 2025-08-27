// src/app/(admin-dashboard)/components/Admin/AccountingAssistance.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calculator,
  MessageSquare,
  Send,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CustomerRequest {
  id: string;
  customerName: string;
  email: string;
  category: "invoice" | "vat" | "bank-statement" | "general" | "urgent";
  priority: "low" | "medium" | "high" | "urgent";
  subject: string;
  message: string;
  status: "open" | "in-progress" | "resolved";
  createdDate: string;
  lastUpdate: string;
  assignedTo?: string;
}

interface ChatMessage {
  id: string;
  sender: "customer" | "admin";
  message: string;
  timestamp: string;
  customerName?: string;
}

const mockRequests: CustomerRequest[] = [
  {
    id: "REQ-001",
    customerName: "TechNova Solutions",
    email: "admin@technova.com",
    category: "invoice",
    priority: "high",
    subject: "Invoice generation issue",
    message: "I'm having trouble generating invoices for my clients. The PDF export is not working properly.",
    status: "open",
    createdDate: "2024-01-20T09:00:00Z",
    lastUpdate: "2024-01-20T09:00:00Z",
  },
  {
    id: "REQ-002",
    customerName: "Digital Marketing Pro",
    email: "info@digitalmarketing.com",
    category: "vat",
    priority: "urgent",
    subject: "VAT calculation question",
    message: "I need clarification on VAT calculation for international clients. How should I handle EU vs non-EU customers?",
    status: "in-progress",
    createdDate: "2024-01-19T14:30:00Z",
    lastUpdate: "2024-01-20T11:15:00Z",
    assignedTo: "Maria Rossi",
  },
  {
    id: "REQ-003",
    customerName: "Freelancer Studio",
    email: "contact@freelancer.com",
    category: "bank-statement",
    priority: "medium",
    subject: "Bank statement upload",
    message: "My bank statement upload keeps failing. The file is under 10MB but still won't process.",
    status: "resolved",
    createdDate: "2024-01-18T16:45:00Z",
    lastUpdate: "2024-01-19T10:30:00Z",
    assignedTo: "Giuseppe Verdi",
  },
];

const mockChatMessages: ChatMessage[] = [
  {
    id: "MSG-001",
    sender: "customer",
    message: "Hello, I need help with my invoice settings",
    timestamp: "2024-01-20T10:30:00Z",
    customerName: "TechNova Solutions",
  },
  {
    id: "MSG-002",
    sender: "admin",
    message: "Hello! I'd be happy to help you with your invoice settings. What specific issue are you experiencing?",
    timestamp: "2024-01-20T10:32:00Z",
  },
  {
    id: "MSG-003",
    sender: "customer",
    message: "The VAT calculation seems incorrect on my generated invoices",
    timestamp: "2024-01-20T10:35:00Z",
    customerName: "TechNova Solutions",
  },
];

export const AccountingAssistance = () => {
  const [requests, setRequests] = useState<CustomerRequest[]>(mockRequests);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [selectedRequest, setSelectedRequest] = useState<CustomerRequest | null>(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [newChatMessage, setNewChatMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const getStatusIcon = (status: CustomerRequest["status"]) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "open":
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: CustomerRequest["status"]) => {
    switch (status) {
      case "resolved":
        return "bg-success/10 text-success border-success";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "open":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getPriorityColor = (priority: CustomerRequest["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-error/10 text-error border-error";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: CustomerRequest["category"]) => {
    switch (category) {
      case "urgent":
        return "bg-error/10 text-error border-error";
      case "invoice":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "vat":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "bank-statement":
        return "bg-green-100 text-green-800 border-green-200";
      case "general":
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleRespondToRequest = (request: CustomerRequest) => {
    setSelectedRequest(request);
    setIsResponseModalOpen(true);
  };

  const sendResponse = () => {
    if (selectedRequest && responseMessage.trim()) {
      // Update request status
      setRequests(prev =>
        prev.map(req =>
          req.id === selectedRequest.id
            ? { ...req, status: "resolved", lastUpdate: new Date().toISOString() }
            : req
        )
      );

      console.log("Response sent:", {
        requestId: selectedRequest.id,
        customerEmail: selectedRequest.email,
        response: responseMessage,
        respondedBy: "Administrator",
        timestamp: new Date().toISOString(),
      });

      setIsResponseModalOpen(false);
      setResponseMessage("");
      setSelectedRequest(null);
    }
  };

  const sendChatMessage = () => {
    if (newChatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: `MSG-${Date.now()}`,
        sender: "admin",
        message: newChatMessage,
        timestamp: new Date().toISOString(),
      };

      setChatMessages(prev => [...prev, newMessage]);
      setNewChatMessage("");

      console.log("Chat message sent:", newMessage);
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || request.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Calculate statistics
  const openRequests = requests.filter(r => r.status === "open").length;
  const inProgressRequests = requests.filter(r => r.status === "in-progress").length;
  const resolvedRequests = requests.filter(r => r.status === "resolved").length;
  const urgentRequests = requests.filter(r => r.priority === "urgent").length;

  return (
    <div className="p-4 space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Open Requests</p>
                <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                  {openRequests}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">In Progress</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {inProgressRequests}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Resolved</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {resolvedRequests}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 dark:text-red-400">Urgent</p>
                <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                  {urgentRequests}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-background border border-border">
          <TabsTrigger 
            value="requests" 
            className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            <Calculator className="w-4 h-4" />
            Customer Requests
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            <MessageSquare className="w-4 h-4" />
            Direct Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Customer Support Requests</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-32">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="vat">VAT</SelectItem>
                      <SelectItem value="bank-statement">Bank Statement</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.customerName}</div>
                            <div className="text-sm text-muted-foreground">{request.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(request.category)}>
                            {request.category.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {request.subject}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            {request.status.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(request.createdDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {request.assignedTo ? (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              {request.assignedTo}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRespondToRequest(request)}
                            disabled={request.status === "resolved"}
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="border-border h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Direct Customer Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "admin" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className="max-w-xs lg:max-w-md">
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.sender === "admin"
                                ? "bg-red-600 text-white"
                                : "bg-white border border-border text-foreground"
                            }`}
                          >
                            {message.sender === "customer" && message.customerName && (
                              <div className="text-xs text-muted-foreground mb-1">
                                {message.customerName}
                              </div>
                            )}
                            <p className="text-sm">{message.message}</p>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 px-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="flex items-center gap-2">
                    <Input
                      value={newChatMessage}
                      onChange={(e) => setNewChatMessage(e.target.value)}
                      placeholder="Type your response..."
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendChatMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={sendChatMessage}
                      disabled={!newChatMessage.trim()}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat History */}
            <div>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Chat History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">TechNova Solutions</span>
                        <span className="text-xs text-muted-foreground">Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last message: 2 minutes ago
                      </p>
                    </div>

                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Digital Marketing Pro</span>
                        <span className="text-xs text-muted-foreground">1 hour ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Resolved: VAT calculation issue
                      </p>
                    </div>

                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Freelancer Studio</span>
                        <span className="text-xs text-muted-foreground">Yesterday</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Resolved: Bank statement upload
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Response Modal */}
      <Dialog open={isResponseModalOpen} onOpenChange={setIsResponseModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              Respond to Request
            </DialogTitle>
            <DialogDescription>
              Send a direct response to {selectedRequest?.customerName}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Original Request</h4>
                <div className="text-sm space-y-1">
                  <div><strong>Subject:</strong> {selectedRequest.subject}</div>
                  <div><strong>Category:</strong> {selectedRequest.category}</div>
                  <div><strong>Message:</strong></div>
                  <div className="p-2 bg-white dark:bg-gray-700 rounded border">
                    {selectedRequest.message}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Your Response</label>
                <Textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder="Type your response to the customer..."
                  className="mt-2"
                  rows={6}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResponseModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={sendResponse}
              disabled={!responseMessage.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
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
  UserCheck,
  Trash2,
  Archive,
  Eye,
  Phone,
  Mail,
  Calendar,
  FileText,
  Edit,
  Star,
  StarOff,
  MoreVertical,
  UserPlus,
  RefreshCw,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  customerId?: string;
}

interface ChatHistory {
  id: string;
  customerName: string;
  customerId: string;
  email: string;
  lastMessage: string;
  lastMessageTime: string;
  status: "active" | "resolved" | "idle";
  unreadCount: number;
  isStarred: boolean;
  avatar?: string;
}

const mockRequests: CustomerRequest[] = [
  {
    id: "REQ-001",
    customerName: "TechNova Solutions",
    email: "admin@technova.com",
    category: "invoice",
    priority: "high",
    subject: "Invoice generation issue",
    message:
      "I'm having trouble generating invoices for my clients. The PDF export is not working properly.",
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
    message:
      "I need clarification on VAT calculation for international clients. How should I handle EU vs non-EU customers?",
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
    message:
      "My bank statement upload keeps failing. The file is under 10MB but still won't process.",
    status: "resolved",
    createdDate: "2024-01-18T16:45:00Z",
    lastUpdate: "2024-01-19T10:30:00Z",
    assignedTo: "Giuseppe Verdi",
  },
  {
    id: "REQ-004",
    customerName: "Creative Agency Ltd",
    email: "support@creativeagency.com",
    category: "general",
    priority: "low",
    subject: "Account settings question",
    message: "How do I change my company details in the account settings?",
    status: "open",
    createdDate: "2024-01-20T08:30:00Z",
    lastUpdate: "2024-01-20T08:30:00Z",
  },
];

const mockChatMessages: ChatMessage[] = [
  {
    id: "MSG-001",
    sender: "customer",
    message: "Hello, I need help with my invoice settings",
    timestamp: "2024-01-20T10:30:00Z",
    customerName: "TechNova Solutions",
    customerId: "CUST-001",
  },
  {
    id: "MSG-002",
    sender: "admin",
    message:
      "Hello! I'd be happy to help you with your invoice settings. What specific issue are you experiencing?",
    timestamp: "2024-01-20T10:32:00Z",
  },
  {
    id: "MSG-003",
    sender: "customer",
    message: "The VAT calculation seems incorrect on my generated invoices",
    timestamp: "2024-01-20T10:35:00Z",
    customerName: "TechNova Solutions",
    customerId: "CUST-001",
  },
  {
    id: "MSG-004",
    sender: "admin",
    message:
      "I understand your concern. Could you please share your VAT rate settings? Go to Settings > Tax Settings and let me know what percentage is configured.",
    timestamp: "2024-01-20T10:37:00Z",
  },
];

const mockChatHistory: ChatHistory[] = [
  {
    id: "CHAT-001",
    customerName: "TechNova Solutions",
    customerId: "CUST-001",
    email: "admin@technova.com",
    lastMessage: "The VAT calculation seems incorrect on my generated invoices",
    lastMessageTime: "2024-01-20T10:35:00Z",
    status: "active",
    unreadCount: 2,
    isStarred: true,
  },
  {
    id: "CHAT-002",
    customerName: "Digital Marketing Pro",
    customerId: "CUST-002",
    email: "info@digitalmarketing.com",
    lastMessage: "Thank you for resolving the VAT issue!",
    lastMessageTime: "2024-01-20T09:15:00Z",
    status: "resolved",
    unreadCount: 0,
    isStarred: false,
  },
  {
    id: "CHAT-003",
    customerName: "Freelancer Studio",
    customerId: "CUST-003",
    email: "contact@freelancer.com",
    lastMessage: "Great! The bank statement upload is working now.",
    lastMessageTime: "2024-01-19T16:20:00Z",
    status: "resolved",
    unreadCount: 0,
    isStarred: false,
  },
  {
    id: "CHAT-004",
    customerName: "Creative Agency Ltd",
    customerId: "CUST-004",
    email: "support@creativeagency.com",
    lastMessage: "Hi, I have a question about account settings",
    lastMessageTime: "2024-01-19T14:10:00Z",
    status: "idle",
    unreadCount: 1,
    isStarred: false,
  },
  {
    id: "CHAT-005",
    customerName: "StartUp Innovations",
    customerId: "CUST-005",
    email: "hello@startup.com",
    lastMessage: "Is there a mobile app available?",
    lastMessageTime: "2024-01-18T11:30:00Z",
    status: "idle",
    unreadCount: 1,
    isStarred: true,
  },
];

const adminUsers = [
  "Maria Rossi",
  "Giuseppe Verdi",
  "Francesco Romano",
  "Elena Bianchi",
];

export const AccountingAssistance = () => {
  const [requests, setRequests] = useState<CustomerRequest[]>(mockRequests);
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(mockChatMessages);
  const [chatHistory, setChatHistory] =
    useState<ChatHistory[]>(mockChatHistory);
  const [selectedRequest, setSelectedRequest] =
    useState<CustomerRequest | null>(null);
  const [selectedChatCustomer, setSelectedChatCustomer] =
    useState<ChatHistory | null>(chatHistory[0]);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [isRequestDetailModalOpen, setIsRequestDetailModalOpen] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newChatMessage, setNewChatMessage] = useState("");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [chatSearchTerm, setChatSearchTerm] = useState("");
  const [chatStatusFilter, setChatStatusFilter] = useState("all");
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
        return <CheckCircle className='w-4 h-4 text-green-600' />;
      case "in-progress":
        return <Clock className='w-4 h-4 text-blue-600' />;
      case "open":
      default:
        return <AlertCircle className='w-4 h-4 text-yellow-600' />;
    }
  };

  const getStatusColor = (status: CustomerRequest["status"]) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
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
        return "bg-red-100 text-red-800 border-red-200";
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
        return "bg-red-100 text-red-800 border-red-200";
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

  const getChatStatusColor = (status: ChatHistory["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "resolved":
        return "bg-gray-400";
      case "idle":
      default:
        return "bg-yellow-500";
    }
  };

  const handleRespondToRequest = (request: CustomerRequest) => {
    setSelectedRequest(request);
    setIsResponseModalOpen(true);
  };

  const handleViewRequestDetails = (request: CustomerRequest) => {
    setSelectedRequest(request);
    setIsRequestDetailModalOpen(true);
  };

  const handleAssignRequest = (requestId: string, assignee: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              assignedTo: assignee,
              status: "in-progress" as const,
              lastUpdate: new Date().toISOString(),
            }
          : req
      )
    );
  };

  const handleUpdateRequestStatus = (
    requestId: string,
    status: CustomerRequest["status"]
  ) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status, lastUpdate: new Date().toISOString() }
          : req
      )
    );
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case "assign":
        // Open assign modal or dropdown
        break;
      case "resolve":
        setRequests((prev) =>
          prev.map((req) =>
            selectedRequests.includes(req.id)
              ? {
                  ...req,
                  status: "resolved",
                  lastUpdate: new Date().toISOString(),
                }
              : req
          )
        );
        setSelectedRequests([]);
        break;
      case "delete":
        setRequests((prev) =>
          prev.filter((req) => !selectedRequests.includes(req.id))
        );
        setSelectedRequests([]);
        break;
    }
  };

  const sendResponse = () => {
    if (selectedRequest && responseMessage.trim()) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest.id
            ? {
                ...req,
                status: "resolved",
                lastUpdate: new Date().toISOString(),
              }
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
    if (newChatMessage.trim() && selectedChatCustomer) {
      const newMessage: ChatMessage = {
        id: `MSG-${Date.now()}`,
        sender: "admin",
        message: newChatMessage,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, newMessage]);

      // Update chat history
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === selectedChatCustomer.id
            ? {
                ...chat,
                lastMessage: `Admin: ${newChatMessage}`,
                lastMessageTime: new Date().toISOString(),
                status: "active" as const,
              }
            : chat
        )
      );

      setNewChatMessage("");
    }
  };

  const handleSelectChatCustomer = (customer: ChatHistory) => {
    setSelectedChatCustomer(customer);

    // Mark as read
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === customer.id ? { ...chat, unreadCount: 0 } : chat
      )
    );

    // Filter messages for this customer
    const customerMessages = mockChatMessages.filter(
      (msg) => msg.customerId === customer.customerId || msg.sender === "admin"
    );
    setChatMessages(customerMessages);
  };

  const handleToggleStarred = (chatId: string) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, isStarred: !chat.isStarred } : chat
      )
    );
  };

  const handleArchiveChat = (chatId: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || request.category === categoryFilter;
    const matchesPriority =
      priorityFilter === "all" || request.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const filteredChatHistory = chatHistory.filter((chat) => {
    const matchesSearch =
      chat.customerName.toLowerCase().includes(chatSearchTerm.toLowerCase()) ||
      chat.email.toLowerCase().includes(chatSearchTerm.toLowerCase());

    const matchesStatus =
      chatStatusFilter === "all" || chat.status === chatStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const openRequests = requests.filter((r) => r.status === "open").length;
  const inProgressRequests = requests.filter(
    (r) => r.status === "in-progress"
  ).length;
  const resolvedRequests = requests.filter(
    (r) => r.status === "resolved"
  ).length;
  const urgentRequests = requests.filter((r) => r.priority === "urgent").length;

  return (
    <div className='p-4 space-y-6'>
      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='border-border bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-yellow-600 dark:text-yellow-400'>
                  Open Requests
                </p>
                <p className='text-2xl font-bold text-yellow-800 dark:text-yellow-200'>
                  {openRequests}
                </p>
              </div>
              <AlertCircle className='w-8 h-8 text-yellow-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-blue-600 dark:text-blue-400'>
                  In Progress
                </p>
                <p className='text-2xl font-bold text-blue-800 dark:text-blue-200'>
                  {inProgressRequests}
                </p>
              </div>
              <Clock className='w-8 h-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-green-600 dark:text-green-400'>
                  Resolved
                </p>
                <p className='text-2xl font-bold text-green-800 dark:text-green-200'>
                  {resolvedRequests}
                </p>
              </div>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-red-600 dark:text-red-400'>Urgent</p>
                <p className='text-2xl font-bold text-red-800 dark:text-red-200'>
                  {urgentRequests}
                </p>
              </div>
              <AlertCircle className='w-8 h-8 text-red-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue='requests' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 bg-background border border-border'>
          <TabsTrigger
            value='requests'
            className='flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white'
          >
            <Calculator className='w-4 h-4' />
            Customer Requests
          </TabsTrigger>
          <TabsTrigger
            value='chat'
            className='flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white'
          >
            <MessageSquare className='w-4 h-4' />
            Direct Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value='requests' className='mt-6'>
          <Card className='border-border'>
            <CardHeader>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <CardTitle>Customer Support Requests</CardTitle>
                <div className='flex items-center gap-2 flex-wrap'>
                  {selectedRequests.length > 0 && (
                    <div className='flex items-center gap-2 mr-4'>
                      <span className='text-sm text-muted-foreground'>
                        {selectedRequests.length} selected
                      </span>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleBulkAction("resolve")}
                      >
                        <CheckCircle className='w-4 h-4 mr-1' />
                        Mark Resolved
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleBulkAction("delete")}
                      >
                        <Trash2 className='w-4 h-4 mr-1' />
                        Delete
                      </Button>
                    </div>
                  )}

                  <div className='flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background'>
                    <Search className='w-4 h-4 text-muted-foreground' />
                    <Input
                      placeholder='Search requests...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-48'
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className='w-32'>
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Status</SelectItem>
                      <SelectItem value='open'>Open</SelectItem>
                      <SelectItem value='in-progress'>In Progress</SelectItem>
                      <SelectItem value='resolved'>Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className='w-32'>
                      <Filter className='w-4 h-4 mr-2' />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Categories</SelectItem>
                      <SelectItem value='invoice'>Invoice</SelectItem>
                      <SelectItem value='vat'>VAT</SelectItem>
                      <SelectItem value='bank-statement'>
                        Bank Statement
                      </SelectItem>
                      <SelectItem value='general'>General</SelectItem>
                      <SelectItem value='urgent'>Urgent</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                  >
                    <SelectTrigger className='w-32'>
                      <SelectValue placeholder='Priority' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Priority</SelectItem>
                      <SelectItem value='urgent'>Urgent</SelectItem>
                      <SelectItem value='high'>High</SelectItem>
                      <SelectItem value='medium'>Medium</SelectItem>
                      <SelectItem value='low'>Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant='outline' size='sm'>
                    <RefreshCw className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-12'>
                        <Checkbox
                          checked={
                            selectedRequests.length ===
                              filteredRequests.length &&
                            filteredRequests.length > 0
                          }
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRequests(
                                filteredRequests.map((r) => r.id)
                              );
                            } else {
                              setSelectedRequests([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id} className='hover:bg-muted/50'>
                        <TableCell>
                          <Checkbox
                            checked={selectedRequests.includes(request.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRequests((prev) => [
                                  ...prev,
                                  request.id,
                                ]);
                              } else {
                                setSelectedRequests((prev) =>
                                  prev.filter((id) => id !== request.id)
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div
                            className='cursor-pointer'
                            onClick={() => handleViewRequestDetails(request)}
                          >
                            <div className='font-medium hover:text-blue-600'>
                              {request.customerName}
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              {request.email}
                            </div>
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
                        <TableCell className='max-w-xs truncate'>
                          <div
                            className='cursor-pointer hover:text-blue-600'
                            onClick={() => handleViewRequestDetails(request)}
                          >
                            {request.subject}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            {request.status.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className='text-sm'>
                            {new Date(request.createdDate).toLocaleDateString()}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            {new Date(request.createdDate).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.assignedTo ? (
                            <div className='flex items-center gap-2'>
                              <Avatar className='w-6 h-6'>
                                <AvatarFallback className='text-xs'>
                                  {request.assignedTo
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className='text-sm'>
                                {request.assignedTo}
                              </span>
                            </div>
                          ) : (
                            <Select
                              onValueChange={(value) =>
                                handleAssignRequest(request.id, value)
                              }
                            >
                              <SelectTrigger className='w-32 h-8'>
                                <SelectValue placeholder='Assign' />
                              </SelectTrigger>
                              <SelectContent>
                                {adminUsers.map((user) => (
                                  <SelectItem key={user} value={user}>
                                    {user}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex items-center gap-1'>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleViewRequestDetails(request)}
                            >
                              <Eye className='w-4 h-4' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleRespondToRequest(request)}
                              disabled={request.status === "resolved"}
                            >
                              <MessageSquare className='w-4 h-4' />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='sm'>
                                  <MoreVertical className='w-4 h-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateRequestStatus(
                                      request.id,
                                      "in-progress"
                                    )
                                  }
                                >
                                  <Clock className='w-4 h-4 mr-2' />
                                  Mark In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateRequestStatus(
                                      request.id,
                                      "resolved"
                                    )
                                  }
                                >
                                  <CheckCircle className='w-4 h-4 mr-2' />
                                  Mark Resolved
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    console.log("Archive", request.id)
                                  }
                                >
                                  <Archive className='w-4 h-4 mr-2' />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className='text-red-600'
                                  onClick={() =>
                                    console.log("Delete", request.id)
                                  }
                                >
                                  <Trash2 className='w-4 h-4 mr-2' />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='chat' className='mt-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Chat Interface */}
            <div className='lg:col-span-2'>
              <Card className='border-border h-[600px] flex flex-col'>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <MessageSquare className='w-5 h-5 text-blue-600' />
                      <div>
                        <CardTitle className='text-lg'>
                          {selectedChatCustomer
                            ? selectedChatCustomer.customerName
                            : "Select a conversation"}
                        </CardTitle>
                        {selectedChatCustomer && (
                          <p className='text-sm text-muted-foreground'>
                            {selectedChatCustomer.email}
                          </p>
                        )}
                      </div>
                    </div>
                    {selectedChatCustomer && (
                      <div className='flex items-center gap-2'>
                        <Badge
                          className={`${getChatStatusColor(
                            selectedChatCustomer.status
                          )} text-white`}
                        >
                          {selectedChatCustomer.status}
                        </Badge>
                        <Button variant='ghost' size='sm'>
                          <Phone className='w-4 h-4' />
                        </Button>
                        <Button variant='ghost' size='sm'>
                          <Mail className='w-4 h-4' />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className='flex-1 flex flex-col'>
                  {selectedChatCustomer ? (
                    <>
                      {/* Messages Area */}
                      <div className='flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                        {chatMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender === "admin"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div className='max-w-xs lg:max-w-md'>
                              <div
                                className={`px-4 py-2 rounded-lg ${
                                  message.sender === "admin"
                                    ? "bg-red-600 text-white"
                                    : "bg-white border border-border text-foreground shadow-sm"
                                }`}
                              >
                                {message.sender === "customer" &&
                                  message.customerName && (
                                    <div className='text-xs text-muted-foreground mb-1 font-medium'>
                                      {message.customerName}
                                    </div>
                                  )}
                                <p className='text-sm'>{message.message}</p>
                              </div>
                              <div
                                className={`text-xs text-muted-foreground mt-1 px-1 ${
                                  message.sender === "admin"
                                    ? "text-right"
                                    : "text-left"
                                }`}
                              >
                                {new Date(
                                  message.timestamp
                                ).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>

                      {/* Message Input */}
                      <div className='flex items-center gap-2 p-2 border border-border rounded-lg bg-background'>
                        <Input
                          value={newChatMessage}
                          onChange={(e) => setNewChatMessage(e.target.value)}
                          placeholder='Type your response...'
                          className='flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
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
                          className='bg-red-600 hover:bg-red-700'
                          size='sm'
                        >
                          <Send className='w-4 h-4' />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className='flex-1 flex items-center justify-center text-muted-foreground'>
                      <div className='text-center'>
                        <MessageSquare className='w-12 h-12 mx-auto mb-4 opacity-50' />
                        <p>Select a conversation to start chatting</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Chat History */}
            <div>
              <Card className='border-border h-[600px] flex flex-col'>
                <CardHeader>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <CardTitle className='text-lg'>Chat History</CardTitle>
                      <Button variant='ghost' size='sm'>
                        <RefreshCw className='w-4 h-4' />
                      </Button>
                    </div>

                    {/* Chat Search */}
                    <div className='flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background'>
                      <Search className='w-4 h-4 text-muted-foreground' />
                      <Input
                        placeholder='Search chats...'
                        value={chatSearchTerm}
                        onChange={(e) => setChatSearchTerm(e.target.value)}
                        className='border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm'
                      />
                    </div>

                    {/* Chat Status Filter */}
                    <Select
                      value={chatStatusFilter}
                      onValueChange={setChatStatusFilter}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Filter by status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Chats</SelectItem>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='resolved'>Resolved</SelectItem>
                        <SelectItem value='idle'>Idle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>

                <CardContent className='flex-1 overflow-y-auto p-0'>
                  <div className='space-y-1'>
                    {filteredChatHistory.map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedChatCustomer?.id === chat.id
                            ? "bg-red-50 dark:bg-red-950/20 border-l-4 border-l-red-600"
                            : ""
                        }`}
                        onClick={() => handleSelectChatCustomer(chat)}
                      >
                        <div className='flex items-start justify-between gap-3'>
                          <div className='flex items-start gap-3 min-w-0 flex-1'>
                            <div className='relative'>
                              <Avatar className='w-10 h-10'>
                                <AvatarFallback className='text-sm bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
                                  {chat.customerName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getChatStatusColor(
                                  chat.status
                                )}`}
                              />
                            </div>

                            <div className='min-w-0 flex-1'>
                              <div className='flex items-center gap-2 mb-1'>
                                <span className='font-medium text-sm truncate'>
                                  {chat.customerName}
                                </span>
                                {chat.isStarred && (
                                  <Star className='w-3 h-3 text-yellow-500 fill-yellow-500 flex-shrink-0' />
                                )}
                                {chat.unreadCount > 0 && (
                                  <Badge className='bg-red-600 text-white text-xs px-1.5 py-0.5 h-5 min-w-[20px] flex items-center justify-center'>
                                    {chat.unreadCount}
                                  </Badge>
                                )}
                              </div>

                              <p className='text-xs text-muted-foreground truncate mb-1'>
                                {chat.email}
                              </p>

                              <p className='text-xs text-foreground/80 line-clamp-2 leading-4'>
                                {chat.lastMessage}
                              </p>

                              <div className='flex items-center justify-between mt-2'>
                                <span className='text-xs text-muted-foreground'>
                                  {new Date(
                                    chat.lastMessageTime
                                  ).toLocaleString()}
                                </span>
                                <div className='flex items-center gap-1'>
                                  <Badge
                                    variant='outline'
                                    className='text-xs px-1.5 py-0.5 h-5'
                                  >
                                    {chat.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='h-6 w-6 p-0 hover:bg-muted'
                              >
                                <MoreVertical className='w-3 h-3' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-48'>
                              <DropdownMenuItem
                                onClick={() => handleToggleStarred(chat.id)}
                              >
                                {chat.isStarred ? (
                                  <>
                                    <StarOff className='w-4 h-4 mr-2' />
                                    Remove Star
                                  </>
                                ) : (
                                  <>
                                    <Star className='w-4 h-4 mr-2' />
                                    Add Star
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserCheck className='w-4 h-4 mr-2' />
                                Mark as Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className='w-4 h-4 mr-2' />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleArchiveChat(chat.id)}
                              >
                                <Archive className='w-4 h-4 mr-2' />
                                Archive Chat
                              </DropdownMenuItem>
                              <DropdownMenuItem className='text-red-600'>
                                <Trash2 className='w-4 h-4 mr-2' />
                                Delete Chat
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}

                    {filteredChatHistory.length === 0 && (
                      <div className='p-8 text-center text-muted-foreground'>
                        <MessageSquare className='w-8 h-8 mx-auto mb-2 opacity-50' />
                        <p className='text-sm'>No chat conversations found</p>
                      </div>
                    )}
                  </div>
                </CardContent>

                <div className='p-4 border-t border-border'>
                  <Button
                    className='w-full bg-red-600 hover:bg-red-700'
                    size='sm'
                  >
                    <UserPlus className='w-4 h-4 mr-2' />
                    Start New Chat
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Response Modal */}
      <Dialog open={isResponseModalOpen} onOpenChange={setIsResponseModalOpen}>
        <DialogContent className='w-full md:min-w-4xl'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <MessageSquare className='w-5 h-5 text-red-600' />
              Respond to Request
            </DialogTitle>
            <DialogDescription>
              Send a direct response to {selectedRequest?.customerName}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                  <h4 className='font-medium mb-3'>Customer Information</h4>
                  <div className='space-y-2 text-sm'>
                    <div>
                      <strong>Name:</strong> {selectedRequest.customerName}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedRequest.email}
                    </div>
                    <div className='flex items-center gap-2'>
                      <strong>Priority:</strong>
                      <Badge
                        className={getPriorityColor(selectedRequest.priority)}
                      >
                        {selectedRequest.priority}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-2'>
                      <strong>Category:</strong>
                      <Badge
                        className={getCategoryColor(selectedRequest.category)}
                      >
                        {selectedRequest.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className='p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg'>
                  <h4 className='font-medium mb-3'>Request Details</h4>
                  <div className='space-y-2 text-sm'>
                    <div>
                      <strong>ID:</strong> {selectedRequest.id}
                    </div>
                    <div>
                      <strong>Created:</strong>{" "}
                      {new Date(selectedRequest.createdDate).toLocaleString()}
                    </div>
                    <div>
                      <strong>Last Updated:</strong>{" "}
                      {new Date(selectedRequest.lastUpdate).toLocaleString()}
                    </div>
                    <div>
                      <strong>Assigned to:</strong>{" "}
                      {selectedRequest.assignedTo || "Unassigned"}
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <h4 className='font-medium mb-2'>Original Request</h4>
                <div className='text-sm space-y-2'>
                  <div>
                    <strong>Subject:</strong> {selectedRequest.subject}
                  </div>
                  <div>
                    <strong>Message:</strong>
                  </div>
                  <div className='p-3 bg-white dark:bg-gray-700 rounded border max-h-32 overflow-y-auto'>
                    {selectedRequest.message}
                  </div>
                </div>
              </div>

              <div>
                <label className='text-sm font-medium text-foreground mb-2 block'>
                  Your Response
                </label>
                <Textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder='Type your response to the customer...'
                  className='min-h-32'
                  rows={8}
                />
                <div className='flex justify-between items-center mt-2'>
                  <span className='text-xs text-muted-foreground'>
                    {responseMessage.length} characters
                  </span>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm'>
                      <FileText className='w-4 h-4 mr-1' />
                      Template
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Edit className='w-4 h-4 mr-1' />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsResponseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={sendResponse}
              disabled={!responseMessage.trim()}
              className='bg-red-600 hover:bg-red-700'
            >
              <Send className='w-4 h-4 mr-2' />
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Details Modal */}
      <Dialog
        open={isRequestDetailModalOpen}
        onOpenChange={setIsRequestDetailModalOpen}
      >
        <DialogContent className='w-full md:min-w-4xl'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Eye className='w-5 h-5 text-blue-600' />
              Request Details
            </DialogTitle>
            <DialogDescription>
              Full details for request {selectedRequest?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className='space-y-6'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 space-y-4'>
                  <div className='p-4 border border-border rounded-lg'>
                    <h4 className='font-medium mb-3'>Request Information</h4>
                    <div className='space-y-3'>
                      <div>
                        <label className='text-sm font-medium text-muted-foreground'>
                          Subject
                        </label>
                        <p className='text-sm mt-1'>
                          {selectedRequest.subject}
                        </p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-muted-foreground'>
                          Message
                        </label>
                        <div className='mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded border text-sm max-h-48 overflow-y-auto'>
                          {selectedRequest.message}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='p-4 border border-border rounded-lg'>
                    <h4 className='font-medium mb-3'>Customer</h4>
                    <div className='space-y-2 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Avatar className='w-8 h-8'>
                          <AvatarFallback className='text-xs'>
                            {selectedRequest.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium'>
                            {selectedRequest.customerName}
                          </div>
                          <div className='text-muted-foreground'>
                            {selectedRequest.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-4 border border-border rounded-lg'>
                    <h4 className='font-medium mb-3'>Status & Priority</h4>
                    <div className='space-y-3'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>
                          Status:
                        </span>
                        <Badge
                          className={getStatusColor(selectedRequest.status)}
                        >
                          {getStatusIcon(selectedRequest.status)}
                          {selectedRequest.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>
                          Priority:
                        </span>
                        <Badge
                          className={getPriorityColor(selectedRequest.priority)}
                        >
                          {selectedRequest.priority}
                        </Badge>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>
                          Category:
                        </span>
                        <Badge
                          className={getCategoryColor(selectedRequest.category)}
                        >
                          {selectedRequest.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className='p-4 border border-border rounded-lg'>
                    <h4 className='font-medium mb-3'>Timeline</h4>
                    <div className='space-y-2 text-sm'>
                      <div className='flex items-center gap-2 text-muted-foreground'>
                        <Calendar className='w-4 h-4' />
                        Created:{" "}
                        {new Date(selectedRequest.createdDate).toLocaleString()}
                      </div>
                      <div className='flex items-center gap-2 text-muted-foreground'>
                        <Clock className='w-4 h-4' />
                        Updated:{" "}
                        {new Date(selectedRequest.lastUpdate).toLocaleString()}
                      </div>
                      {selectedRequest.assignedTo && (
                        <div className='flex items-center gap-2 text-muted-foreground'>
                          <User className='w-4 h-4' />
                          Assigned: {selectedRequest.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsRequestDetailModalOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setIsRequestDetailModalOpen(false);
                handleRespondToRequest(selectedRequest!);
              }}
            >
              <MessageSquare className='w-4 h-4 mr-2' />
              Respond
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

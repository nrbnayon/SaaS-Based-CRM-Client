// src/data/adminData.ts

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  subscriptionType: "flat-rate" | "business" | "premium";
  status: "active" | "pending" | "cancelled" | "overdue";
  lastPayment: string;
  nextRenewal: string;
  amount: number;
  riskLevel: "low" | "medium" | "high";
  vatNumber?: string;
  registrationDate: string;
  totalPaid: number;
  invoiceCount: number;
}

export interface AdminInvoice {
  id: string;
  customerName: string;
  customerId: string;
  vatNumber: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  issueDate: string;
  dueDate: string;
  invoiceNumber: string;
  paymentMethod?: string;
  description?: string;
}

export interface AdminTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerId: string;
  staffAssigned: string;
  requestType: "personnel-search" | "hr-support" | "recruitment" | "accounting";
  status: "open" | "in-progress" | "pending-review" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdDate: string;
  lastUpdate: string;
  description: string;
  jobTitle?: string;
  candidatesFound?: number;
  estimatedCompletion?: string;
  closeReason?: string;
  closedBy?: string;
  closedDate?: string;
}

export interface AdminStaff {
  id: string;
  name: string;
  email: string;
  role: "HR Specialist" | "Senior Recruiter" | "Recruitment Manager" | "Accountant";
  department: "HR" | "Accounting" | "Management";
  requestsAssigned: number;
  requestsCompleted: number;
  activeRequests: number;
  lastActivity: string;
  performance: number;
  joinDate: string;
  status: "active" | "inactive" | "on-leave";
}

export interface AdminRequest {
  id: string;
  customerName: string;
  customerId: string;
  email: string;
  category: "invoice" | "vat" | "bank-statement" | "general" | "urgent";
  priority: "low" | "medium" | "high" | "urgent";
  subject: string;
  message: string;
  status: "open" | "in-progress" | "resolved";
  createdDate: string;
  lastUpdate: string;
  assignedTo?: string;
  responseMessage?: string;
  responseDate?: string;
  respondedBy?: string;
}

export interface AdminChatMessage {
  id: string;
  customerId: string;
  customerName: string;
  sender: "customer" | "admin";
  message: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}

export interface AdminFinancialPlan {
  id: string;
  customerId: string;
  customerName: string;
  planType: string;
  generatedDate: string;
  status: "generated" | "sent" | "viewed" | "downloaded";
  fileSize: string;
  filePath: string;
  generatedBy: string;
}

// Mock Data
export const adminCustomers: AdminCustomer[] = [
  {
    id: "CUST-001",
    name: "TechNova Solutions",
    email: "admin@technova.com",
    subscriptionType: "premium",
    status: "active",
    lastPayment: "2024-01-15",
    nextRenewal: "2024-02-15",
    amount: 157.38,
    riskLevel: "low",
    vatNumber: "IT12345678901",
    registrationDate: "2023-06-15",
    totalPaid: 1888.56,
    invoiceCount: 12,
  },
  {
    id: "CUST-002",
    name: "Digital Marketing Pro",
    email: "info@digitalmarketing.com",
    subscriptionType: "business",
    status: "overdue",
    lastPayment: "2023-12-20",
    nextRenewal: "2024-01-20",
    amount: 120.78,
    riskLevel: "high",
    vatNumber: "IT98765432109",
    registrationDate: "2023-03-10",
    totalPaid: 1449.36,
    invoiceCount: 10,
  },
  {
    id: "CUST-003",
    name: "Freelancer Studio",
    email: "contact@freelancer.com",
    subscriptionType: "flat-rate",
    status: "active",
    lastPayment: "2024-01-10",
    nextRenewal: "2024-02-10",
    amount: 39.0,
    riskLevel: "low",
    vatNumber: "IT11223344556",
    registrationDate: "2023-08-22",
    totalPaid: 195.0,
    invoiceCount: 5,
  },
  {
    id: "CUST-004",
    name: "StartUp Innovations",
    email: "hello@startup.com",
    subscriptionType: "business",
    status: "pending",
    lastPayment: "2024-01-05",
    nextRenewal: "2024-02-05",
    amount: 120.78,
    riskLevel: "medium",
    vatNumber: "IT55667788990",
    registrationDate: "2023-11-30",
    totalPaid: 241.56,
    invoiceCount: 2,
  },
  {
    id: "CUST-005",
    name: "Enterprise Corp",
    email: "admin@enterprise.com",
    subscriptionType: "premium",
    status: "cancelled",
    lastPayment: "2023-11-15",
    nextRenewal: "2023-12-15",
    amount: 157.38,
    riskLevel: "high",
    vatNumber: "IT99887766554",
    registrationDate: "2023-01-15",
    totalPaid: 1731.18,
    invoiceCount: 11,
  },
];

export const adminInvoices: AdminInvoice[] = [
  {
    id: "INV-001",
    customerName: "TechNova Solutions",
    customerId: "CUST-001",
    vatNumber: "IT12345678901",
    amount: 157.38,
    status: "paid",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    invoiceNumber: "2024-001",
    paymentMethod: "Bank Transfer",
    description: "Premium Business Package - January 2024",
  },
  {
    id: "INV-002",
    customerName: "Digital Marketing Pro",
    customerId: "CUST-002",
    vatNumber: "IT98765432109",
    amount: 120.78,
    status: "overdue",
    issueDate: "2023-12-20",
    dueDate: "2024-01-20",
    invoiceNumber: "2023-156",
    paymentMethod: "Credit Card",
    description: "Business Package - December 2023",
  },
  {
    id: "INV-003",
    customerName: "Freelancer Studio",
    customerId: "CUST-003",
    vatNumber: "IT11223344556",
    amount: 39.0,
    status: "pending",
    issueDate: "2024-01-10",
    dueDate: "2024-02-10",
    invoiceNumber: "2024-002",
    paymentMethod: "Bank Transfer",
    description: "Flat Rate Package - January 2024",
  },
];

export const adminTickets: AdminTicket[] = [
  {
    id: "TKT-001",
    ticketNumber: "HR-2024-001",
    customerName: "TechNova Solutions",
    customerId: "CUST-001",
    staffAssigned: "Marco Rossi",
    requestType: "personnel-search",
    status: "in-progress",
    priority: "high",
    createdDate: "2024-01-15T09:00:00Z",
    lastUpdate: "2024-01-20T14:30:00Z",
    description: "Search for Senior Software Developer with 5+ years experience in React and Node.js",
    jobTitle: "Senior Software Developer",
    candidatesFound: 3,
    estimatedCompletion: "2024-01-25",
  },
  {
    id: "TKT-002",
    ticketNumber: "HR-2024-002",
    customerName: "Digital Marketing Pro",
    customerId: "CUST-002",
    staffAssigned: "Laura Bianchi",
    requestType: "recruitment",
    status: "pending-review",
    priority: "medium",
    createdDate: "2024-01-18T11:00:00Z",
    lastUpdate: "2024-01-20T16:45:00Z",
    description: "Recruitment for Digital Marketing Specialist with SEO/SEM expertise",
    jobTitle: "Digital Marketing Specialist",
    candidatesFound: 5,
    estimatedCompletion: "2024-01-22",
  },
];

export const adminStaff: AdminStaff[] = [
  {
    id: "STAFF-001",
    name: "Marco Rossi",
    email: "marco.rossi@company.com",
    role: "HR Specialist",
    department: "HR",
    requestsAssigned: 15,
    requestsCompleted: 12,
    activeRequests: 3,
    lastActivity: "2024-01-20T14:30:00Z",
    performance: 85,
    joinDate: "2023-03-15",
    status: "active",
  },
  {
    id: "STAFF-002",
    name: "Laura Bianchi",
    email: "laura.bianchi@company.com",
    role: "Senior Recruiter",
    department: "HR",
    requestsAssigned: 22,
    requestsCompleted: 20,
    activeRequests: 2,
    lastActivity: "2024-01-20T16:45:00Z",
    performance: 92,
    joinDate: "2022-11-08",
    status: "active",
  },
  {
    id: "STAFF-003",
    name: "Giuseppe Verde",
    email: "giuseppe.verde@company.com",
    role: "Recruitment Manager",
    department: "HR",
    requestsAssigned: 8,
    requestsCompleted: 6,
    activeRequests: 2,
    lastActivity: "2024-01-19T11:20:00Z",
    performance: 78,
    joinDate: "2023-01-20",
    status: "active",
  },
  {
    id: "STAFF-004",
    name: "Maria Rossi",
    email: "maria.rossi@company.com",
    role: "Accountant",
    department: "Accounting",
    requestsAssigned: 25,
    requestsCompleted: 23,
    activeRequests: 2,
    lastActivity: "2024-01-20T17:00:00Z",
    performance: 95,
    joinDate: "2022-09-12",
    status: "active",
  },
];

export const adminRequests: AdminRequest[] = [
  {
    id: "REQ-001",
    customerName: "TechNova Solutions",
    customerId: "CUST-001",
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
    customerId: "CUST-002",
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
];

export const adminFinancialPlans: AdminFinancialPlan[] = [
  {
    id: "FP-001",
    customerId: "CUST-001",
    customerName: "TechNova Solutions",
    planType: "Comprehensive Business Plan",
    generatedDate: "2024-01-18",
    status: "viewed",
    fileSize: "2.4 MB",
    filePath: "/financial-plans/technova-2024-01.pdf",
    generatedBy: "System Auto-Generate",
  },
  {
    id: "FP-002",
    customerId: "CUST-002",
    customerName: "Digital Marketing Pro",
    planType: "Financial Analysis Report",
    generatedDate: "2024-01-17",
    status: "sent",
    fileSize: "1.8 MB",
    filePath: "/financial-plans/digitalmarketing-2024-01.pdf",
    generatedBy: "Maria Rossi",
  },
];

export const adminChatMessages: AdminChatMessage[] = [
  {
    id: "MSG-001",
    customerId: "CUST-001",
    customerName: "TechNova Solutions",
    sender: "customer",
    message: "Hello, I need help with my invoice settings",
    timestamp: "2024-01-20T10:30:00Z",
    isRead: true,
  },
  {
    id: "MSG-002",
    customerId: "CUST-001",
    customerName: "TechNova Solutions",
    sender: "admin",
    message: "Hello! I'd be happy to help you with your invoice settings. What specific issue are you experiencing?",
    timestamp: "2024-01-20T10:32:00Z",
    isRead: true,
  },
  {
    id: "MSG-003",
    customerId: "CUST-001",
    customerName: "TechNova Solutions",
    sender: "customer",
    message: "The VAT calculation seems incorrect on my generated invoices",
    timestamp: "2024-01-20T10:35:00Z",
    isRead: false,
  },
];

// Helper functions
export const getCustomerById = (id: string): AdminCustomer | undefined => {
  return adminCustomers.find(customer => customer.id === id);
};

export const getTicketsByCustomer = (customerId: string): AdminTicket[] => {
  return adminTickets.filter(ticket => ticket.customerId === customerId);
};

export const getInvoicesByCustomer = (customerId: string): AdminInvoice[] => {
  return adminInvoices.filter(invoice => invoice.customerId === customerId);
};

export const getChatMessagesByCustomer = (customerId: string): AdminChatMessage[] => {
  return adminChatMessages.filter(message => message.customerId === customerId);
};

export const getStaffByRole = (role: AdminStaff["role"]): AdminStaff[] => {
  return adminStaff.filter(staff => staff.role === role);
};

export const calculateCustomerLifetimeValue = (customer: AdminCustomer): number => {
  return customer.totalPaid;
};

export const calculateMonthlyRecurringRevenue = (): number => {
  return adminCustomers
    .filter(customer => customer.status === "active")
    .reduce((total, customer) => total + customer.amount, 0);
};

export const getHighRiskCustomers = (): AdminCustomer[] => {
  return adminCustomers.filter(customer => 
    customer.riskLevel === "high" || 
    customer.status === "overdue" || 
    customer.status === "cancelled"
  );
};

export const getUpcomingRenewals = (days: number = 7): AdminCustomer[] => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);
  
  return adminCustomers.filter(customer => {
    const renewalDate = new Date(customer.nextRenewal);
    return renewalDate <= targetDate && customer.status === "active";
  });
};
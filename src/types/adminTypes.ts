// src/types/adminTypes.ts

export interface AdminDashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  overdueCustomers: number;
  totalRevenue: number;
  highRiskCustomers: number;
  monthlyGrowth: number;
  churnRate: number;
  averageRevenuePerUser: number;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  subscriptionType: "flat-rate" | "business" | "premium";
  status: "active" | "pending" | "cancelled" | "overdue";
  riskLevel: "low" | "medium" | "high";
  vatNumber?: string;
  customPricing?: number;
  totalRevenue: number;
  monthlyRevenue: number;
  registrationDate: string;
  lastPaymentDate?: string;
  nextRenewalDate?: string;
  notes?: string;
}

export interface AdminTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  staffAssigned?: string;
  requestType: "personnel-search" | "hr-support" | "recruitment" | "accounting";
  status: "open" | "in-progress" | "pending-review" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdDate: string;
  lastUpdate: string;
  description: string;
  jobTitle?: string;
  candidatesFound?: number;
  estimatedCompletion?: string;
  resolutionNotes?: string;
}

export interface AdminRequest {
  id: string;
  customerId: string;
  customerName: string;
  category: "invoice" | "vat" | "bank-statement" | "general" | "urgent";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved";
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  responseRequired: boolean;
  attachments?: string[];
  internalNotes?: string;
}

export interface AdminCustomerFilter {
  subscriptionType?: "flat-rate" | "business" | "premium" | "all";
  status?: "active" | "pending" | "cancelled" | "overdue" | "all";
  riskLevel?: "low" | "medium" | "high" | "all";
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface AdminTicketFilter {
  status?: "open" | "in-progress" | "pending-review" | "closed" | "all";
  priority?: "low" | "medium" | "high" | "urgent" | "all";
  requestType?:
    | "personnel-search"
    | "hr-support"
    | "recruitment"
    | "accounting"
    | "all";
  staffAssigned?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface AdminRequestFilter {
  category?:
    | "invoice"
    | "vat"
    | "bank-statement"
    | "general"
    | "urgent"
    | "all";
  priority?: "low" | "medium" | "high" | "urgent" | "all";
  status?: "open" | "in-progress" | "resolved" | "all";
  assignedTo?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface AdminNotification {
  id: string;
  type:
    | "customer-signup"
    | "payment-received"
    | "ticket-created"
    | "system-alert"
    | "staff-update";
  title: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  isRead: boolean;
  createdAt: string;
  relatedEntityId?: string;
  relatedEntityType?: "customer" | "ticket" | "invoice" | "staff";
  actionUrl?: string;
}

export interface AdminActivity {
  id: string;
  adminId: string;
  adminName: string;
  action:
    | "customer-updated"
    | "ticket-closed"
    | "request-responded"
    | "pricing-changed"
    | "system-config";
  description: string;
  timestamp: string;
  entityId?: string;
  entityType?: "customer" | "ticket" | "request" | "pricing" | "system";
  metadata?: Record<string, unknown>;
}

export interface AdminRole {
  id: string;
  name: string;
  permissions: AdminPermission[];
  description: string;
}

export interface AdminPermission {
  id: string;
  name: string;
  resource:
    | "customers"
    | "tickets"
    | "requests"
    | "invoices"
    | "staff"
    | "pricing"
    | "system";
  actions: ("read" | "write" | "delete" | "admin")[];
  description: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  createdAt: string;
  permissions: AdminPermission[];
}

export interface AdminSystemConfig {
  id: string;
  key: string;
  value: string | number | boolean;
  type: "string" | "number" | "boolean" | "json";
  category: "pricing" | "email" | "security" | "features" | "integrations";
  description: string;
  lastUpdated: string;
  updatedBy: string;
}

export interface AdminReport {
  id: string;
  name: string;
  type: "customer" | "financial" | "operational" | "staff" | "system";
  description: string;
  generatedDate: string;
  generatedBy: string;
  filePath: string;
  fileSize: string;
  parameters: Record<string, unknown>;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  resource: string;
  resourceId: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  errorMessage?: string;
}

// API Response Types
export interface AdminApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  recentCustomers: AdminCustomer[];
  recentTickets: AdminTicket[];
  recentRequests: AdminRequest[];
  upcomingRenewals: AdminCustomer[];
  highRiskCustomers: AdminCustomer[];
  systemAlerts: AdminNotification[];
}

// Form Types
export interface AdminCustomerForm {
  name: string;
  email: string;
  subscriptionType: "flat-rate" | "business" | "premium";
  vatNumber?: string;
  customPricing?: number;
  notes?: string;
}

export interface AdminTicketForm {
  customerId: string;
  requestType: "personnel-search" | "hr-support" | "recruitment" | "accounting";
  priority: "low" | "medium" | "high" | "urgent";
  description: string;
  jobTitle?: string;
  estimatedCompletion?: string;
  staffAssigned?: string;
}

export interface AdminResponseForm {
  requestId: string;
  message: string;
  status: "in-progress" | "resolved";
  assignTo?: string;
  followUpRequired?: boolean;
  followUpDate?: string;
}

export interface AdminPricingForm {
  subscriptionType: "flat-rate" | "business" | "premium";
  basePrice: number;
  vatIncluded: boolean;
  vatRate: number;
  effectiveDate: string;
  applyToExisting: boolean;
  notes?: string;
}

// Chart Data Types
export interface AdminChartData {
  period: string;
  customers: number;
  revenue: number;
  tickets: number;
  churnRate: number;
}

export interface AdminRevenueData {
  month: string;
  flatRate: number;
  business: number;
  premium: number;
  total: number;
}

export interface AdminCustomerGrowthData {
  month: string;
  newCustomers: number;
  churnedCustomers: number;
  netGrowth: number;
}

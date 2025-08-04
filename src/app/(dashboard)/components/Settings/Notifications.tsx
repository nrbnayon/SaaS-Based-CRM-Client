"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Bell,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  User,
  Settings,
  DollarSign,
  EyeOff,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SearchFilterBar } from "@/components/common/SearchFilterBar";
import { ViewModal } from "@/components/common/ViewModal";
import type {
  SearchFilterState,
  SearchFilterConfig,
} from "@/types/dynamicCardTypes";
import type { GenericDataItem, ColumnConfig } from "@/types/dynamicTableTypes";

// Types
interface NotificationData extends GenericDataItem {
  id: string;
  title: string;
  message: string;
  type:
    | "info"
    | "success"
    | "warning"
    | "error"
    | "user"
    | "system"
    | "payment";
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  actionUrl?: string;
  metadata?: {
    userId?: string;
    userName?: string;
    userAvatar?: string;
    amount?: number;
    orderId?: string;
    systemComponent?: string;
    ipAddress?: string;
    attemptCount?: number;
    backupSize?: string;
    backupLocation?: string;
    updateType?: string;
    [key: string]: unknown;
  };
}

// Fixed mock data with deterministic values
const generateMockNotifications = (): NotificationData[] => {
  // Use a fixed base date for consistent server/client rendering
  const baseDate = new Date("2024-08-04T10:00:00Z");

  const staticNotifications: NotificationData[] = [
    {
      id: "1",
      title: "New User Registration",
      message: "John Doe has successfully registered to the platform",
      type: "user",
      isRead: false,
      createdAt: new Date(baseDate.getTime() - 1000 * 60 * 5), // 5 minutes ago
      updatedAt: new Date(baseDate.getTime() - 1000 * 60 * 5),
      priority: "medium",
      category: "User Management",
      metadata: {
        userId: "user_123",
        userName: "John Doe",
        userAvatar: "/placeholder.svg",
      },
    },
    {
      id: "2",
      title: "Payment Received",
      message:
        "Payment of $299.99 has been successfully processed for Order #ORD-2024-001",
      type: "payment",
      isRead: false,
      createdAt: new Date(baseDate.getTime() - 1000 * 60 * 15), // 15 minutes ago
      updatedAt: new Date(baseDate.getTime() - 1000 * 60 * 15),
      priority: "high",
      category: "Financial",
      metadata: {
        amount: 299.99,
        orderId: "ORD-2024-001",
        userId: "user_456",
        userName: "Sarah Johnson",
      },
    },
    {
      id: "3",
      title: "System Maintenance",
      message:
        "Scheduled maintenance will begin at 2:00 AM UTC. Expected downtime: 30 minutes",
      type: "system",
      isRead: true,
      createdAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      updatedAt: new Date(baseDate.getTime() - 1000 * 60 * 30),
      priority: "urgent",
      category: "System",
      metadata: {
        systemComponent: "Database Server",
      },
    },
    {
      id: "4",
      title: "Security Alert",
      message: "Multiple failed login attempts detected from IP 192.168.1.100",
      type: "warning",
      isRead: false,
      createdAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * 1), // 1 hour ago
      updatedAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * 1),
      priority: "urgent",
      category: "Security",
      metadata: {
        ipAddress: "192.168.1.100",
        attemptCount: 5,
      },
    },
    {
      id: "5",
      title: "Data Backup Completed",
      message:
        "Daily backup process completed successfully. 1.2GB of data backed up.",
      type: "success",
      isRead: true,
      createdAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * 6), // 6 hours ago
      updatedAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * 3),
      priority: "low",
      category: "System",
      metadata: {
        backupSize: "1.2GB",
        backupLocation: "AWS S3",
      },
    },
    {
      id: "6",
      title: "Profile Update Request",
      message:
        "User Emma Wilson has requested to update their profile information",
      type: "info",
      isRead: false,
      createdAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * 12), // 12 hours ago
      updatedAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * 12),
      priority: "medium",
      category: "User Management",
      metadata: {
        userId: "user_789",
        userName: "Emma Wilson",
        userAvatar: "/placeholder.svg",
        updateType: "Profile Information",
      },
    },
  ];

  // Generate additional mock data with deterministic values
  const additionalNotifications = Array.from({ length: 25 }, (_, i) => ({
    id: `${7 + i}`,
    title: `Sample Notification ${7 + i}`,
    message: `This is a sample notification message for item ${7 + i}`,
    type: ["info", "success", "warning", "error", "user", "system", "payment"][
      i % 7
    ] as NotificationData["type"],
    isRead: i % 3 === 0, // Deterministic pattern instead of Math.random()
    createdAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * (i + 1)),
    updatedAt: new Date(baseDate.getTime() - 1000 * 60 * 60 * (i + 1)),
    priority: ["low", "medium", "high", "urgent"][
      i % 4
    ] as NotificationData["priority"],
    category: ["User Management", "Financial", "System", "Security"][i % 4],
    metadata: {
      userId: `user_${7 + i}`,
      userName: `User ${7 + i}`,
    },
  }));

  return [...staticNotifications, ...additionalNotifications];
};

// Column configuration for ViewModal
const notificationColumns: ColumnConfig[] = [
  { key: "id", label: "ID", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "message", label: "Message", type: "text" },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "info", label: "Info" },
      { value: "success", label: "Success" },
      { value: "warning", label: "Warning" },
      { value: "error", label: "Error" },
      { value: "user", label: "User" },
      { value: "system", label: "System" },
      { value: "payment", label: "Payment" },
    ],
  },
  {
    key: "priority",
    label: "Priority",
    type: "select",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "urgent", label: "Urgent" },
    ],
  },
  { key: "category", label: "Category", type: "text" },
  { key: "isRead", label: "Read Status", type: "checkbox" },
  { key: "createdAt", label: "Created At", type: "datetime-local" },
  { key: "updatedAt", label: "Updated At", type: "datetime-local" },
  { key: "actionUrl", label: "Action URL", type: "url" },
  // Metadata fields
  { key: "userId", label: "User ID", type: "text" },
  { key: "userName", label: "User Name", type: "text" },
  { key: "amount", label: "Amount", type: "currency" },
  { key: "orderId", label: "Order ID", type: "text" },
  { key: "systemComponent", label: "System Component", type: "text" },
  { key: "ipAddress", label: "IP Address", type: "text" },
  { key: "attemptCount", label: "Attempt Count", type: "number" },
  { key: "backupSize", label: "Backup Size", type: "text" },
  { key: "backupLocation", label: "Backup Location", type: "text" },
  { key: "updateType", label: "Update Type", type: "text" },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const itemsPerPage = 20;

  // Initialize notifications only on client side
  useEffect(() => {
    setIsClient(true);
    setNotifications(generateMockNotifications());
  }, []);

  // Search and filter state
  const [searchFilterState, setSearchFilterState] = useState<SearchFilterState>(
    {
      search: "",
      filters: {},
      sortBy: undefined,
      sortOrder: undefined,
      page: 1,
      itemsPerPage: 10,
    }
  );

  // Search and filter configuration
  const searchFilterConfig: SearchFilterConfig = {
    searchPlaceholder: "Search notifications by title or message...",
    enableSort: true,
    filters: [
      {
        key: "type",
        label: "Type",
        type: "select",
        placeholder: "All Types",
        options: [
          { value: "info", label: "Info" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "error", label: "Error" },
          { value: "user", label: "User" },
          { value: "system", label: "System" },
          { value: "payment", label: "Payment" },
        ],
      },
      {
        key: "priority",
        label: "Priority",
        type: "select",
        placeholder: "All Priorities",
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "urgent", label: "Urgent" },
        ],
      },
      {
        key: "isRead",
        label: "Status",
        type: "select",
        placeholder: "All Status",
        options: [
          { value: "true", label: "Read" },
          { value: "false", label: "Unread" },
        ],
      },
      {
        key: "category",
        label: "Category",
        type: "select",
        placeholder: "All Categories",
        options: [
          { value: "User Management", label: "User Management" },
          { value: "Financial", label: "Financial" },
          { value: "System", label: "System" },
          { value: "Security", label: "Security" },
        ],
      },
    ],
    sortOptions: [
      { key: "createdAt", label: "Created Date" },
      { key: "updatedAt", label: "Updated Date" },
      { key: "title", label: "Title" },
      { key: "priority", label: "Priority" },
      { key: "type", label: "Type" },
    ],
  };

  // Get notification icon
  const getNotificationIcon = (type: NotificationData["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "user":
        return <User className="w-5 h-5 text-blue-600" />;
      case "system":
        return <Settings className="w-5 h-5 text-gray-600" />;
      case "payment":
        return <DollarSign className="w-5 h-5 text-green-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: NotificationData["priority"]) => {
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

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    if (!isClient) return "Loading..."; // Prevent hydration mismatch

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  // Handle notification click - opens modal and marks as read
  const handleNotificationClick = useCallback(
    (notification: NotificationData) => {
      // Flatten notification data for ViewModal
      const flattenedNotification: GenericDataItem = {
        ...notification,
        ...notification.metadata, // Spread metadata to top level
        createdAt: notification.createdAt.toISOString(),
        updatedAt: notification.updatedAt.toISOString(),
      };

      setSelectedNotification(flattenedNotification as NotificationData);
      setIsModalOpen(true);

      // Mark as read if unread
      if (!notification.isRead) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id
              ? { ...n, isRead: true, updatedAt: new Date() }
              : n
          )
        );
      }
    },
    []
  );

  // Toggle read status
  const toggleReadStatus = useCallback(
    (id: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, isRead: !n.isRead, updatedAt: new Date() } : n
        )
      );
    },
    []
  );

  // Delete notification
  const deleteNotification = useCallback(
    (id: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    },
    []
  );

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, updatedAt: new Date() }))
    );
  }, []);

  // Filter and sort notifications
  const filteredAndSortedNotifications = useMemo(() => {
    const filtered = notifications.filter((notification) => {
      // Search filter
      const searchMatch =
        !searchFilterState.search ||
        notification.title
          .toLowerCase()
          .includes(searchFilterState.search.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(searchFilterState.search.toLowerCase());

      // Other filters
      const filtersMatch = Object.entries(searchFilterState.filters).every(
        ([key, value]) => {
          if (key === "isRead") {
            return notification.isRead === (value === "true");
          }
          return notification[key as keyof NotificationData] === value;
        }
      );

      return searchMatch && filtersMatch;
    });

    // Sort
    if (searchFilterState.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[searchFilterState.sortBy as keyof NotificationData];
        const bValue = b[searchFilterState.sortBy as keyof NotificationData];

        let comparison = 0;

        // Handle different types properly
        if (typeof aValue === "string" && typeof bValue === "string") {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else {
          // Convert to string for comparison as fallback
          const aStr = String(aValue || "");
          const bStr = String(bValue || "");
          comparison = aStr.localeCompare(bStr);
        }

        return searchFilterState.sortOrder === "desc"
          ? -comparison
          : comparison;
      });
    }
    return filtered;
  }, [notifications, searchFilterState]);

  // Pagination logic
  const totalItems = filteredAndSortedNotifications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredAndSortedNotifications.slice(
    startIndex,
    endIndex
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilterState]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="p-3 md:p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-700" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Notifications
            </h3>
            <p className="text-muted-foreground">
              {notifications.length} total, {unreadCount} unread
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={markAllAsRead}
            variant="outline"
            size="sm"
            disabled={unreadCount === 0}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <SearchFilterBar
        state={searchFilterState}
        config={searchFilterConfig}
        onStateChange={setSearchFilterState}
        className="mb-6"
      />

      {/* Notifications List */}
      <div className="space-y-2 max-h-[650px] overflow-y-auto scrollbar-custom">
        {currentNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No notifications found
            </h3>
            <p className="text-muted-foreground">
              {searchFilterState.search ||
              Object.keys(searchFilterState.filters).length > 0
                ? "Try adjusting your search or filters"
                : "You're all caught up!"}
            </p>
          </div>
        ) : (
          currentNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={cn(
                "relative bg-white border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                !notification.isRead &&
                  "border-l-4 border-l-blue-500 bg-blue-50/30"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="mt-1 flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={cn(
                            "text-sm font-medium text-black truncate",
                            !notification.isRead && "font-semibold"
                          )}
                        >
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            getPriorityColor(notification.priority)
                          )}
                        >
                          {notification.priority}
                        </Badge>

                        <Badge variant="secondary" className="text-xs">
                          {notification.category}
                        </Badge>

                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeAgo(notification.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => toggleReadStatus(notification.id, e)}
                        >
                          <EyeOff className="w-4 h-4 mr-2" />
                          Mark as {notification.isRead ? "Unread" : "Read"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) =>
                            deleteNotification(notification.id, e)
                          }
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} notifications
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  const distance = Math.abs(page - currentPage);
                  return distance <= 2 || page === 1 || page === totalPages;
                })
                .map((page, index, array) => {
                  const prevPage = array[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <span className="px-2 py-1 text-sm text-gray-500">
                          ...
                        </span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  );
                })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Reusable ViewModal */}
      <ViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedNotification}
        columns={notificationColumns}
        title="Notification Details"
        description="Complete information about the selected notification"
      />
    </div>
  );
}

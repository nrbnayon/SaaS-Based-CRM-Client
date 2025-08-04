//src\components\common\ViewModal.tsx
"use client";
import type React from "react";
import {
  User,
  X,
  Calendar,
  Mail,
  Building,
  DollarSign,
  Shield,
  Activity,
  EyeIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type {
  GenericDataItem,
  ColumnConfig,
} from "../../types/dynamicTableTypes";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GenericDataItem | null;
  columns: ColumnConfig[];
  title?: string;
  description?: string;
}

export const ViewModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  item,
  columns,
  title = "View Details",
  description = "Detailed information about the selected item",
}) => {
  if (!item) return null;

  // Format value based on column type
  const formatValue = (
    value: unknown,
    column: ColumnConfig
  ): React.ReactNode => {
    if (value === null || value === undefined)
      return <span className="text-gray-400">-</span>;

    switch (column.type) {
      case "currency":
        const numValue =
          typeof value === "string"
            ? Number.parseFloat(value.replace(/[$,]/g, ""))
            : typeof value === "number"
            ? value
            : 0;
        return (
          <span className="font-medium text-green-600">
            {isNaN(numValue) ? "$0" : `$${numValue.toLocaleString()}`}
          </span>
        );

      case "percentage":
        const percentValue = Number(value) || 0;
        return <span className="font-medium">{percentValue}%</span>;

      case "date":
        try {
          return (
            <span className="font-medium">
              {new Date(value as string | number | Date).toLocaleDateString()}
            </span>
          );
        } catch {
          return <span className="font-medium">{value.toString()}</span>;
        }

      case "datetime-local":
        try {
          return (
            <span className="font-medium">
              {new Date(value as string | number | Date).toLocaleString()}
            </span>
          );
        } catch {
          return <span className="font-medium">{value.toString()}</span>;
        }

      case "checkbox":
        return (
          <Badge variant={value ? "default" : "secondary"} className="text-xs">
            {value ? "Yes" : "No"}
          </Badge>
        );

      case "select":
        const option = column.options?.find((opt) => opt.value === value);
        return (
          <Badge
            variant="secondary"
            className="text-xs"
            style={
              option?.color
                ? { backgroundColor: option.color, color: "white" }
                : undefined
            }
          >
            {option?.label || String(value || "")}
          </Badge>
        );

      case "multiselect":
        if (!Array.isArray(value))
          return <span className="text-gray-400">-</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {value.map((val, index) => {
              const option = column.options?.find((opt) => opt.value === val);
              return (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs"
                  style={
                    option?.color
                      ? { backgroundColor: option.color, color: "white" }
                      : undefined
                  }
                >
                  {option?.label || String(val || "")}
                </Badge>
              );
            })}
          </div>
        );

      case "email":
        return (
          <a
            href={`mailto:${value}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {value.toString()}
          </a>
        );

      case "url":
        return (
          <a
            href={value.toString()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {value.toString()}
          </a>
        );

      case "tel":
        return (
          <a
            href={`tel:${value}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {value.toString()}
          </a>
        );

      default:
        if (Array.isArray(value)) {
          return (
            <div className="flex flex-wrap gap-1">
              {value.map((val, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {String(val || "")}
                </Badge>
              ))}
            </div>
          );
        }
        return <span className="font-medium">{String(value || "")}</span>;
    }
  };

  // Get icon for field type
  const getFieldIcon = (column: ColumnConfig) => {
    switch (column.key) {
      case "name":
        return <User className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "department":
        return <Building className="w-4 h-4" />;
      case "salary":
        return <DollarSign className="w-4 h-4" />;
      case "role":
        return <Shield className="w-4 h-4" />;
      case "status":
        return <Activity className="w-4 h-4" />;
      case "joinDate":
      case "date":
        return <Calendar className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Group columns into sections for better organization
  const personalFields = columns.filter((col) =>
    ["name", "email", "avatar", "phone", "address"].includes(col.key)
  );
  const workFields = columns.filter((col) =>
    ["role", "department", "salary", "status", "joinDate", "skills"].includes(
      col.key
    )
  );
  const otherFields = columns.filter(
    (col) =>
      !personalFields.includes(col) &&
      !workFields.includes(col) &&
      col.key !== "id"
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:min-w-3xl max-h-[90vh] overflow-y-auto scrollbar-custom">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {item.avatar && (
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={item.avatar || "/placeholder.svg"}
                  alt={item.name || "User"}
                />
                <AvatarFallback>
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <div className="text-xl font-semibold">{title}</div>
              {item.name && (
                <div className="text-lg text-gray-600">{item.name}</div>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information Section */}
          {personalFields.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <EyeIcon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Data Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalFields.map((column) => {
                  const value = item[column.key];
                  if (column.key === "avatar" || value === undefined)
                    return null;

                  return (
                    <div key={column.key} className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getFieldIcon(column)}
                        <label className="text-sm font-medium text-gray-700">
                          {column.label}
                        </label>
                      </div>
                      <div className="pl-6">{formatValue(value, column)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {personalFields.length > 0 && workFields.length > 0 && <Separator />}

          {/* Work Information Section */}
          {workFields.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Work Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workFields.map((column) => {
                  const value = item[column.key];
                  if (value === undefined) return null;

                  return (
                    <div
                      key={column.key}
                      className={cn(
                        "space-y-1",
                        column.key === "skills" && "md:col-span-2" // Skills take full width
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {getFieldIcon(column)}
                        <label className="text-sm font-medium text-gray-700">
                          {column.label}
                        </label>
                      </div>
                      <div className="pl-6">{formatValue(value, column)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(personalFields.length > 0 || workFields.length > 0) &&
            otherFields.length > 0 && <Separator />}

          {/* Other Information Section */}
          {otherFields.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherFields.map((column) => {
                  const value = item[column.key];
                  if (value === undefined) return null;

                  return (
                    <div key={column.key} className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getFieldIcon(column)}
                        <label className="text-sm font-medium text-gray-700">
                          {column.label}
                        </label>
                      </div>
                      <div className="pl-6">{formatValue(value, column)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Raw Data Section (for debugging or complete view) */}
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">System Information</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">ID:</span>
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                    {item.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Last Updated:
                  </span>
                  <span className="text-sm text-gray-600">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button onClick={onClose} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

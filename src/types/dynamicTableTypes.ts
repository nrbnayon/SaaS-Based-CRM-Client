// src\types\dynamicTableTypes.ts
import type React from "react";

export type DataValue = string | number | boolean | null | undefined;

export interface GenericDataItem {
  id: string;
  name?: string;
  avatar?: string;
  subtitle?: string;
  [key: string]: DataValue | DataValue[] | File[] | unknown;
}

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "datetime-local"
  | "time"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "file"
  | "image"
  | "readonly"
  | "currency"
  | "percentage"
  | "url"
  | "tel"
  | "color"
  | "switch"
  | "rating"
  | "richtext"
  | "json"
  | "tags"
  | "daterange"
  | "slider"
  | "autocomplete"
  | "hidden";

export interface SelectOption {
  value: string;
  label: string;
  color?: string;
  [key: string]:DataValue | DataValue[] | File[] | unknown| string | undefined;
}

export interface ColumnConfig {
  key: string;
  label: string;
  type?: FieldType;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, item: GenericDataItem) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  options?: SelectOption[];
  showAvatar?: boolean; // New property for avatar display
  [key: string]:
    | DataValue
    | DataValue[]
    | File[]
    | unknown
    | string
    | undefined;
}

export interface FormFieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: unknown) => string | null;
  };
  gridCol?: "full" | "half" | "third" | "quarter";
  section?: string;
  dependsOn?: string;
  showWhen?: (data: GenericDataItem) => boolean;
  transform?: (value: unknown) => unknown;
  className?: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "date" | "daterange" | "number" | "text";
  options?: SelectOption[];
  multiple?: boolean;
  [key: string]:
    | DataValue
    | DataValue[]
    | File[]
    | unknown
    | string
    | undefined;
}

export interface DateRangeFilter {
  start?: string;
  end?: string;
  [key: string]:
    | DataValue
    | DataValue[]
    | File[]
    | unknown
    | string
    | undefined;
}

export interface ActionConfig {
  key: string;
  label: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick: (item: GenericDataItem) => void;
  show?: (item: GenericDataItem) => boolean;
  className?: string;
  [key: string]:
    | DataValue
    | DataValue[]
    | File[]
    | unknown
    | string
    | undefined;
}

export interface TableConfig {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  enableSearch?: boolean;
  enableFilters?: boolean;
  enablePagination?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  stickyHeader?: boolean;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  className?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  [key: string]:
    | DataValue
    | DataValue[]
    | File[]
    | unknown
    | string
    | undefined;
}

export interface EditModalConfig {
  title?: string;
  description?: string;
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  sections?: Array<{
    key: string;
    title: string;
    description?: string;
    className?: string;
  }>;
  [key: string]:
    | DataValue
    | DataValue[]
    | File[]
    | unknown
    | string
    | undefined;
}

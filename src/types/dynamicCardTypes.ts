// src/types/dynamicCardTypes.ts
export interface GenericDataItem {
  id: string;
  subtitle?: string;
  [key: string]: string | unknown;
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

export type GridColType = "full" | "half" | "third" | "quarter";
export type AlignType = "left" | "center" | "right";

export interface SelectOption {
  value: string;
  label: string;
  color?: string;
  icon?: string;
  [key: string]: string | unknown;
}

export interface ColumnConfig {
  key: string;
  label: string;
  type?: FieldType;
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  showAvatar?: boolean;
  align?: AlignType;
  width?: string;
  options?: SelectOption[];
  render?: (value: unknown, item: GenericDataItem) => React.ReactNode;
  [key: string]: string | unknown;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "multiselect" | "date" | "daterange" | "search";
  options?: SelectOption[];
  placeholder?: string;
  [key: string]: string | unknown;
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
  onClick: (item: GenericDataItem) => void;
  condition?: (item: GenericDataItem) => boolean;
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
  striped?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  [key: string]: string | unknown;
}

export interface ValidationRule {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  required?: boolean;
  custom?: (value: unknown) => string | null;
}

// Updated FormField interface to match what DynamicDataCreateModal expects
export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: ValidationRule;
  gridCol?: GridColType;
  section?: string;
  helpText?: string;
  disabled?: boolean;
  dependsOn?: string;
  condition?: (formData: Record<string, unknown>) => boolean;
  showWhen?: (data: GenericDataItem) => boolean;
  transform?: (value: unknown) => unknown;
  className?: string;
  [key: string]: string | unknown;
}

// Keep FormFieldConfig as an alias for backward compatibility
export type FormFieldConfig = FormField;

export interface FormSection {
  key: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  [key: string]: string | unknown;
}

export interface CardConfig {
  titleKey: string;
  subtitleKey?: string;
  imageKey?: string;
  descriptionKey?: string;
  statusKey?: string;
  badgeKeys?: string[];
  metaKeys?: string[];
  primaryAction?: ActionConfig;
  secondaryActions?: ActionConfig[];
  showDetailsButton?: boolean;
  customFields?: {
    key: string;
    label: string;
    render: (value: unknown, item: GenericDataItem) => React.ReactNode;
  }[];
}

// Search and Filter Types
export interface SearchFilterState {
  search: string;
  filters: Record<string, unknown>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page: number;
  itemsPerPage: number;
  [key: string]: string | unknown;
}

export interface SearchFilterConfig {
  searchPlaceholder?: string;
  searchKeys?: string[];
  filters: FilterConfig[];
  enableSort?: boolean;
  sortOptions?: { key: string; label: string }[];
  enablePagination?: boolean;
  itemsPerPageOptions?: number[];
  [key: string]: string | unknown;
}

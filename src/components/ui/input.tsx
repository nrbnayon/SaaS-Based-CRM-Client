import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-xl border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Date input specific styles to position calendar icon on the right
        type === "date" && [
          "relative",
          "[&::-webkit-calendar-picker-indicator]:absolute",
          "[&::-webkit-calendar-picker-indicator]:right-3",
          "[&::-webkit-calendar-picker-indicator]:top-1/2",
          "[&::-webkit-calendar-picker-indicator]:-translate-y-1/2",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
          "[&::-webkit-calendar-picker-indicator]:opacity-70",
          "[&::-webkit-calendar-picker-indicator]:hover:opacity-100",
          "[&::-webkit-calendar-picker-indicator]:w-4",
          "[&::-webkit-calendar-picker-indicator]:h-4",
          // For Firefox
          "[&::-moz-calendar-picker-indicator]:absolute",
          "[&::-moz-calendar-picker-indicator]:right-3",
          "[&::-moz-calendar-picker-indicator]:top-1/2",
          "[&::-moz-calendar-picker-indicator]:-translate-y-1/2",
          "[&::-moz-calendar-picker-indicator]:cursor-pointer",
          "[&::-moz-calendar-picker-indicator]:opacity-70",
          "[&::-moz-calendar-picker-indicator]:hover:opacity-100",
          "[&::-moz-calendar-picker-indicator]:w-4",
          "[&::-moz-calendar-picker-indicator]:h-4",
        ],
        className
      )}
      {...props}
    />
  );
}

export { Input };

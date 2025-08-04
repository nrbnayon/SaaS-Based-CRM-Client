// src/components/lordicon/lordicon-wrapper.tsx
"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { useTheme } from "next-themes";

interface LordiconProps {
  src: string;
  trigger?:
    | "hover"
    | "click"
    | "loop"
    | "loop-on-hover"
    | "morph"
    | "morph-two-way";
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
  };
  hoverColors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
  };
  darkColors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
  };
  darkHoverColors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
  };
  stroke?: number;
  style?: React.CSSProperties;
  size?: number;
  delay?: number;
  className?: string;
  state?: string;
  isActive?: boolean;
}

const Lordicon = forwardRef<HTMLElement, LordiconProps>(
  (
    {
      src,
      trigger = "hover",
      colors,
      hoverColors,
      darkColors,
      darkHoverColors,
      stroke = 2,
      style = {},
      size = 32,
      delay,
      className = "",
      state,
      isActive = false,
      ...props
    },
    ref
  ) => {
    const iconRef = useRef<HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const { theme } = useTheme();

    // Format colors for lordicon
    const formatColors = (colorObj?: LordiconProps["colors"]) => {
      if (!colorObj) return undefined;

      const colorEntries = Object.entries(colorObj)
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}:${value}`);

      return colorEntries.length > 0 ? colorEntries.join(",") : undefined;
    };

    // Get current colors based on state
    const getCurrentColors = useCallback(() => {
      const isDark = theme === "dark";

      if (isActive) {
        // Active state colors
        if (isDark && darkColors) return darkColors;
        return colors || { primary: "#4693D9", secondary: "#4bb3fd" };
      }

      if (isHovered) {
        // Hover state colors
        if (isDark && darkHoverColors) return darkHoverColors;
        if (hoverColors) return hoverColors;
        if (isDark && darkColors) return darkColors;
        return colors || { primary: "#4693D9", secondary: "#4bb3fd" };
      }

      // Default state colors
      if (isDark && darkColors) return darkColors;
      return colors || { primary: "#6b7280", secondary: "#9ca3af" }; // gray colors for inactive
    }, [
      theme,
      isActive,
      isHovered,
      darkColors,
      colors,
      darkHoverColors,
      hoverColors,
    ]);

    const formattedColors = formatColors(getCurrentColors());

    // Handle ref forwarding
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(iconRef.current);
        } else {
          ref.current = iconRef.current;
        }
      }
    }, [ref]);

    // Update colors when state changes
    useEffect(() => {
      if (iconRef.current) {
        const newColors = formatColors(getCurrentColors());
        if (newColors) {
          iconRef.current.setAttribute("colors", newColors);
        }
      }
    }, [getCurrentColors]);

    const iconStyle = {
      width: `${size}px`,
      height: `${size}px`,
      ...style,
    } as React.CSSProperties;

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-block"
      >
        {React.createElement("lord-icon", {
          ref: iconRef,
          src,
          trigger,
          colors: formattedColors,
          stroke,
          style: iconStyle,
          delay,
          className,
          state,
          ...props,
        })}
      </div>
    );
  }
);

Lordicon.displayName = "Lordicon";

export default Lordicon;

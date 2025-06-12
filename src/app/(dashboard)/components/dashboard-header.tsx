"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-xl md:text-3xl'>Welcome Jone Doe</h3>
          </div>
          {/* Mobile Navigation */}
          <div className='flex items-center space-x-2'>
            <ModeToggle />
            <Bell />
          </div>
        </div>
      </div>
    </header>
  );
}

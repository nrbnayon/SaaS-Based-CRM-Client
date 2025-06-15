"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardHeader({
  title = "Welcome",
}: {
  title?: string;
}) {
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
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl md:text-3xl font-bold tracking-tight'>
              {title}
            </h1>
          </div>
          {/* Mobile Navigation */}
          <div className='flex items-center space-x-2'>
            <ModeToggle />
          <Bell className='hover:ring-1 hover:ring-success w-8 h-8 font-bold p-1 rounded-full' />
          </div>
        </div>
      </div>
    </header>
  );
}

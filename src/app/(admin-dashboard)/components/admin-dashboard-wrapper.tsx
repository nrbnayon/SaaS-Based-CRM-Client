// src/app/(admin-dashboard)/components/admin-dashboard-wrapper.tsx
"use client";

import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Shield,
  BarChart3,
  Ticket,
  Calculator,
  LogOut,
  CircleUserRound,
  Settings,
  // Users,
  // FileText,
  // AlertTriangle,
  PanelLeftOpen,
  PanelRightOpen,
} from "lucide-react";

interface AdminDashboardWrapperProps {
  children: React.ReactNode;
}

export default function AdminDashboardWrapper({
  children,
}: AdminDashboardWrapperProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(210);
  const [isResizing, setIsResizing] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [startWidth, setStartWidth] = React.useState(0);
  const [, setUserResizedWidth] = React.useState<number | null>(null);
  const [manualToggle, setManualToggle] = React.useState(false);

  const minWidth = 68;
  const maxWidth = 400;

  const links = [
    {
      label: "Initial Dashboard",
      href: "/admin",
      icon: <BarChart3 className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Operational Monitoring",
      href: "/admin/operational-monitoring",
      icon: <Settings className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Ticket Management",
      href: "/admin/ticket-management",
      icon: <Ticket className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Accounting Assistance",
      href: "/admin/accounting-assistance",
      icon: <Calculator className='h-5 w-5 flex-shrink-0' />,
    },
    // {
    //   label: "Customer Management",
    //   href: "/admin/customer-management",
    //   icon: <Users className='h-5 w-5 flex-shrink-0' />,
    // },
    // {
    //   label: "Reports & Analytics",
    //   href: "/admin/reports",
    //   icon: <FileText className='h-5 w-5 flex-shrink-0' />,
    // },
    // {
    //   label: "Risk Assessment",
    //   href: "/admin/risk-assessment",
    //   icon: <AlertTriangle className='h-5 w-5 flex-shrink-0' />,
    // },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(sidebarWidth);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const newWidth = Math.min(
        Math.max(startWidth + deltaX, minWidth),
        maxWidth
      );

      setSidebarWidth(newWidth);
      setUserResizedWidth(newWidth);

      if (newWidth <= minWidth + 20) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startX, startWidth]);

  React.useEffect(() => {
    if (!isResizing && manualToggle) {
      if (open) {
        setSidebarWidth(220);
        setUserResizedWidth(220);
      } else {
        setSidebarWidth(minWidth);
      }
      setManualToggle(false);
    }
  }, [open, isResizing, manualToggle, minWidth]);

  const handleToggleClick = () => {
    setManualToggle(true);
    setOpen(!open);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-background dark:bg-[#081524] w-full flex-1 mx-auto",
        "h-screen overflow-hidden"
      )}
    >
      <div className='relative overflow-visible flex'>
        <Sidebar
          open={open}
          setOpen={setOpen}
          animate={true}
          width={sidebarWidth}
        >
          <SidebarBody
            className={cn("justify-between gap-10 border-none")}
            style={{
              background:
                "linear-gradient(120deg, #DC2626 0%, #7F1D1D 50%, #991B1B 100%)",
            }}
          >
            <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
              {open ? <Logo /> : <LogoIcon />}
              <div className='mt-10 flex flex-col gap-2'>
                {links.map((link, idx) => {
                  const isActive = pathname === link.href;

                  return (
                    <SidebarLink
                      key={idx}
                      link={{
                        ...link,
                        icon: React.cloneElement(link.icon, {
                          className: cn(
                            "h-5 w-5 flex-shrink-0 transition-colors",
                            isActive
                              ? "text-slate-800 dark:text-slate-900"
                              : "text-white/80 hover:text-white"
                          ),
                        }),
                      }}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group",
                        isActive
                          ? "bg-white dark:bg-white text-slate-800 dark:text-slate-900 shadow-lg"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    />
                  );
                })}
              </div>
            </div>
            <div className='border-t border-white/20 pt-4'>
              <div className='mb-4'>
                <SidebarLink
                  link={{
                    label: "Admin Profile",
                    href: "/admin/profile",
                    icon: (
                      <div className='w-5 h-5 rounded-full bg-transparent flex items-center justify-center'>
                        <CircleUserRound className='w-5 h-5' />
                      </div>
                    ),
                  }}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200",
                    pathname === "/admin/profile"
                      ? "bg-white dark:bg-white text-slate-800 dark:text-slate-900 shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                />
              </div>
              <button
                onClick={() => {
                  console.log("Admin logout clicked");
                }}
                className='w-full'
              >
                <div className='flex items-center gap-3 p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200'>
                  <LogOut className='h-5 w-5 flex-shrink-0' />
                  <motion.span
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className='text-sm whitespace-pre inline-block !p-0 !m-0'
                  >
                    Log Out
                  </motion.span>
                </div>
              </button>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Resizable Border */}
        <div
          className='hidden md:block w-1 bg-transparent cursor-col-resize hover:bg-blue-500/20 transition-colors duration-200 relative group'
          onMouseDown={handleMouseDown}
        >
          <div className='absolute inset-0 w-2 -ml-0.5 bg-transparent' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
        </div>

        {/* Toggle Button */}
        <button
          onClick={handleToggleClick}
          className={cn(
            "absolute hidden md:flex top-4 z-[60] cursor-pointer p-2 rounded-full bg-white dark:bg-[#081524] border border-gray-300 dark:border-gray-300 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200",
            open ? "-right-3" : "-right-3"
          )}
        >
          {open ? (
            <PanelRightOpen className='h-4 w-4 text-gray-600 dark:text-gray-400' />
          ) : (
            <PanelLeftOpen className='h-4 w-4 text-gray-600 dark:text-gray-400' />
          )}
        </button>
      </div>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href='/admin'
      className='font-normal flex space-x-3 items-center text-sm py-3 relative z-20 w-full'
    >
      <div className='w-5 h-10 flex-shrink-0 flex items-center justify-center'>
        <Shield className='w-8 h-8 text-white' />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className='font-semibold text-white whitespace-pre text-lg'
      >
        Admin Portal
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href='/admin'
      className='font-normal flex space-x-2 items-center text-sm py-3 relative z-20 w-full justify-center'
    >
      <div className='w-10 h-10 flex-shrink-0 flex items-center justify-center'>
        <Shield className='w-8 h-8 text-white' />
      </div>
    </Link>
  );
};

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-1 min-h-0'>
      <div className='p-0 rounded-tl-2xl bg-white dark:bg-[#0B0305] flex flex-col gap-2 flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-custom'>
        {children}
      </div>
    </div>
  );
};

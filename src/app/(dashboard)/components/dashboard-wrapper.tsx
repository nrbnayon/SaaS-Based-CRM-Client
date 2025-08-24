// src/app/(dashboard)/components/dashboard-wrapper.tsx
"use client";

import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { MdDashboard, MdAccountBalance } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { PiRankingLight } from "react-icons/pi";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BotMessageSquare,
  CircleUserRound,
  CrownIcon,
  LogOut,
  MonitorCog,
  UserSquare2Icon,
  Users,
} from "lucide-react";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const pathname = usePathname();

  const links = [
    {
      label: "Overview",
      href: "/overview",
      icon: <MdDashboard className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Financial Plan",
      href: "/financial-plan",
      icon: <PiRankingLight className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Accounts",
      href: "/accounts",
      icon: <MdAccountBalance className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Accountant",
      href: "/accountant",
      icon: <HiOutlineDocumentText className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Personnel",
      href: "/personnel-recruitment",
      icon: <Users className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "HR Test",
      href: "/hr-test",
      icon: <UserSquare2Icon className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Chat AI",
      href: "/chat-ai",
      icon: <BotMessageSquare className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Upgrade",
      href: "/upgrade",
      icon: <CrownIcon className='h-5 w-5 flex-shrink-0' />,
    },
    {
      label: "Tutorial",
      href: "/tutorial",
      icon: <MonitorCog className='h-5 w-5 flex-shrink-0' />,
    },
  ];

  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-background dark:bg-[#081524] w-full flex-1 mx-auto",
        "h-screen overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody
          className={cn(
            "justify-between gap-10 border-none",
            // Light mode: radial gradient from #080635 to #16156C
            // "bg-sidebar-gradient",
            // // Dark mode: solid color #141440
            // "dark:bg-[#0B0305]"
          )}
          style={{
            background:
              "linear-gradient(120deg, #378986 0%, #081524 50%, #00394a 100%)",
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
                  label: "Profile",
                  href: "/profile",
                  icon: (
                    <div className='w-5 h-5 rounded-full  bg-transparent flex items-center justify-center'>
                      <CircleUserRound className='w-5 h-5' />
                    </div>
                  ),
                }}
                className={cn(
                  "flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200",
                  pathname === "/profile"
                    ? "bg-white dark:bg-white text-slate-800 dark:text-slate-900 shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              />
            </div>
            <button
              onClick={() => {
                // Add your logout logic
                console.log("Logout clicked");
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
      <Dashboard>{children}</Dashboard>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href='/overview'
      className='font-normal flex space-x-3 items-center text-sm py-3 relative z-20 w-full'
    >
      {/* Fixed container for image to prevent jumping */}
      <div className=' w-5 h-10 flex-shrink-0 flex items-center justify-center'>
        {/* <Image
          className="w-full h-full object-contain z-10"
          alt="PrimeFlow Logo"
          src="/logo.png"
          width={100}
          height={100}
        /> */}
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className='font-semibold text-white whitespace-pre text-lg'
      >
        <Image
          alt='PrimeFlow Logo'
          src='/logo.png'
          width={100}
          height={100}
          className='w-full h-full object-contain z-10'
        />
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href='/overview'
      className='font-normal flex space-x-2 items-center text-sm py-3 relative z-20 w-full justify-center'
    >
      {/* Fixed container for image to prevent jumping */}
      <div className='w-10 h-10 flex-shrink-0 flex items-center justify-center'>
        <Image
          className='w-full h-full object-contain'
          alt='PrimeFlow Logo'
          src='/logo.png'
          width={100}
          height={100}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.2 }}
        className='font-medium text-lg bg-clip-text text-transparent dark:text-white whitespace-pre overflow-hidden'
      >
        <Image
          className='w-full h-full object-contain'
          alt='PrimeFlow Logo'
          src='/logo.png'
          width={100}
          height={100}
        />
      </motion.span>
    </Link>
  );
};

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-1   min-h-0'>
      <div className='p-0 rounded-tl-2xl bg-white dark:bg-[#0B0305] flex flex-col gap-2 flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-custom'>
        {children}
      </div>
    </div>
  );
};

// src/app/(dashboard)/components/dashboard-wrapper.tsx
"use client";

import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconDashboard,
  IconUserBolt,
  IconSettings,
  IconArrowLeft,
  IconBrandTabler,
  IconChartBar,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const links = [
    {
      label: "Overview",
      href: "/overview",
      icon: (
        <IconBrandTabler className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconDashboard className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: "Financial Plan",
      href: "/financial-plan",
      icon: (
        <IconChartBar className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
  ];

  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "John Doe",
                href: "#",
                icon: (
                  <div className='h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium'>
                    JD
                  </div>
                ),
              }}
            />
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
      href='/'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <div className='h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='font-medium text-black dark:text-white whitespace-pre'
      >
        Your CRM
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href='/'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <div className='h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' />
    </Link>
  );
};

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-1'>
      <div className='p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto'>
        {children}
      </div>
    </div>
  );
};

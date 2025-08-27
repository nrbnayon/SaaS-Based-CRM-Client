// src/app/(admin-dashboard)/components/admin-dashboard-header.tsx
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Shield, Bell } from "lucide-react";

export default function AdminDashboardHeader({
  title = "Administrator",
}: {
  title?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 p-4 w-full transition-all duration-200 bg-red-600/10 dark:bg-red-900/10 backdrop-blur-3xl border-b border-red-200 dark:border-red-800"
      )}
    >
      <div className='mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Shield className='w-6 h-6 text-red-600' />
            <h1 className='text-xl md:text-3xl font-bold tracking-tight text-red-600'>
              {title}
            </h1>
          </div>

          <div className='flex items-center cursor-pointer space-x-2'>
            <ModeToggle />
            <div className='flex items-center justify-center hover:bg-green-200 w-8 h-8 font-bold p-1 rounded-md'>
              <Link href='/admin/notifications' className='cursor-pointer'>
                <Bell className='w-4 h-4 text-red-500' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

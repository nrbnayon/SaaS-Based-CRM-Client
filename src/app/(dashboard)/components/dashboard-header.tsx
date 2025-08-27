import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function DashboardHeader({
  title = "Welcome",
}: {
  title?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 p-4 w-full transition-all duration-200 bg-white/10 dark:bg-background/10 backdrop-blur-3xl"
      )}
    >
      <div className=' mx-auto'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl md:text-3xl font-bold tracking-tight'>
              {title}
            </h1>
          </div>
          {/* Mobile Navigation */}
          <div className='flex items-center cursor-pointer space-x-2'>
            <ModeToggle />
            <div className='flex items-center justify-center hover:bg-green-200 w-8 h-8 font-bold p-1 rounded-md'>
              <Link href='/notifications' className='cursor-pointer'>
              <Bell className='w-4 h-4 text-foreground dark:text-white' />
              </Link>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
}

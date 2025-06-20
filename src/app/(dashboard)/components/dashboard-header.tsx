import { ModeToggle } from "@/components/ui/mode-toggle";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardHeader({
  title = "Welcome",
}: {
  title?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 p-4 w-full transition-all duration-200bg-white/10 dark:bg-background/10 backdrop-blur-3xl"
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
          <Bell className='hover:ring-1 cursor-pointer hover:ring-success w-8 h-8 font-bold p-1 rounded-full' />
          </div>
        </div>
      </div>
    </header>
  );
}

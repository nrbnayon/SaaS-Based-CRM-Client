import { cn } from "@/lib/utils";
import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
// import { SquarePlus } from "lucide-react";
// import Link from "next/link";
import { QuestionBuilderModal } from "@/app/(dashboard)/components/QuestionBuilder/question-builder-modal";

const HrHeader = () => {
  return (
    <div>
      <header
        className={cn(
          "sticky top-0 z-50 py-4 w-full transition-all duration-200bg-white/10 dark:bg-background/10 backdrop-blur-3xl"
        )}
      >
        <div className=" mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                Hr Test
              </h1>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center cursor-pointer space-x-3">
              <ModeToggle />

              {/* <Link
                href=""
                className="flex items-center py-1 px-2 rounded-md bg-black  dark:bg-white text-white dark:text-black cursor-pointer space-x-2"
              >
                <SquarePlus className="h-4 w-4 " />
                <p className="  text-xs md:text-base">New Test</p>
              </Link> */}
              <QuestionBuilderModal title="Create New Test" />
            </div>
          </div>
        </div>
      </header>
      {/* <QuestionBuilderModal title="Create New Test" /> */}
    </div>
  );
};

export default HrHeader;

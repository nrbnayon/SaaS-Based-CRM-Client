/** @format */

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Edit, ExternalLink, Lock, MoveUpRight } from "lucide-react";

export const ProfilePage = () => {
  return (
    <div>
      <div className="flex flex-col space-y-5 lg:flex-row bg-secondary dark:bg-card p-8 rounded-2xl border border-gray-300 dark:border-blue-950 items-center justify-between  mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt="Mahdee Rashid"
              />
              <AvatarFallback className="text-lg">MR</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#838383] rounded-full flex items-center justify-center">
              <Edit className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="my-auto">
            <div className="flex  items-center gap-2 mb-1 bg-[#c9e2f8] text-[#148CFF] dark:text-card text-xs w-14 px-3  py-1 rounded-2xl">
              Admin
            </div>
            <h2 className="text-xl lg:text-2xl font-semibold text-black dark:text-white">
              Mahdee Rashid
            </h2>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-sm md:text-base">
          <div className="flex justify-between items-center min-w-[300px]">
            <span className="text-gray-800 dark:text-white font-medium  ">
              E-mail
            </span>
            <span className="text-gray-400">polash@gmail.com</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-white font-medium">
              Phone
            </span>
            <span className="text-gray-400">+880 1636 828200</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-white font-medium pr-5">
              Address
            </span>
            <span className="text-gray-400 w-44">
              123 Main Street, Dhaka, Bangladesh
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-white font-medium">
              LinkedIn
            </span>
            <span className="text-gray-400">linkedin.com/in/polash</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-white font-medium">
              Website
            </span>
            <span className="text-gray-400">polashportfolio.com</span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xl md:text-2xl text-black dark:text-white font-medium  mb-2">
            Name
          </label>
          <div className="relative bg-transparent md:bg-white  rounded-lg ">
            <Input
              value="Mahdee Rashid"
              className={cn(
                "bg-[#e5f3ff]  p-6  text-lg md:text-xl dark:text-card text-[#148cff] font-medium pr-10"
              )}
              readOnly
            />

            <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 dark:text-card text-[#148cff]" />
          </div>
        </div>
        <div>
          <label className="block  text-xl md:text-2xl font-medium text-black dark:text-white mb-2">
            E-mail
          </label>
          <div className="relative bg-transparent md:bg-white  rounded-lg">
            <Input
              value="mahdeerashid@gmail.com"
              className={cn(
                "bg-[#e5f3ff]  p-6  text-lg md:text-xl dark:text-card text-[#148cff] font-medium pr-10"
              )}
              readOnly
            />
            <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 dark:text-card text-[#148cff]" />{" "}
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className=" mb-6 bg-blue-50 dark:bg-card p-8 rounded-2xl border border-blue-100 dark:border-blue-950">
        <div className="flex  justify-between">
          <div className="flex flex-col items-start gap-3">
            <div className="w-14 h-14 bg-gray-200 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-gray-800" />
            </div>
            <span className="text-xl lg:text-2xl font-semibold text-black dark:text-white">
              Change Password
            </span>
          </div>
          <div className="w-7 h-7 border border-gray-400 bg-transparent rounded-full">
            <MoveUpRight className="w-6 h-6 p-1 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white rounded-lg p-6 border border-[#f54a45]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[#f54a45] font-medium text-lg mb-2">
              Delete Account
            </h3>
            <p className="text-[#505050] text-sm">
              Contact our{" "}
              <span className="text-[#148cff] underline cursor-pointer">
                support team
              </span>{" "}
              to process the deletion of your account.
            </p>
          </div>
          <Button className="bg-[#f54a45] hover:bg-[#f54a45]/90 text-white px-6">
            Apply Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

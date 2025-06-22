"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge, Edit, ExternalLink, Lock } from "lucide-react";

export const ProfilePage=() => {

  return(
        <div>
            <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="relative">
                    
                    <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Mahdee Rashid" />
                        <AvatarFallback className="text-lg">MR</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#838383] rounded-full flex items-center justify-center">
                        <Edit className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div>
                <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-[#148cff] text-white text-xs px-2 py-1">Admin</Badge>
                </div>
                <h2 className="text-xl font-semibold text-[#252525]">Mahdee Rashid</h2>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center min-w-[300px]">
                <span className="text-[#505050] font-medium">E-mail</span>
                <span className="text-[#a8a8a8]">polash@gmail.com</span>
                </div>
                <div className="flex justify-between items-center">
                <span className="text-[#505050] font-medium">Phone</span>
                <span className="text-[#a8a8a8]">+880 1636 828200</span>
                </div>
                <div className="flex justify-between items-center">
                <span className="text-[#505050] font-medium">Address</span>
                <span className="text-[#a8a8a8]">123 Main Street, Dhaka, Bangladesh</span>
                </div>
                <div className="flex justify-between items-center">
                <span className="text-[#505050] font-medium">LinkedIn</span>
                <span className="text-[#a8a8a8]">linkedin.com/in/polash</span>
                </div>
                <div className="flex justify-between items-center">
                <span className="text-[#505050] font-medium">Website</span>
                <span className="text-[#a8a8a8]">polashportfolio.com</span>
                </div>
            </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
                <label className="block text-sm font-medium text-[#252525] mb-2">Name</label>
                <div className="relative">
                <Input
                    value="Mahdee Rashid"
                    className="bg-[#e5f3ff] border-0 text-[#148cff] font-medium pr-10"
                    readOnly
                />
                <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#148cff]" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-[#252525] mb-2">E-mail</label>
                <div className="relative">
                <Input
                    value="mahdeerashid@gmail.com"
                    className="bg-[#e5f3ff] border-0 text-[#148cff] font-medium pr-10"
                    readOnly
                />
                <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#148cff]" />
                </div>
            </div>
            </div>

            {/* Change Password Section */}
            <div className="bg-[#f2f2f2] rounded-lg p-6 mb-6 border border-[#e2e2e2]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#838383]" />
                </div>
                <span className="text-[#252525] font-medium">Change Password</span>
                </div>
                <ExternalLink className="w-5 h-5 text-[#838383]" />
            </div>
            </div>

            {/* Delete Account Section */}
            <div className="bg-white rounded-lg p-6 border border-[#f54a45]">
            <div className="flex items-center justify-between">
                <div>
                <h3 className="text-[#f54a45] font-medium text-lg mb-2">Delete Account</h3>
                <p className="text-[#505050] text-sm">
                    Contact our <span className="text-[#148cff] underline cursor-pointer">support team</span> to process the
                    deletion of your account.
                </p>
                </div>
                <Button className="bg-[#f54a45] hover:bg-[#f54a45]/90 text-white px-6">Apply Delete</Button>
            </div>
            </div>
        </div>
  ) 
}


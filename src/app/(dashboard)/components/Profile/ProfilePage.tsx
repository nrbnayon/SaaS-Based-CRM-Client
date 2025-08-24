/** @format */

import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Edit, Lock, MoveUpRight, Trash2 } from "lucide-react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChangePassword from "./ChangePassord";

export default function ProfilePage() {
  // Profile data array
  const [profileData, setProfileData] = useState({
    name: "Nrb Nayon",
    image: "/placeholder.svg?height=80&width=80",
    email: "nrbnayon@gmail.com",
    phone: "+880 1636 828200",
    address: "123 Main Street, Dhaka, Bangladesh",
    linkedin: "linkedin.com/in/itsnayon",
    website: "nayon-ii.com",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const handleDeleteCancel = () => {
    setIsDialogOpen(false);
  };
  const handleDeleteConfirm = () => {
    console.log("account deleted");
    setIsDialogOpen(false);
  };

  // Edit states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Temporary edit values
  const [tempName, setTempName] = useState(profileData.name);
  const [tempEmail, setTempEmail] = useState(profileData.email);

  // File input ref for avatar upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle avatar edit click
  const handleAvatarEdit = () => {
    fileInputRef.current?.click();
  };

  // Handle avatar image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle name edit
  const handleNameEdit = () => {
    if (isEditingName) {
      // Save the changes
      setProfileData((prev) => ({
        ...prev,
        name: tempName,
      }));
    } else {
      // Start editing
      setTempName(profileData.name);
    }
    setIsEditingName(!isEditingName);
  };

  // Handle email edit
  const handleEmailEdit = () => {
    if (isEditingEmail) {
      // Save the changes
      setProfileData((prev) => ({
        ...prev,
        email: tempEmail,
      }));
    } else {
      // Start editing
      setTempEmail(profileData.email);
    }
    setIsEditingEmail(!isEditingEmail);
  };

  // Handle change password (arrow button)
  const handleChangePassword = () => {
    setIsPasswordDialogOpen(true);
    console.log("password change");
    // You can implement navigation logic here
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    setIsDialogOpen(true);
  };

  // Function to close password dialog
  const handlePasswordDialogClose = () => {
    setIsPasswordDialogOpen(false);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      {/* Hidden file input for avatar upload */}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept='image/*'
        style={{ display: "none" }}
      />

      <div className='flex flex-col space-y-5 lg:flex-row bg-white dark:bg-[#081524] p-8 rounded-2xl border border-gray-300 dark:border-blue-950 items-center justify-between mb-8'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <Avatar className='w-20 lg:w-32 h-20 lg:h-32'>
              <AvatarImage src={profileData.image} alt={profileData.name} />
              <AvatarFallback className='text-lg'>
                {getInitials(profileData.name)}
              </AvatarFallback>
            </Avatar>
            <div
              className='absolute -bottom-1 -right-1 w-6 h-6 bg-[#838383] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#6b6b6b] transition-colors'
              onClick={handleAvatarEdit}
            >
              <Edit className='w-3 h-3 cursor-pointer text-white' />
            </div>
          </div>
          <div className='my-auto'>
            <div className='flex items-center gap-2 mb-1 bg-[#c9e2f8] text-[#148CFF] dark:text-card text-xs w-14 px-3 py-1 rounded-2xl'>
              Admin
            </div>
            <h2 className='text-xl lg:text-2xl font-semibold text-black dark:text-white'>
              {profileData.name}
            </h2>
          </div>
        </div>

        {/* Contact Info */}
        <div className='space-y-3 text-sm md:text-base'>
          <div className='flex justify-between items-center min-w-[300px]'>
            <span className='text-gray-800 dark:text-white font-medium'>
              E-mail
            </span>
            <span className='text-gray-400'>{profileData.email}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-800 dark:text-white font-medium'>
              Phone
            </span>
            <span className='text-gray-400'>{profileData.phone}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-800 dark:text-white font-medium pr-5'>
              Address
            </span>
            <span className='text-gray-400 w-44'>{profileData.address}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-800 dark:text-white font-medium'>
              LinkedIn
            </span>
            <span className='text-gray-400'>{profileData.linkedin}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-gray-800 dark:text-white font-medium'>
              Website
            </span>
            <span className='text-gray-400'>{profileData.website}</span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <div>
          <label className='block text-xl md:text-2xl text-black dark:text-white font-medium mb-2'>
            Name
          </label>
          <div className='relative bg-transparent md:bg-white rounded-xl'>
            <Input
              value={isEditingName ? tempName : profileData.name}
              onChange={(e) => setTempName(e.target.value)}
              className={cn(
                "bg-[#e5f3ff] p-6 text-lg md:text-xl dark:text-card text-[#148cff] font-medium pr-10"
              )}
              readOnly={!isEditingName}
            />
            <button
              onClick={handleNameEdit}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform'
            >
              <Edit className='w-4 h-4 cursor-pointer dark:text-card text-[#148cff]' />
            </button>
          </div>
        </div>
        <div>
          <label className='block text-xl md:text-2xl font-medium text-black dark:text-white mb-2'>
            E-mail
          </label>
          <div className='relative bg-transparent md:bg-white rounded-xl'>
            <Input
              value={isEditingEmail ? tempEmail : profileData.email}
              onChange={(e) => setTempEmail(e.target.value)}
              className={cn(
                "bg-[#e5f3ff] p-6 text-lg md:text-xl dark:text-card text-[#148cff] font-medium pr-10"
              )}
              readOnly={!isEditingEmail}
            />
            <button
              onClick={handleEmailEdit}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform'
            >
              <Edit className='w-4 h-4 cursor-pointer dark:text-card text-[#148cff]' />
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className='mb-6 bg-white dark:bg-[#081524]  p-8 rounded-2xl border border-blue-200 dark:border-blue-950'>
        <div className='flex justify-between'>
          <div className='flex flex-col items-start gap-3'>
            <div className='w-14 h-14 bg-gray-200 dark:bg-[#323679] rounded-lg flex items-center justify-center'>
              <Lock className='w-6 h-6 text-gray-800 dark:text-white' />
            </div>
            <span className='text-xl lg:text-2xl font-semibold text-black dark:text-white'>
              Change Password
            </span>
          </div>
          <Dialog
            open={isPasswordDialogOpen}
            onOpenChange={setIsPasswordDialogOpen}
          >
            <DialogTrigger asChild>
              <button
                onClick={handleChangePassword}
                className='w-7 h-7 border justify-center items-center cursor-pointer border-gray-400 bg-transparent rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
              >
                <MoveUpRight className='w-6 h-6 p-1 text-gray-400 m-auto' />
              </button>
            </DialogTrigger>
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <ChangePassword onCancel={handlePasswordDialogClose} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className='bg-gray-100 rounded-lg p-6 border border-[#f54a45]'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-error font-medium text-xl lg:text-2xl mb-2'>
              Delete Account
            </h3>
            <p className='text-gray-500 text-sm md:text-base'>
              Contact our{" "}
              <span className='text-blue-950 underline cursor-pointer'>
                support team
              </span>{" "}
              to process the deletion of your account.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleDeleteAccount}
                className='bg-error  hover:bg-error/90 cursor-pointer text-white px-2'
              >
                Apply Delete
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <div className='border-2 border-error rounded-lg h-12 w-12'>
                  <Trash2 className='text-error p-2 h-11 w-11' />
                </div>
                <DialogTitle className='text-xl md:text-2xl'>
                  Are you sure you want to{" "}
                  <span className='text-error'>Delete</span> your account?
                </DialogTitle>
                <DialogDescription>
                  Inter your current password you used login with
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='grid grid-cols-2 gap-6 w-full justify-between'>
                <Button variant='outline' onClick={handleDeleteCancel}>
                  Cancel
                </Button>
                <Button variant='destructive' onClick={handleDeleteConfirm}>
                  Yes Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

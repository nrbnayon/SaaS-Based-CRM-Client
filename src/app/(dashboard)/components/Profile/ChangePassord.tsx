/** @format */

"use client";

import { Button } from "@/components/ui/button";

import { LockKeyhole, Eye, EyeOff } from "lucide-react";
// components/ChangePassword.tsx
import React, { useState } from "react";

interface ChangePasswordProps {
  onCancel: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onCancel }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Add your password change logic here (e.g., API call)
    console.log("Password change submitted:", { currentPassword, newPassword });
  };

  const handleCancel = () => {
    // Reset form fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    // Call the parent's cancel function to close the dialog
    onCancel();
  };

  return (
    <div className="w-full   p-6 bg-transparent">
      <div className="flex flex-col space-x-3 items-start mb-6">
        <div className="h-12 w-12 bg-[#EDEDFF] items-center rounded-lg justify-center">
          <LockKeyhole className="text-blue-900 h-10 w-10 m-auto pt-2" />
        </div>
      </div>
      <h2 className="text-lg md:text-2xl  font-semibold text-black">
        Change your password
      </h2>
      <p className="text-gray-500 mb-4 text-sm md:text-base">
        Enter your current password you used to login with
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full p-2 pr-10 border text-sm md:text-base text-gray-500 border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full p-2 pr-10 border text-sm md:text-base text-gray-500 border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center"
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full p-2 pr-10 border text-sm md:text-base text-gray-500 border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div className="">
          <a href="#" className="text-sm text-blue-950 hover:underline">
            Forget Password?
          </a>
        </div>
        <div className="grid grid-cols-2 w-full  space-x-4">
          <Button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

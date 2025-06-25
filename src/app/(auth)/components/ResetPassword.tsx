/** @format */

"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ArrowLeft,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Validation schema
const resetPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Watch password field for real-time validation
  const newPassword = watch("newPassword");

  // Password strength validation
  const passwordValidation = {
    hasMinLength: newPassword ? newPassword.length >= 8 : false,
    hasUpperLower: newPassword
      ? /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword)
      : false,
    hasNumber: newPassword ? /(?=.*\d)/.test(newPassword) : false,
  };

  // Check verification status and set email on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const otpVerified = localStorage.getItem("otpVerified");
    const verificationTime = localStorage.getItem("verificationTime");

    if (!storedEmail || !otpVerified) {
      toast.error("Unauthorized access", {
        description: "Please complete the verification process first.",
      });
      router.push("/forgot-password");
      return;
    }

    // Check if verification is still valid (e.g., within 10 minutes)
    if (verificationTime) {
      const timePassed = Date.now() - parseInt(verificationTime);
      const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

      if (timePassed > tenMinutes) {
        toast.error("Verification expired", {
          description: "Please start the password reset process again.",
        });
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("otpVerified");
        localStorage.removeItem("verificationTime");
        router.push("/forgot-password");
        return;
      }
    }

    setEmail(storedEmail);
    setValue("email", storedEmail);
  }, [router, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the form data to console (excluding password for security)
      console.log("Reset Password Data:", {
        email: data.email,
        passwordLength: data.newPassword.length,
        timestamp: new Date().toISOString(),
      });

      // Simulate successful password reset
      toast.success("Password reset successful!", {
        description: "Your password has been updated successfully.",
        duration: 2000,
      });

      // Clear all reset-related data from localStorage
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("otpVerified");
      localStorage.removeItem("verificationTime");
      localStorage.removeItem("otpSentTime");

      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push("/reset-success");
      }, 1000);
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Password reset failed", {
        description: "Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-primary font-manrope">
      {/* Left Side - Welcome Message */}
      <div className="flex-1 bg-sidebar-gradient dark:bg-dark-primary flex items-center justify-center p-8 text-white">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-manrope-bold leading-tight">
            Create New Password
          </h1>
          <p className="text-lg font-manrope-regular opacity-90">
            Your new password must be different from your previous password and
            contain at least 8 characters
          </p>
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm font-manrope-regular opacity-75">
              <Shield className="h-4 w-4" />
              <span>Create a strong, secure password</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="flex-1 bg-white dark:bg-dark-primary font-manrope flex items-center justify-center p-8">
        <Card className="w-full p-2 lg:p-10 max-w-2xl rounded-4xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Link
                href="/verify-otp"
                className="absolute left-4 top-4 lg:left-8 lg:top-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
            </div>
            <h2 className="text-2xl font-manrope-semibold text-gray-900 dark:text-white mb-2">
              Reset Password
            </h2>
            <p className="text-muted-foreground text-sm font-manrope-regular">
              Enter your new password below
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field (Read-only) */}
              <div className="space-y-2">
                <label className="text-foreground font-manrope-medium text-sm block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("email")}
                    type="email"
                    value={email}
                    readOnly
                    disabled
                    className="pl-10 h-12 bg-gray-50 dark:bg-gray-700 border-border text-muted-foreground cursor-not-allowed font-manrope-regular"
                    placeholder="Email address"
                  />
                </div>
              </div>

              {/* New Password Field */}
              <div className="space-y-2">
                <label className="text-foreground font-manrope-medium text-sm block">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("newPassword")}
                    type={showNewPassword ? "text" : "password"}
                    className="pl-10 pr-10 h-12 border-border bg-input text-foreground font-manrope-regular focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="Enter your new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-error text-xs mt-1 font-manrope-regular">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-foreground font-manrope-medium text-sm block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    className="pl-10 pr-10 h-12 border-border bg-input text-foreground font-manrope-regular focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="Confirm your new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-error text-xs mt-1 font-manrope-regular">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground font-manrope-regular">
                  <p className="mb-2">Password must contain:</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasMinLength
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasUpperLower
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span>Uppercase and lowercase letters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasNumber
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span>At least one number</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Password Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-manrope-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground font-manrope-regular">
                Having trouble?{" "}
                <Link
                  href="/support"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300 font-manrope-medium"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

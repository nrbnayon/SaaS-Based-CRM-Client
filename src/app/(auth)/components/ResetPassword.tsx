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
import Image from "next/image";
import { resetPasswordValidationSchema } from "@/lib/formDataValidation";

type ResetPasswordFormData = z.infer<typeof resetPasswordValidationSchema>;

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
    resolver: zodResolver(resetPasswordValidationSchema),
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
    <div className='min-h-screen flex flex-col-reverse lg:flex-row bg-white dark:bg-primary-dark'>
      {/* Left Side - Welcome Message */}
      <div className='flex-1 bg-sidebar-gradient dark:bg-primary-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 text-white order-2 lg:order-1'>
        <div className='max-w-sm sm:max-w-md text-center space-y-4 sm:space-y-6 w-full'>
          <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
            <Image
              src='/logo.png'
              alt='logo'
              layout='responsive'
              width={100}
              height={100}
              quality={100}
              priority
              className='h-auto w-full object-contain'
            />
          </div>
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight'>
            Create New Password
          </h1>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg opacity-90 px-2 sm:px-0'>
            Your new password must be different from your previous password and
            contain at least 8 characters
          </p>
          <div className='pt-2 sm:pt-4 space-y-3'>
            <div className='flex items-center justify-center space-x-2 text-xs sm:text-sm opacity-75'>
              <Shield className='h-3 w-3 sm:h-4 sm:w-4' />
              <span>Create a strong, secure password</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className='flex-1 bg-white dark:bg-primary-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2 relative'>
        <Card className='w-full max-w-sm sm:max-w-md lg:max-w-2xl p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800'>
          <CardHeader className='text-center pb-4 sm:pb-6 relative'>
            <div className='flex items-center justify-center mb-2 sm:mb-4'>
              <Link
                href='/verify-otp'
                className='absolute left-0 top-0 sm:left-2 sm:top-2 lg:left-4 lg:top-4 p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
              >
                <ArrowLeft className='h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400' />
              </Link>
            </div>
            <h2 className='text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white mb-2'>
              Reset Password
            </h2>
            <p className='text-muted-foreground text-xs sm:text-sm px-2 sm:px-0'>
              Enter your new password below
            </p>
          </CardHeader>

          <CardContent className='px-2 sm:px-4 lg:px-6'>
            <form
              className='space-y-4 sm:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email Field (Read-only) */}
              <div className='space-y-2'>
                <label className='text-foreground text-sm sm:text-base font-medium block'>
                  Email Address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground h-4 w-4 sm:h-5 sm:w-5' />
                  <Input
                    {...register("email")}
                    type='email'
                    value={email}
                    readOnly
                    disabled
                    className='pl-10 sm:pl-12 h-10 sm:h-12 bg-gray-50 rounded-md dark:bg-gray-700 border-primary/30 text-black cursor-not-allowed text-sm sm:text-base'
                    placeholder='Email address'
                  />
                </div>
              </div>

              {/* New Password Field */}
              <div className='space-y-2'>
                <label className='text-foreground text-sm sm:text-base font-medium block'>
                  New Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5' />
                  <Input
                    {...register("newPassword")}
                    type={showNewPassword ? "text" : "password"}
                    className='pl-10 sm:pl-12 pr-10 sm:pr-12 h-10 sm:h-12 rounded-md border-primary/30 focus-visible:border-primary bg-input text-foreground focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm sm:text-base'
                    placeholder='Enter your new password'
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                    disabled={isLoading}
                  >
                    {showNewPassword ? (
                      <EyeOff className='h-4 w-4 sm:h-5 sm:w-5' />
                    ) : (
                      <Eye className='h-4 w-4 sm:h-5 sm:w-5' />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className='text-error text-xs mt-1'>
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className='space-y-2'>
                <label className='text-foreground text-sm sm:text-base font-medium block'>
                  Confirm New Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5' />
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    className='pl-10 sm:pl-12 pr-10 sm:pr-12 h-10 sm:h-12 rounded-md border-primary/30 focus-visible:border-primary bg-input text-foreground focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm sm:text-base'
                    placeholder='Confirm your new password'
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4 sm:h-5 sm:w-5' />
                    ) : (
                      <Eye className='h-4 w-4 sm:h-5 sm:w-5' />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className='text-error text-xs mt-1'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Password Strength Indicator */}
              <div className='space-y-2'>
                <div className='text-xs sm:text-sm text-muted-foreground'>
                  <p className='mb-2'>Password must contain:</p>
                  <div className='space-y-1'>
                    <div className='flex items-center space-x-2'>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasMinLength
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className='text-xs sm:text-sm'>
                        At least 8 characters
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasUpperLower
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className='text-xs sm:text-sm'>
                        Uppercase and lowercase letters
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasNumber
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className='text-xs sm:text-sm'>
                        At least one number
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Password Button */}
              <Button
                type='submit'
                className='w-full h-10 sm:h-12 bg-primary/80 hover:bg-primary text-white dark:text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20 text-sm sm:text-base'
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    <span className='hidden sm:inline'>
                      Updating Password...
                    </span>
                    <span className='sm:hidden'>Updating...</span>
                  </>
                ) : (
                  <>
                    <span className='hidden sm:inline'>Update Password</span>
                    <span className='sm:hidden'>Update</span>
                  </>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className='mt-4 sm:mt-6 text-center'>
              <p className='text-xs text-muted-foreground px-2 sm:px-0'>
                Having trouble?{" "}
                <Link
                  href='/support'
                  className='text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300'
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

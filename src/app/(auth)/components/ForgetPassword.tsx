/** @format */

// src\app\(auth)\components\ForgetPassword.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Validation schema
const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
});

type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the form data to console
      console.log("Forget Password Form Data:", {
        email: data.email,
        timestamp: new Date().toISOString(),
      });

      // Simulate successful OTP send
      toast.success("OTP sent successfully!", {
        description: `Verification code sent to ${data.email}`,
        duration: 2000,
      });

      // Store email in localStorage for OTP verification
      localStorage.setItem("resetEmail", data.email);
      localStorage.setItem("otpSentTime", Date.now().toString());

      // Redirect to OTP verification after a short delay
      setTimeout(() => {
        router.push("/verify-otp");
      }, 1000);
    } catch (error) {
      console.error("Forget password error:", error);
      toast.error("Failed to send OTP", {
        description: "Please check your email and try again.",
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
            Forgot Password?
          </h1>
          <p className="text-lg font-manrope-regular opacity-90">
            Don&lsquo;t worry! Enter your email address and we&lsquo;ll send you
            a verification code to reset your password
          </p>
          <div className="pt-4 space-y-3">
            <p className="text-sm font-manrope-regular opacity-75">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-white underline font-manrope-medium hover:opacity-80"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Forget Password Form */}
      <div className="flex-1 bg-white dark:bg-dark-primary font-manrope flex items-center justify-center p-8">
        <Card className="w-full p-2 lg:p-10 max-w-2xl rounded-4xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Link
                href="/login"
                className="absolute left-4 top-4 lg:left-8 lg:top-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
            </div>
            <h2 className="text-2xl font-manrope-semibold text-gray-900 dark:text-white mb-2">
              Reset Password
            </h2>
            <p className="text-muted-foreground text-sm font-manrope-regular">
              Enter your email address and we&lsquo;ll send you a verification
              code
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-foreground font-manrope-medium text-sm block"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className={`pl-4 pr-10 h-12 border-border bg-input text-foreground placeholder:text-muted-foreground font-manrope-regular ${
                      errors.email
                        ? "border-error focus:border-error"
                        : "input-focus"
                    }`}
                    {...register("email")}
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.email && (
                  <p className="text-error text-xs mt-1 font-manrope-regular">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Send OTP Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-manrope-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground font-manrope-regular">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300 font-manrope-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300 font-manrope-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

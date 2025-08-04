"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { emailValidationSchema } from "@/lib/formDataValidation";

type ForgetPasswordFormData = z.infer<typeof emailValidationSchema>;

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(emailValidationSchema),
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
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-white dark:bg-primary-dark">
      {/* Left Side - Welcome Message */}
      <div className="flex-1 bg-sidebar-gradient dark:bg-primary-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 text-white order-2 lg:order-1">
        <div className="max-w-sm sm:max-w-md text-center space-y-4 sm:space-y-6 w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
            Forgot Password?
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 px-2 sm:px-0">
            Don&lsquo;t worry! Enter your email address and we&lsquo;ll send you
            a verification code to reset your password
          </p>
          <div className="pt-2 sm:pt-4 space-y-3">
            <p className="text-xs sm:text-sm opacity-75">
              Remember your password?{" "}
              <Link href="/login" className="text-success underline font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Forget Password Form */}
      <div className="flex-1 bg-white dark:bg-primary-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2 relative">
        <Card className="w-full max-w-sm sm:max-w-md lg:max-w-2xl p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader className="text-center pb-4 sm:pb-6 relative">
            <div className="flex items-center justify-center mb-2 sm:mb-4">
              <Link
                href="/login"
                className="absolute left-0 top-0 sm:left-2 sm:top-2 lg:left-4 lg:top-4 p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
              </Link>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white mb-2">
              Reset Password
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm px-2 sm:px-0">
              Enter your email address and we&lsquo;ll send you a verification
              code
            </p>
          </CardHeader>

          <CardContent className="px-2 sm:px-4 lg:px-6">
            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-foreground text-sm sm:text-base font-medium block"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className={`pl-4 pr-10 h-10 sm:h-12 rounded-md focus-visible:border-primary border-primary/30 bg-input text-foreground placeholder:text-muted-foreground text-sm sm:text-base ${
                      errors.email
                        ? "border-error focus:border-error"
                        : "input-focus"
                    }`}
                    {...register("email")}
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>
                {errors.email && (
                  <p className="text-error text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Send OTP Button */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-12 bg-primary/80 hover:bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20 text-sm sm:text-base"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Sending OTP...</span>
                    <span className="sm:hidden">Sending...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">
                      Send Verification Code
                    </span>
                    <span className="sm:hidden">Send Code</span>
                  </>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs text-muted-foreground px-2 sm:px-0">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300"
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

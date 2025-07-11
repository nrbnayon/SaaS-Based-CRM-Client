/** @format */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Mail, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Validation schema
const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email must be less than 100 characters"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the Terms and Conditions to continue"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");
  const password = watch("password");

  interface SignupFormResponse {
    name: string;
    email: string;
    password: string;
    agreeToTerms: boolean;
    timestamp: string;
    userAgent: string;
  }

  const onSubmit = async (data: SignupFormData): Promise<void> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise<void>((resolve) => setTimeout(resolve, 2000));

      // Log the form data to console
      console.log("Signup Form Data:", {
        name: data.name,
        email: data.email,
        password: data.password,
        agreeToTerms: data.agreeToTerms,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      } as SignupFormResponse);

      // Simulate successful signup
      toast.success("Account created successfully!", {
        description: `Welcome ${data.name}! Please check your email to verify your account.`,
        duration: 3000,
      });

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: unknown) {
      console.error("Signup error:", error);
      toast.error("Registration failed", {
        description: "Something went wrong. Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignup = () => {
    setValue("name", "John Doe");
    setValue("email", "john.doe@example.com");
    setValue("password", "Demo123456");
    setValue("confirmPassword", "Demo123456");
    toast.info("Demo information filled", {
      description: "Please check the terms and conditions checkbox to continue",
    });
  };

  // Password strength indicator
  interface PasswordStrengthResult {
    strength: number;
    label: string;
    color: string;
  }

  const getPasswordStrength = (password: string): PasswordStrengthResult => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels: string[] = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors: string[] = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];

    return {
      strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "",
    };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex bg-white dark:bg-dark-primary font-manrope">
      {/* Left Side - Welcome Message */}
      <div className="flex-1 bg-sidebar-gradient dark:bg-dark-primary flex items-center justify-center p-8 text-white">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-manrope-bold leading-tight">
            Join Us Today!
          </h1>
          <p className="text-lg font-manrope-regular opacity-90">
            Create your account and get started with our amazing platform
          </p>
          <div className="pt-4 space-y-3">
            <Button
              variant="outline"
              onClick={handleDemoSignup}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full font-manrope-medium backdrop-blur-sm"
            >
              Fill Demo Information
            </Button>
            <p className="text-sm font-manrope-regular opacity-75">
              Already have an account?{" "}
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

      {/* Right Side - Signup Form */}
      <div className="flex-1 bg-white dark:bg-dark-primary font-manrope flex items-center justify-center p-8">
        <Card className="w-full p-2 lg:p-10 max-w-2xl rounded-4xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader className="text-center pb-6">
            <h2 className="text-2xl font-manrope-semibold text-gray-900 dark:text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-manrope-regular">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 dark:text-indigo-400 underline font-manrope-medium hover:text-indigo-500 dark:hover:text-indigo-300"
              >
                Sign In
              </Link>
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-gray-900 dark:text-white font-manrope-medium text-sm block"
                >
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={`pl-4 pr-10 h-12 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-manrope-regular border ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    } focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20`}
                    {...register("name")}
                    disabled={isLoading}
                  />
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 font-manrope-regular">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-gray-900 dark:text-white font-manrope-medium text-sm block"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className={`pl-4 pr-10 h-12 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-manrope-regular border ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    } focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20`}
                    {...register("email")}
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-manrope-regular">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-gray-900 dark:text-white font-manrope-medium text-sm block"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`pl-4 pr-10 h-12 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-manrope-regular border ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    } focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20`}
                    {...register("password")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-1">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            level <= passwordStrength.strength
                              ? passwordStrength.color
                              : "bg-gray-200 dark:bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    {passwordStrength.label && (
                      <p
                        className={`text-xs font-manrope-regular ${
                          passwordStrength.strength >= 4
                            ? "text-green-600 dark:text-green-400"
                            : passwordStrength.strength >= 3
                            ? "text-blue-600 dark:text-blue-400"
                            : passwordStrength.strength >= 2
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        Password strength: {passwordStrength.label}
                      </p>
                    )}
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 font-manrope-regular">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-900 dark:text-white font-manrope-medium text-sm block"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`pl-4 pr-10 h-12 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-manrope-regular border ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    } focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20`}
                    {...register("confirmPassword")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 font-manrope-regular">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    className={`border-gray-300 dark:border-gray-600 mt-0.5 ${
                      errors.agreeToTerms ? "border-red-500" : ""
                    }`}
                    checked={agreeToTerms}
                    onCheckedChange={(checked) =>
                      setValue("agreeToTerms", !!checked)
                    }
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-gray-600 dark:text-gray-400 text-sm cursor-pointer leading-relaxed font-manrope-regular"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300 font-manrope-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and Conditions
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
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-xs ml-7 font-manrope-regular">
                    {errors.agreeToTerms.message}
                  </p>
                )}
              </div>

              {/* Signup Button */}
              <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-manrope-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-manrope-regular">
                By creating an account, you&apos;ll receive email notifications
                about your account activity and our services.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

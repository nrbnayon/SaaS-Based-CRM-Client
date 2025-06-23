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
import { User, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Validation schema
const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    ),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the form data to console
      console.log("Login Form Data:", {
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
        timestamp: new Date().toISOString(),
      });

      // Simulate successful login
      toast.success("Login successful!", {
        description: `Welcome back, ${data.username}!`,
        duration: 2000,
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/overview");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setValue("username", "demo_user");
    setValue("password", "demo123");
    toast.info("Demo credentials filled", {
      description: "Click Login to continue with demo account",
    });
  };

  return (
    <div className='min-h-screen flex bg-card font-oswald'>
      {/* Left Side - Welcome Message */}
      <div className='flex-1 bg-card flex items-center justify-center p-8 text-foreground font-oswald'>
        <div className='max-w-md text-center space-y-6'>
          <h1 className='text-4xl font-bold leading-tight'>Welcome Back!</h1>
          <p className='text-muted text-lg'>
            Sign in to access your dashboard and manage your account
          </p>
          <div className='pt-4'>
            <Button
              variant='outline'
              onClick={handleDemoLogin}
              className='bg-white/10 border-white/20 text-secondary hover:bg-white/20'
            >
              Try Demo Login
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='flex-1 bg-white flex items-center justify-center p-8'>
        <Card className='w-full max-w-md border-[#e2e2e2] shadow-lg'>
          <CardHeader className='text-center pb-6'>
            <h2 className='text-2xl font-semibold text-[#222222] mb-2'>
              Sign in to Account
            </h2>
            <p className='text-muted text-sm'>
              Don&apos;t have an Account?{" "}
              <Link
                href='/signup'
                className='text-[#222222] underline font-medium hover:text-[#001d38]'
              >
                Sign Up Free
              </Link>
            </p>
          </CardHeader>

          <CardContent>
            <div className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              {/* Username Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='username'
                  className='text-[#222222] font-medium text-sm block'
                >
                  Username
                </label>
                <div className='relative'>
                  <Input
                    id='username'
                    type='text'
                    placeholder='Enter your username'
                    className={`pl-4 pr-10 h-12 border-[#e2e2e2] bg-[#fcfcff] text-[#222222] placeholder:text-[#acacac] ${
                      errors.username
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-[#001d38]"
                    }`}
                    {...register("username")}
                    disabled={isLoading}
                  />
                  <User className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#acacac]' />
                </div>
                {errors.username && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-[#222222] font-medium text-sm block'
                >
                  Password
                </label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    className={`pl-4 pr-10 h-12 border-[#e2e2e2] bg-[#fcfcff] text-[#222222] placeholder:text-[#acacac] ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-[#001d38]"
                    }`}
                    {...register("password")}
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-[#001d38] transition-colors'
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className='h-5 w-5 text-[#acacac]' />
                    ) : (
                      <Eye className='h-5 w-5 text-[#acacac]' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='rememberMe'
                    className='border-[#e2e2e2]'
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setValue("rememberMe", !!checked)
                    }
                    disabled={isLoading}
                  />
                  <label
                    htmlFor='rememberMe'
                    className='text-muted text-sm cursor-pointer'
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href='/forgot-password'
                  className='text-muted text-sm hover:text-blue-500 hover:underline transition-colors'
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleSubmit(onSubmit)}
                className='w-full h-12 bg-primary hover:bg-[#001d38]/90 text-foreground hover:text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            {/* Additional Info */}
            <div className='mt-6 text-center'>
              <p className='text-xs text-muted'>
                By signing in, you agree to our{" "}
                <Link href='/terms' className='underline hover:text-green-500'>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href='/privacy'
                  className='underline hover:text-green-500'
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

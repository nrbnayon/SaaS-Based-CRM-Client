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
import Image from "next/image";
import { loginValidationSchema } from "@/lib/formDataValidation";

// Extended validation schema for GDPR compliance
const loginValidationSchemaExtended = loginValidationSchema.extend({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms and Conditions of Use",
  }),
  acceptPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must accept the Privacy Policy",
  }),
  acceptOpenBanking: z.boolean().refine((val) => val === true, {
    message: "You must accept the use of Open Banking/PSD2",
  }),
  acceptAIUsage: z.boolean().refine((val) => val === true, {
    message: "You must accept the information on the use of AI",
  }),
});

type LoginFormData = z.infer<typeof loginValidationSchemaExtended>;

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
    resolver: zodResolver(loginValidationSchemaExtended),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      acceptTerms: false,
      acceptPrivacyPolicy: false,
      acceptOpenBanking: false,
      acceptAIUsage: false,
    },
  });

  const rememberMe = watch("rememberMe");
  const acceptTerms = watch("acceptTerms");
  const acceptPrivacyPolicy = watch("acceptPrivacyPolicy");
  const acceptOpenBanking = watch("acceptOpenBanking");
  const acceptAIUsage = watch("acceptAIUsage");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the form data to console
      console.log("Login Form Data:", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        acceptTerms: data.acceptTerms,
        acceptPrivacyPolicy: data.acceptPrivacyPolicy,
        acceptOpenBanking: data.acceptOpenBanking,
        acceptAIUsage: data.acceptAIUsage,
        timestamp: new Date().toISOString(),
      });

      // Simulate successful login
      toast.success("Login successful!", {
        description: `Welcome back, ${data.email}!`,
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
    setValue("email", "demo@gmail.com");
    setValue("password", "demo123");
    toast.info("Demo credentials filled", {
      description: "Please accept all required terms to continue",
    });
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
          <h1 className='text-2xl sm:text-3xl lg:text-4xl leading-tight'>
            Welcome Back!
          </h1>
          <p className='text-sm sm:text-base lg:text-lg opacity-90 px-2 sm:px-0'>
            Sign in to access your dashboard and manage everything
          </p>
          <div className='pt-2 sm:pt-4 space-y-3'>
            <Button
              variant='outline'
              onClick={handleDemoLogin}
              className='bg-white/10 border-white/20 hover:text-white hover:bg-white/20 w-full backdrop-blur-sm text-sm sm:text-base'
            >
              Try Demo Login
            </Button>
            <p className='text-sm font-manrope-regular opacity-75'>
              Don&apos;t have an Account?{" "}
              <Link
                href='/signup'
                className='text-white underline font-manrope-medium hover:opacity-80'
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='flex-1 bg-white dark:bg-primary-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2'>
        <Card className='w-full max-w-sm sm:max-w-md lg:max-w-2xl p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800'>
          <CardHeader className='text-center pb-4 sm:pb-6'>
            <h2 className='text-xl sm:text-2xl text-gray-900 dark:text-white mb-2'>
              Sign in to Account
            </h2>
            <p className='text-muted-foreground text-sm font-manrope-regular'>
              Don&apos;t have an Account?{" "}
              <Link
                href='/signup'
                className='text-indigo-600 dark:text-indigo-400 underline font-manrope-medium hover:text-indigo-500 dark:hover:text-indigo-300'
              >
                SignUp Now
              </Link>
            </p>
          </CardHeader>

          <CardContent className='px-2 sm:px-4 lg:px-6'>
            <form
              className='space-y-4 sm:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-foreground text-sm sm:text-base font-semibold block'
                >
                  Email
                </label>
                <div className='relative'>
                  <Input
                    id='email'
                    type='text'
                    placeholder='Enter your email'
                    className={`pl-4 pr-10 h-10 sm:h-12 border-primary/30 bg-input focus-visible:border-primary rounded-md text-foreground placeholder:text-muted-foreground text-sm sm:text-base ${
                      errors.email
                        ? "border-error focus:border-error"
                        : "input-focus"
                    }`}
                    {...register("email")}
                    disabled={isLoading}
                  />
                  <User className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground' />
                </div>
                {errors.email && (
                  <p className='text-error text-xs mt-1'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-foreground text-sm sm:text-base font-semibold block'
                >
                  Password
                </label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    className={`pl-4 pr-10 h-10 sm:h-12 border-primary/30 bg-input text-foreground focus-visible:border-primary placeholder:text-muted-foreground rounded-md text-sm sm:text-base ${
                      errors.password
                        ? "border-error focus:border-error"
                        : "input-focus"
                    }`}
                    {...register("password")}
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-primary transition-colors'
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground' />
                    ) : (
                      <Eye className='h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-error text-xs mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='rememberMe'
                    className='border-primary/30'
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setValue("rememberMe", !!checked)
                    }
                    disabled={isLoading}
                  />
                  <label
                    htmlFor='rememberMe'
                    className='text-muted-foreground text-xs sm:text-sm cursor-pointer mt-0.5'
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href='/forgot-password'
                  className='text-foreground font-semibold text-xs sm:text-sm hover:text-primary hover:underline transition-colors text-center sm:text-right'
                >
                  Forgot Password?
                </Link>
              </div>

              {/* GDPR Compliance Section */}
              <div className='space-y-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50'>
                <h3 className='text-sm sm:text-base font-semibold text-gray-900 dark:text-white'>
                  Required Acceptances
                </h3>

                {/* Terms and Conditions */}
                <div className='flex items-start space-x-2'>
                  <Checkbox
                    id='acceptTerms'
                    className={`border-primary/30 mt-0.5 ${
                      errors.acceptTerms ? "border-error" : ""
                    }`}
                    checked={acceptTerms}
                    onCheckedChange={(checked) =>
                      setValue("acceptTerms", !!checked)
                    }
                    disabled={isLoading}
                    required
                  />
                  <label
                    htmlFor='acceptTerms'
                    className='text-muted-foreground text-xs sm:text-sm cursor-pointer leading-relaxed'
                  >
                    <span className='text-red-500'>*</span> I accept the{" "}
                    <Link
                      href='/terms'
                      className='text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Terms and Conditions of Use (ToS)
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className='text-error text-xs ml-6'>
                    {errors.acceptTerms.message}
                  </p>
                )}

                {/* Privacy Policy */}
                <div className='flex items-start space-x-2'>
                  <Checkbox
                    id='acceptPrivacyPolicy'
                    className={`border-primary/30 mt-0.5 ${
                      errors.acceptPrivacyPolicy ? "border-error" : ""
                    }`}
                    checked={acceptPrivacyPolicy}
                    onCheckedChange={(checked) =>
                      setValue("acceptPrivacyPolicy", !!checked)
                    }
                    disabled={isLoading}
                    required
                  />
                  <label
                    htmlFor='acceptPrivacyPolicy'
                    className='text-muted-foreground text-xs sm:text-sm cursor-pointer leading-relaxed'
                  >
                    <span className='text-red-500'>*</span> I accept the{" "}
                    <Link
                      href='/privacy'
                      className='text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Privacy Policy (GDPR Art. 13-14)
                    </Link>{" "}
                    including data security provisions
                  </label>
                </div>
                {errors.acceptPrivacyPolicy && (
                  <p className='text-error text-xs ml-6'>
                    {errors.acceptPrivacyPolicy.message}
                  </p>
                )}

                {/* Open Banking/PSD2 */}
                <div className='flex items-start space-x-2'>
                  <Checkbox
                    id='acceptOpenBanking'
                    className={`border-primary/30 mt-0.5 ${
                      errors.acceptOpenBanking ? "border-error" : ""
                    }`}
                    checked={acceptOpenBanking}
                    onCheckedChange={(checked) =>
                      setValue("acceptOpenBanking", !!checked)
                    }
                    disabled={isLoading}
                    required
                  />
                  <label
                    htmlFor='acceptOpenBanking'
                    className='text-muted-foreground text-xs sm:text-sm cursor-pointer leading-relaxed'
                  >
                    <span className='text-red-500'>*</span> I explicitly accept
                    the use of{" "}
                    <Link
                      href='/open-banking'
                      className='text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Open Banking/PSD2
                    </Link>{" "}
                    for processing sensitive banking data
                  </label>
                </div>
                {errors.acceptOpenBanking && (
                  <p className='text-error text-xs ml-6'>
                    {errors.acceptOpenBanking.message}
                  </p>
                )}

                {/* AI Usage */}
                <div className='flex items-start space-x-2'>
                  <Checkbox
                    id='acceptAIUsage'
                    className={`border-primary/30 mt-0.5 ${
                      errors.acceptAIUsage ? "border-error" : ""
                    }`}
                    checked={acceptAIUsage}
                    onCheckedChange={(checked) =>
                      setValue("acceptAIUsage", !!checked)
                    }
                    disabled={isLoading}
                    required
                  />
                  <label
                    htmlFor='acceptAIUsage'
                    className='text-muted-foreground text-xs sm:text-sm cursor-pointer leading-relaxed'
                  >
                    <span className='text-red-500'>*</span> I acknowledge and
                    accept the{" "}
                    <Link
                      href='/ai-usage'
                      className='text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 dark:hover:text-indigo-300'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      information on the use of AI
                    </Link>{" "}
                    in this service
                  </label>
                </div>
                {errors.acceptAIUsage && (
                  <p className='text-error text-xs ml-6'>
                    {errors.acceptAIUsage.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <Button
                type='submit'
                className='w-full h-10 sm:h-12 bg-primary/80 hover:bg-primary text-white dark:text-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500/20 text-sm sm:text-base'
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

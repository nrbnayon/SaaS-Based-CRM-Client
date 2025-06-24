// src/app/page.tsx
import Link from "next/link";
import {
  FileText,
  BarChart3,
  DollarSign,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000'></div>
        <div className='absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000'></div>
      </div>

      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center'>
        {/* Hero section */}
        <div className='max-w-4xl mx-auto'>
          {/* Logo/Brand */}
          <div className='mb-8'>
            <h1 className='text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight'>
              Prime
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 ml-2'>
                Flow
              </span>
            </h1>
            <div className='w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full'></div>
          </div>

          {/* Tagline */}
          <p className='text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed'>
            Comprehensive HR testing and financial management platform. Create
            custom HR assessments, track performance metrics, and manage your
            complete financial operations including income, expenses, VAT, and
            savings tracking.
          </p>

          {/* CTA Section */}
          <div className='flex flex-col items-center space-y-6 mb-12'>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link
                href='/signup'
                className='inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group'
              >
                Start Free Trial
                <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
              </Link>
              <Link
                href='/login'
                className='inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
              >
                Sign In
              </Link>
            </div>

            <p className='text-sm text-gray-400 text-center'>
              Trusted by HR departments and businesses for testing and financial
              management
            </p>
          </div>

          {/* Features grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20'>
              <div className='w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <FileText className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white mb-2'>
                HR Test Creation
              </h3>
              <p className='text-gray-300 text-sm'>
                Create custom HR assessment questions and tests to evaluate
                candidates and track HR performance with detailed analytics
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20'>
              <div className='w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <BarChart3 className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white mb-2'>
                Performance Analytics
              </h3>
              <p className='text-gray-300 text-sm'>
                Track HR performance metrics, generate comprehensive reports,
                and analyze test results with advanced analytics dashboard
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20'>
              <div className='w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <DollarSign className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white mb-2'>
                Financial Management
              </h3>
              <p className='text-gray-300 text-sm'>
                Complete financial tracking with income, expense, VAT
                management, and savings tracker for comprehensive business
                oversight
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className='flex flex-col items-center my-8'>
            <p className='text-sm text-gray-400 text-center'>
              Trusted by HR departments and businesses for testing and financial
              management
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
          <div className='animate-bounce'>
            <ChevronDown className='w-6 h-6 text-white/50' />
          </div>
        </div>
      </div>
    </div>
  );
}

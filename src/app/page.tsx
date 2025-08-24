// src/app/page.tsx
import Link from "next/link";
import {
  FileText,
  BarChart3,
  DollarSign,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className='min-h-screen relative overflow-hidden'
      style={{
        background:
          "linear-gradient(135deg, #378986 0%, #081524 50%, #00394a 100%)",
      }}
    >
      {/* <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div> */}

      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center'>
        {/* Hero section */}
        <div className='container w-full mx-auto'>
          {/* Logo/Brand */}
          <div className='w-full flex justify-center items-center my-5 px-4'>
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
          </div>

          {/* Tagline */}
          <p className='text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed'>
            Complete business management platform for freelancers and companies.
            Manage invoices, personnel recruitment, financial planning, and HR
            testing with AI-powered insights and automated workflows.
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
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20'>
              <div className='w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <FileText className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white mb-2'>
                Invoice & Accounting
              </h3>
              <p className='text-gray-300 text-sm'>
                Simplified invoice creation with automatic PDF generation and
                direct forwarding to your accountant. Upload bank statements and
                communicate directly with accounting professionals.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20'>
              <div className='w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <BarChart3 className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white mb-2'>
                Personnel Recruitment
              </h3>
              <p className='text-gray-300 text-sm'>
                Complete recruitment solution for companies. Submit job
                requirements, manage candidate searches, and track hiring
                progress with automated HR ticket management system.
              </p>
            </div>

            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20'>
              <div className='w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto'>
                <DollarSign className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white mb-2'>
                AI-Powered Financial Planning
              </h3>
              <p className='text-gray-300 text-sm'>
                Advanced financial planning with bank API integration, automatic
                transaction categorization, and AI-powered insights for
                strategic business optimization and growth recommendations.
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

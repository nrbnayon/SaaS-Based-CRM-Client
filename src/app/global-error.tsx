"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center w-4/5 mx-auto container my-8 py-9">
          <div className="w-1/4">
            <Image
              src="/error.png"
              alt="error"
              width={400}
              height={300}
              priority
            />
          </div>
          <div className="py-4">
            <h1 className="text-center text-2xl font-semibold text-red-500">
              {error.message || "Something went wrong!"}
            </h1>
            <div className="flex gap-3 justify-center my-4">
              <Link
                href="/"
                className="bg-teal-500 px-3 py-2 rounded text-white flex gap-2 items-center hover:bg-teal-600 transition-colors"
              >
                <IoMdArrowBack />
                To Home
              </Link>
              <button
                onClick={() => reset()}
                className="bg-blue-500 px-3 py-2 rounded text-white flex gap-2 items-center hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

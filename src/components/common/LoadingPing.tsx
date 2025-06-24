"use client";
import { useState, useEffect } from "react";
export default function LoadingPing() {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);

  const loadingMessages = [
    "Initializing quantum processors...",
    "Synchronizing data streams...",
    "Calibrating neural networks...",
    "Optimizing performance matrices...",
    "Finalizing experience...",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 100);
        if (newProgress >= 100) {
          clearInterval(progressInterval);
        }
        return newProgress;
      });
    }, 300);

    const stageInterval = setInterval(() => {
      setLoadingStage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
    };
  }, [loadingMessages.length]);

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden'>
      {/* Animated background grid */}
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Floating particles system */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className='absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20'
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: Math.random() * 5 + "s",
          }}
        />
      ))}

      {/* Main 3D loading sphere container */}
      <div className='relative perspective-1000'>
        {/* Outer rotating rings */}
        <div
          className='absolute inset-0 w-40 h-40 animate-spin'
          style={{ animationDuration: "4s" }}
        >
          <div
            className='absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-30'
            style={{
              background:
                "conic-gradient(from 0deg, #22d3ee, #3b82f6, #8b5cf6, #22d3ee)",
              clipPath: "inset(0 0 70% 70%)",
            }}
          ></div>
        </div>

        <div
          className='absolute inset-2 w-36 h-36 animate-spin'
          style={{ animationDuration: "3s", animationDirection: "reverse" }}
        >
          <div
            className='absolute inset-0 border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full opacity-40'
            style={{
              background:
                "conic-gradient(from 90deg, #8b5cf6, #ec4899, #22d3ee, #8b5cf6)",
              clipPath: "inset(0 70% 70% 0)",
            }}
          ></div>
        </div>

        <div
          className='absolute inset-4 w-32 h-32 animate-spin'
          style={{ animationDuration: "2s" }}
        >
          <div
            className='absolute inset-0 border-2 border-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full opacity-50'
            style={{
              background:
                "conic-gradient(from 180deg, #34d399, #22d3ee, #3b82f6, #34d399)",
              clipPath: "inset(70% 0 0 70%)",
            }}
          ></div>
        </div>

        {/* Central core with holographic effect */}
        <div className='relative w-40 h-40 rounded-full overflow-hidden'>
          {/* Holographic layers */}
          <div className='absolute inset-6 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 animate-pulse backdrop-blur-sm'></div>
          <div className='absolute inset-8 rounded-full bg-gradient-to-br from-blue-400/30 to-pink-500/30 animate-ping'></div>
          <div className='absolute inset-10 rounded-full bg-gradient-to-tr from-emerald-400/40 to-cyan-400/40'></div>

          {/* Central energy core */}
          <div
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-white via-cyan-200 to-blue-200 animate-pulse shadow-2xl'
            style={{
              boxShadow:
                "0 0 50px rgba(34, 211, 238, 0.8), 0 0 100px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className='absolute inset-2 rounded-full bg-white/30 backdrop-blur-sm'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full animate-ping shadow-lg'></div>
          </div>
        </div>

        {/* Orbiting energy particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className='absolute w-40 h-40 animate-spin'
            style={{
              animationDuration: `${2 + i * 0.5}s`,
              animationDelay: `${i * 0.2}s`,
              transform: `rotate(${i * 45}deg)`,
            }}
          >
            <div
              className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full'
              style={{
                background: `linear-gradient(45deg, ${
                  [
                    "#22d3ee",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                    "#f59e0b",
                    "#10b981",
                    "#ef4444",
                    "#6366f1",
                  ][i]
                }, #ffffff)`,
                boxShadow: `0 0 15px ${
                  [
                    "#22d3ee",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                    "#f59e0b",
                    "#10b981",
                    "#ef4444",
                    "#6366f1",
                  ][i]
                }`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Advanced loading interface */}
      <div className='mt-16 text-center max-w-md mx-auto'>
        {/* Dynamic loading text */}
        <div className='text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 animate-pulse'>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0s" }}
          >
            L
          </span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.1s" }}
          >
            o
          </span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.2s" }}
          >
            a
          </span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.3s" }}
          >
            d
          </span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.4s" }}
          >
            i
          </span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.5s" }}
          >
            n
          </span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.6s" }}
          >
            g
          </span>
          <span
            className='inline-block animate-bounce ml-2'
            style={{ animationDelay: "0.7s" }}
          >
            .
          </span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.8s" }}
          >
            .
          </span>
          <span
            className='inline-block animate-bounce'
            style={{ animationDelay: "0.9s" }}
          >
            .
          </span>
        </div>

        {/* Holographic progress bar */}
        <div className='relative w-80 h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-cyan-500/20 mb-4'>
          <div className='absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse'></div>
          <div
            className='h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-300 relative overflow-hidden'
            style={{ width: `${progress}%` }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse'></div>
            <div className='absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent'></div>
          </div>
          <div className='absolute top-0 right-0 w-1 h-full bg-white/50 animate-ping'></div>
        </div>

        {/* Progress percentage */}
        <div className='text-2xl font-mono text-cyan-400 mb-3 tabular-nums'>
          {Math.floor(progress)}%
        </div>

        {/* Dynamic status messages */}
        <div className='text-slate-300 text-sm mb-6 h-6 transition-all duration-500'>
          <span className='animate-pulse'>{loadingMessages[loadingStage]}</span>
        </div>

        {/* Connection status indicators */}
        <div className='flex justify-center space-x-4 mb-6'>
          {["Server", "Database", "Cache", "CDN"].map((service, i) => (
            <div key={service} className='flex items-center space-x-2'>
              <div
                className={`w-2 h-2 rounded-full ${
                  progress > i * 25
                    ? "bg-green-400 animate-pulse"
                    : "bg-slate-600"
                }`}
                style={{
                  boxShadow: progress > i * 25 ? "0 0 10px #4ade80" : "none",
                }}
              ></div>
              <span
                className={`text-xs ${
                  progress > i * 25 ? "text-green-400" : "text-slate-500"
                }`}
              >
                {service}
              </span>
            </div>
          ))}
        </div>

        {/* Ambient loading tips */}
        <div className='text-slate-400 text-xs italic animate-pulse'>
          &ldquo;Crafting the perfect experience takes time...&ldquo;
        </div>
      </div>

      {/* Ambient light effects */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse'></div>
      <div
        className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse'
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className='absolute top-1/2 right-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse'
        style={{ animationDelay: "2s" }}
      ></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
}

// export default function LoadingPing() {
//   return (
//     <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden'>
//       {/* Background animated particles */}
//       <div className='absolute inset-0'>
//         <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse'></div>
//         <div
//           className='absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/30 rounded-full animate-ping'
//           style={{ animationDelay: "1s" }}
//         ></div>
//         <div
//           className='absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-blue-300/25 rounded-full animate-pulse'
//           style={{ animationDelay: "2s" }}
//         ></div>
//         <div
//           className='absolute bottom-1/4 right-1/3 w-1 h-1 bg-cyan-300/20 rounded-full animate-ping'
//           style={{ animationDelay: "0.5s" }}
//         ></div>
//       </div>

//       {/* Main loading animation container */}
//       <div className='relative'>
//         {/* Outer ring with rotation */}
//         <div
//           className='absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#00ACDA] via-[#43D4FB] to-[#00ACDA] animate-spin'
//           style={{
//             width: "120px",
//             height: "120px",
//             clipPath: "inset(0 0 50% 50%)",
//             animationDuration: "2s",
//           }}
//         ></div>

//         {/* Middle pulsing ring */}
//         <div className='absolute inset-2 rounded-full border-4 border-[#00ACDA]/30 animate-pulse'></div>

//         {/* Inner core with multiple layers */}
//         <div className='relative w-24 h-24 rounded-full bg-gradient-to-r from-[#00ACDA] to-[#43D4FB] animate-ping'>
//           {/* Glassmorphism overlay */}
//           <div className='absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm'></div>

//           {/* Central dot */}
//           <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-pulse shadow-lg shadow-cyan-400/50'></div>
//         </div>

//         {/* Orbiting dots */}
//         <div
//           className='absolute inset-0 w-24 h-24 animate-spin'
//           style={{ animationDuration: "3s" }}
//         >
//           <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#43D4FB] rounded-full shadow-lg shadow-cyan-400/50'></div>
//           <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#00ACDA] rounded-full shadow-lg shadow-blue-400/50'></div>
//           <div className='absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-[#43D4FB] rounded-full shadow-lg shadow-cyan-400/50'></div>
//           <div className='absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-[#00ACDA] rounded-full shadow-lg shadow-blue-400/50'></div>
//         </div>
//       </div>

//       {/* Loading text with typewriter effect */}
//       <div className='mt-8 text-center'>
//         <div className='text-2xl font-light text-white mb-2 animate-pulse'>
//           Loading
//           <span
//             className='inline-block animate-bounce ml-1'
//             style={{ animationDelay: "0s" }}
//           >
//             .
//           </span>
//           <span
//             className='inline-block animate-bounce ml-0.5'
//             style={{ animationDelay: "0.2s" }}
//           >
//             .
//           </span>
//           <span
//             className='inline-block animate-bounce ml-0.5'
//             style={{ animationDelay: "0.4s" }}
//           >
//             .
//           </span>
//         </div>

//         {/* Progress indicator */}
//         <div className='w-48 h-1 bg-slate-700 rounded-full overflow-hidden'>
//           <div className='h-full bg-gradient-to-r from-[#00ACDA] to-[#43D4FB] rounded-full animate-pulse transform origin-left scale-x-75'></div>
//         </div>

//         <p className='text-slate-400 text-sm mt-3 animate-pulse'>
//           Please wait while we prepare everything...
//         </p>
//       </div>

//       {/* Floating elements for extra visual appeal */}
//       <div
//         className='absolute top-20 right-20 w-8 h-8 border border-cyan-400/20 rounded-full animate-ping'
//         style={{ animationDelay: "1.5s" }}
//       ></div>
//       <div
//         className='absolute bottom-20 left-20 w-6 h-6 border border-blue-400/20 rounded-full animate-ping'
//         style={{ animationDelay: "2.5s" }}
//       ></div>

//       {/* Subtle glow effect */}
//       <div className='absolute inset-0 bg-gradient-to-r from-[#00ACDA]/5 via-transparent to-[#43D4FB]/5 pointer-events-none'></div>
//     </div>
//   );
// }

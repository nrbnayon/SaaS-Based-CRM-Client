// src/app/(dashboard)/tutorial/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  Clock,
  RotateCcw,
  SkipForward,
  SkipBack,
} from "lucide-react";

export default function TutorialPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(0);

  // Tutorial sections data
  const tutorialSections = [
    {
      id: 0,
      title: "Introduction & Setup",
      duration: "3:20",
      startTime: 0,
      completed: true,
      description: "Get familiar with the interface and initial setup",
    },
    {
      id: 1,
      title: "Basic Navigation",
      duration: "4:15",
      startTime: 200,
      completed: true,
      description: "Learn how to navigate through different sections",
    },
    {
      id: 2,
      title: "Core Features",
      duration: "6:30",
      startTime: 455,
      completed: false,
      description: "Master the main functionality and tools",
    },
    {
      id: 3,
      title: "Advanced Tips",
      duration: "3:45",
      startTime: 845,
      completed: false,
      description: "Pro tips for efficient workflow",
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeVolume = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
  };

  const seekTo = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setCurrentTime(time);
  };

  const skipForward = () => {
    seekTo(Math.min(currentTime + 10, duration));
  };

  const skipBackward = () => {
    seekTo(Math.max(currentTime - 10, 0));
  };

  const jumpToChapter = (chapterIndex: number) => {
    setCurrentChapter(chapterIndex);
    seekTo(tutorialSections[chapterIndex].startTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const completedChapters = tutorialSections.filter(
    (section) => section.completed
  ).length;
  const progressPercentage =
    (completedChapters / tutorialSections.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="font-manrope-bold text-4xl text-primary mb-4">
              Software Tutorial
            </h1>
            <p className="font-manrope-regular text-lg text-muted-foreground max-w-2xl mx-auto">
              Master our software with comprehensive video tutorials. Follow
              along step-by-step to unlock the full potential of your tools.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow">
              {/* Video Player */}
              {/* <div className="relative aspect-video bg-dark-primary rounded-t-2xl overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                  poster="https://via.placeholder.com/1280x720/080635/ffffff?text=Tutorial+Video"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                  <div className="mb-4">
                    <div
                      className="w-full h-1 bg-white/20 rounded-full cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newTime = (clickX / rect.width) * duration;
                        seekTo(newTime);
                      }}
                    >
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-150"
                        style={{
                          width: `${
                            duration ? (currentTime / duration) * 100 : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlay}
                        className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </button>

                      <button
                        onClick={skipBackward}
                        className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors rounded-full hover:bg-white/10"
                      >
                        <SkipBack className="w-5 h-5" />
                      </button>

                      <button
                        onClick={skipForward}
                        className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors rounded-full hover:bg-white/10"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={toggleMute}
                          className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>

                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => changeVolume(Number(e.target.value))}
                          className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                        />
                      </div>

                      <span className="text-sm font-manrope-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h2 className="font-manrope-bold text-2xl text-primary mb-3">
                  {tutorialSections[currentChapter].title}
                </h2>
                <p className="font-manrope-regular text-muted-foreground text-lg leading-relaxed">
                  {tutorialSections[currentChapter].description}. This
                  comprehensive guide will walk you through everything you need
                  to know to get the most out of our software.
                </p>

                <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Chapter Duration:{" "}
                    {tutorialSections[currentChapter].duration}
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-success" />
                    {completedChapters} of {tutorialSections.length} Complete
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Progress Overview */}
            {/* <div className="bg-card rounded-2xl border border-border card-shadow p-6 mb-6">
              <h3 className="font-manrope-bold text-lg text-primary mb-4">
                Your Progress
              </h3>
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-secondary"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      className="text-primary transition-all duration-500"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 40}`,
                        strokeDashoffset: `${
                          2 * Math.PI * 40 * (1 - progressPercentage / 100)
                        }`,
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-manrope-bold text-xl text-primary">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </div>
                <p className="font-manrope-medium text-success">
                  {progressPercentage === 100 ? "Completed!" : "Keep going!"}
                </p>
              </div>
            </div> */}

            {/* Chapter Navigation */}
            {/* <div className="bg-card rounded-2xl border border-border card-shadow p-6">
              <h3 className="font-manrope-bold text-lg text-primary mb-4">
                Chapters
              </h3>
              <div className="space-y-3">
                {tutorialSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => jumpToChapter(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      currentChapter === index
                        ? "border-primary bg-accent text-primary"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {section.completed ? (
                          <CheckCircle className="w-5 h-5 text-success mr-3" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-custom mr-3" />
                        )}
                        <h4 className="font-manrope-semibold">
                          {section.title}
                        </h4>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {section.duration}
                      </span>
                    </div>
                    <p className="font-manrope-regular text-sm text-muted-foreground pl-8">
                      {section.description}
                    </p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => seekTo(0)}
                className="w-full mt-6 py-3 px-4 bg-secondary hover:bg-secondary/80 text-primary font-manrope-semibold rounded-xl transition-colors flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart Tutorial
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

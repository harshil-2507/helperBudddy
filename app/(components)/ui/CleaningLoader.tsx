"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Brush, Droplets, Wind, Sparkles } from "lucide-react";

const CleaningLoader = () => {
    const [progress, setProgress] = useState(0);
    const [showComplete, setShowComplete] = useState(false);

    const steps = [
        {
            icon: <Brush className="w-16 h-16" />,
            text: "Brushing Dust...",
            color: "text-orange-500",
        },
        {
            icon: <Droplets className="w-16 h-16" />,
            text: "Spraying Liquid...",
            color: "text-blue-500",
        },
        {
            icon: <Wind className="w-16 h-16" />,
            text: "Wiping Clean...",
            color: "text-purple-500",
        },
        {
            icon: <Sparkles className="w-16 h-16" />,
            text: "Adding Final Touches...",
            color: "text-yellow-500",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setShowComplete(true), 500);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    // Calculate current step (0-3)
    const currentStep = Math.min(Math.floor(progress / 25), 3);

    // Calculate the circle's parameters
    const radius = 150; // Increased radius for a larger circle
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    if (showComplete) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center">
                <div className="text-center animate-fade-in">
                    <div className="flex items-center">
                        <Image
                            src="/asserts/helperBuddyLogo.avif"
                            alt="Helper Buddy Logo"
                            width={100}
                            height={100}
                            className="h-20 w-auto"
                        />
                        <h1 className="text-6xl font-bold bg-white bg-clip-text text-transparent">
                            HelperBuddy
                        </h1>
                    </div>
                    <div className="relative mt-8">
                        <Sparkles className="w-24 h-24 text-yellow-400 animate-pulse" />
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-transparent opacity-75 animate-shine" />
                    </div>
                    <p className="mt-4 text-2xl text-gray-600">
                        Making your spaces fresh and healthy!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
            {/* Circular Loader */}
            <div className="relative w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]">
                {/* Background circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        className="stroke-current text-gray-200"
                        strokeWidth="20"
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        className={`stroke-current ${steps[currentStep].color}`}
                        strokeWidth="20"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                            transition: "stroke-dashoffset 0.1s ease, stroke 0.3s ease",
                        }}
                    />
                </svg>

                {/* Center content */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div
                        className={`mb-6 transition-all duration-300 ${steps[currentStep].color}`}
                    >
                        {steps[currentStep].icon}
                    </div>
                    <div className="text-6xl font-bold text-gray-700">
                        {progress}%
                    </div>
                </div>
            </div>

            {/* Status text */}
            <div className="mt-8 text-3xl font-medium text-gray-600 h-16">
                {steps[currentStep].text}
            </div>

            {/* Step indicators */}
            <div className="mt-8 flex space-x-8">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`w-6 h-6 rounded-full transition-colors duration-300 ${index <= currentStep ? steps[currentStep].color : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

// Add required styles
const styles = `
  @keyframes shine {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-shine {
    animation: shine 1.5s infinite;
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;

const WrappedLoader = () => (
    <>
        <style>{styles}</style>
        <CleaningLoader />
    </>
);

export default WrappedLoader;
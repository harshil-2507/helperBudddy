"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";


// Define greeting messages in different languages
const greetings = [
  { language: "", text: "Welcome to Helper Buddy" },
  // { language: "Hindi", text: "हेल्पर बडी में आपका स्वागत है" },
  // { language: "Gujarati", text: "હેલ્પર બડી માં આપનું સ્વાગત છે" }
];

const Loader = () => {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [isAnimatingText, setIsAnimatingText] = useState(true);

  useEffect(() => {
    const cycleTime = 2000; // Time for each greeting
    const totalCycles = greetings.length;
    const totalAnimationTime = cycleTime * totalCycles;

    const greetingInterval = setInterval(() => {
      setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, cycleTime);

    const completeAnimationTimeout = setTimeout(() => {
      console.log(isAnimatingText)
      setIsAnimatingText(false);
    }, totalAnimationTime);

    const hideTimeout = setTimeout(() => {
      setShowLoader(false);
      document.body.style.overflow = "auto";
    }, totalAnimationTime + 500);

    // Play a simple sound effect
    const sound = new Howl({
      src: ["https://example.com/your-sound-file.mp3"], // Replace with your sound file URL
      autoplay: true,
      loop: true,
      volume: 0.5,
      onend: () => {
        sound.play();
      }
    });

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(hideTimeout);
      clearTimeout(completeAnimationTimeout);
      sound.unload();
    };
  }, [isAnimatingText]);

  if (!showLoader) return null;

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: showLoader ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo */}
      <div className="mb-10 relative w-32 h-32">
        <Image
          src="/asserts/helperBuddyLogo.avif"
          alt="Helper Buddy Logo"
          fill
          className="object-contain"
        />
      </div>

      {/* Animated Text for Greetings */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGreetingIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center w-full max-w-2xl px-6"
        >
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-2xl md:text-3xl text-white font-bold mb-2 break-words"
          >
            {greetings[currentGreetingIndex].text.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          <p className="text-gray-400 mt-2 text-lg">{greetings[currentGreetingIndex].language}</p>
        </motion.div>
      </AnimatePresence>

      {/* Loading Indicator */}
      <motion.div
        className="mt-12 w-60 h-1 bg-gray-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }} // Complete one turn in 2 seconds
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
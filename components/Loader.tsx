"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Define greeting messages in different languages
const greetings = [
  { language: "English", text: "Welcome to Helper Buddy" },
  { language: "Hindi", text: "हेल्पर बडी में आपका स्वागत है" },
  { language: "Gujarati", text: "હેલ્પર બડી માં આપનું સ્વાગત છે" }
];

const Loader = () => {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Animation for cycling through greetings
    const greetingInterval = setInterval(() => {
      setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 1000);

    // Hide loader after 3.5 seconds
    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(hideTimeout);
    };
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black`}
      animate={{ 
        top: visible ? "0%" : "-100%",
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
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
      <motion.div
        key={currentGreetingIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-2xl md:text-3xl text-white font-bold mb-2"
        >
          {greetings[currentGreetingIndex].text.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>
        <p className="text-gray-400">{greetings[currentGreetingIndex].language}</p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
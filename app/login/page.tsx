// app/(auth)/login/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { Button } from "@/app/(components)/ui/button";
import { Input } from "@/app/(components)/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CircleDot, Sparkles, Workflow } from "lucide-react";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [randomPositions, setRandomPositions] = useState<Array<{ top: string; left: string; color: string }>>([]);
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const generateRandomPositions = () => {
      const positions = Array.from({ length: 10 }, () => {
        const parentRect = parentRef.current?.getBoundingClientRect();
        const top = `${Math.random() * (parentRect?.height || 0 - 100) + 50}px`;
        const left = `${Math.random() * (parentRect?.width || 0 - 100) + 50}px`;
        const colors = ["text-white-100"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return { top, left, color };
      });
      setRandomPositions(positions);
    };

    if (parentRef.current) {
      generateRandomPositions();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token, { expires: 1 });
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);
        router.push(`/user/${data._id}`);//can update this to username if we want to get url beutiful like {baseurl}/user/username , data permits which attributes?? means is it contain username?? may be Yesss.. see User model
      } else {
        console.log(data);
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomPosition = () => {
    if (!parentRef.current) return { top: "0", left: "0", color: "text-green-500" };
    const parentRect = parentRef.current.getBoundingClientRect();
    const top = `${Math.random() * (parentRect.height - 100)}px`;
    const left = `${Math.random() * (parentRect.width - 100)}px`;
    const colors = ["text-white"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { top, left, color };
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-white  via-slate-500 to-black">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black/45">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full" ref={parentRef}>
            {randomPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  top: pos.top, 
                  left: pos.left,
                  scale: 0
                }}
                animate={{
                  top: generateRandomPosition().top,
                  left: generateRandomPosition().left,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <CircleDot className={`${pos.color}/20`} size={100 + i * 20} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="h-8 w-8 text-green-400" />
              <h1 className="text-4xl font-bold">HelperBuddy</h1>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-100/15 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {!showForgotPassword ? (
                <div>
                    <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-gray-200">Login to access your dashboard</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>
  
            <p className="text-center text-gray-400 mt-4">
              New user? <Link href="/signup" className="text-green-400 hover:underline">Sign up here</Link>
            </p>
            <p className="text-center text-gray-400 mt-4">
              Forgot password? <button onClick={() => setShowForgotPassword(true)} className="text-green-400 hover:underline">Reset here</button>
            </p>

              </div>
            ) : (
              <ForgotPasswordForm />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
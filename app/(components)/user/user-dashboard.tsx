"use client"
import React, { useState } from "react"
import { UserInfo } from "./user-info"
import { UserOrders } from "./user-orders"
import { UserRecommendations } from "./user-recommendations"
import { UserSidebar } from "./user-sidebar"
import { AiAssistant } from "./ai-assistant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"
import { dummyOrders, dummyRecommendations } from "./dummy-data"

// Define the User interface to match your actual MongoDB model
interface User {
  _id: string;
  username: string;
  email: string;
  area: string;
  address: string;
  isVerified: boolean;
  interestedCategory?: string[];
  walletCoins: number;
  referralCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Note: password, otp, resetPasswordToken are excluded for security
}

// Define Order interface (you'll need to replace dummyOrders with real data later)
interface Order {
  _id: string;
  userId: string;
  // Add order properties
}

// Define Recommendation interface (you'll need to replace dummyRecommendations with real data later)
interface Recommendation {
  _id: string;
  // Add recommendation properties
}

// Define props interface
interface UserDashboardProps {
  user: User;
  orders?: Order[]; // Optional for now, can be added later
  recommendations?: Recommendation[]; // Optional for now, can be added later
}

export function UserDashboard({ user, orders, recommendations }: UserDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated gradient background with stars effect */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-black animate-gradient">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIxIi8+PC9nPjwvc3ZnPg==')] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
        </div>
      </div>
      
      {/* Animated floating orbs effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 size-80 rounded-full bg-gray-800/40 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -left-20 size-60 rounded-full bg-gray-700/40 blur-3xl animate-float-medium" />
        <div className="absolute -bottom-40 right-1/3 size-80 rounded-full bg-gray-600/40 blur-3xl animate-float-fast" />
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 border-b border-white/10 bg-black/30 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-white/10">
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 size-2 bg-gray-300 rounded-full" />
              </Button>
              <Button
                onClick={() => setIsSidebarOpen(true)}
                variant="ghost"
                className="size-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-900 text-gray-100 hover:from-gray-300 hover:to-gray-800"
              >
                <span className="text-lg font-semibold">
                  {user.username?.charAt(0).toUpperCase() || 
                   user.email?.charAt(0).toUpperCase() || 
                   'U'}
                </span>
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 container relative px-4 py-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UserInfo user={user} className="lg:col-span-2 shadow-lg border-0" />
            <AiAssistant className="shadow-lg border-0" />
            <UserOrders 
              orders={orders || dummyOrders} 
              className="lg:col-span-2 shadow-lg border-0" 
            />
            <UserRecommendations 
              recommendations={recommendations || dummyRecommendations} 
              className="lg:col-span-3 shadow-lg border-0" 
            />
          </div>
        </main>
      </div>
      
      <UserSidebar user={user} open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  )
}
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
import { dummyUser, dummyOrders, dummyRecommendations } from "./dummy-data"
import Referral from "../Referral";

export function UserDashboard() {
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
              <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 border border-white/20">
                <Search className="size-4 text-gray-300" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-400"
                />
              </div>
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
                <span className="text-lg font-semibold">{dummyUser.username.charAt(0).toUpperCase()}</span>
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 container relative px-4 py-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UserInfo user={dummyUser} className="lg:col-span-2 shadow-lg border-0" />
            <AiAssistant className="shadow-lg border-0" />
            <Referral user={dummyUser}/>
            <UserOrders orders={dummyOrders} className="lg:col-span-2 shadow-lg border-0" />
            <UserRecommendations recommendations={dummyRecommendations} className="lg:col-span-3 shadow-lg border-0" />
          </div>
        </main>
      </div>
      
      <UserSidebar user={dummyUser} open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  )
}
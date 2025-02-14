"use client"

import { useState } from "react"
import type { IUser } from "@/models/User"
import { UserInfo } from "./user-info"
import { UserOrders } from "./user-orders"
import { UserRecommendations } from "./user-recommendations"
import { UserSidebar } from "./user-sidebar"
import { Button } from "../ui/button"

interface UserDashboardProps {
  user: IUser
}

export function UserDashboard({ user }: UserDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button
            onClick={() => setIsSidebarOpen(true)}
            variant="ghost"
            className="h-8 w-8 rounded-full bg-primary/10 p-0"
          >
            <span className="text-lg font-semibold">{user.username.charAt(0).toUpperCase()}</span>
          </Button>
        </div>
      </header>

      <main className="container grid gap-6 px-4 py-6 md:grid-cols-2 lg:grid-cols-3">
        <UserInfo user={user} className="lg:col-span-2" />
        {/* <UserOrders orders={user.orders} />
        <UserRecommendations categories={user.interestedCategory} className="lg:col-span-3" /> */}
      </main>

      <UserSidebar user={user} open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  )
}


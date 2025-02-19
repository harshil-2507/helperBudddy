"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, User, ShoppingBag, Star, Settings, LogOut } from "lucide-react"

interface UserSidebarProps {
  user: {
    username: string
    email: string
  }
  open: boolean
  onClose: () => void
}

export function UserSidebar({ user, open, onClose }: UserSidebarProps) {
  const [activeSection, setActiveSection] = useState("profile")
  
  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "recommendations", label: "Recommendations", icon: Star },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      // Don't close immediately to allow animation
      setTimeout(() => onClose(), 500)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 w-80 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl text-white">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-gray-700">
                <X className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-medium text-white">{user.username}</h3>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? "bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${
                      activeSection === section.id 
                        ? "text-white" 
                        : "text-gray-400"
                    }`} />
                    <span>{section.label}</span>
                    {activeSection === section.id && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-white" />
                    )}
                  </button>
                )
              })}
            </nav>
          </ScrollArea>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-400 hover:text-red-400 hover:bg-gray-800 py-3"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
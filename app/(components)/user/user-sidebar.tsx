"use client"

import type  {User} from "@/models/User"
import { Sheet, SheetContent } from "../ui/sheet"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { X } from "lucide-react"

interface UserSidebarProps {
  user: User
  open: boolean
  onClose: () => void
}

export function UserSidebar({ user, open, onClose }: UserSidebarProps) {
  const sections = [
    { id: "profile", label: "Profile" },
    { id: "orders", label: "Orders" },
    { id: "recommendations", label: "Recommendations" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      onClose()
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[300px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold">{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="mt-6">
          <div className="space-y-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}


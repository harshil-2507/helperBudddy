"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog } from "./ui/dialog"
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { X } from "lucide-react"

// Dummy data for services and sub-services
const services = [
  // {
  //   id: 1,
  //   title: "Women's Salon & Spa",
  //   icon: "/placeholder.svg?height=100&width=100",
  //   subServices: [
  //     { title: "Hair Styling", icon: "/placeholder.svg?height=80&width=80" },
  //     { title: "Facial", icon: "/placeholder.svg?height=80&width=80" },
  //     { title: "Manicure & Pedicure", icon: "/placeholder.svg?height=80&width=80" },
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "Men's Salon & Massage",
  //   icon: "/placeholder.svg?height=100&width=100",
  //   subServices: [
  //     { title: "Haircut", icon: "/placeholder.svg?height=80&width=80" },
  //     { title: "Beard Grooming", icon: "/placeholder.svg?height=80&width=80" },
  //     { title: "Massage", icon: "/placeholder.svg?height=80&width=80" },
  //   ],
  // },
  {
    id: 3,
    title: "AC & Appliance Repair",
    icon: "/placeholder.svg?height=100&width=100",
    subServices: [
      { title: "AC Service & Repair", icon: "/placeholder.svg?height=80&width=80" },
      { title: "Refrigerator Repair", icon: "/placeholder.svg?height=80&width=80" },
      { title: "Washing Machine Repair", icon: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: 4,
    title: "Cleaning",
    icon: "/placeholder.svg?height=100&width=100",
    subServices: [
      { title: "Bathroom & kitchen cleaning", icon: "/placeholder.svg?height=80&width=80" },
      { title: "Full Home Cleaning", icon: "/placeholder.svg?height=80&width=80" },
      { title: "Sofa & Carpet Cleaning", icon: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: 5,
    title: "Electrician, Plumber & Carpenter",
    icon: "/placeholder.svg?height=100&width=100",
    subServices: [
      { title: "Electrical Repairs", icon: "/placeholder.svg?height=80&width=80" },
      { title: "Plumbing Services", icon: "/placeholder.svg?height=80&width=80" },
      { title: "Carpentry Work", icon: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: 6,
    title: "Native Water Purifier",
    icon: "/placeholder.svg?height=100&width=100",
    subServices: [
      { title: "Installation", icon: "/placeholder.svg?height=80&width=80" },
      { title: "Repair", icon: "/placeholder.svg?height=80&width=80" },
      { title: "Maintenance", icon: "/placeholder.svg?height=80&width=80" },
    ],
  },
  // {
  //   id: 7,
  //   title: "Native Smart Locks",
  //   icon: "/placeholder.svg?height=100&width=100",
  //   subServices: [
  //     { title: "Installation", icon: "/placeholder.svg?height=80&width=80" },
  //     { title: "Repair", icon: "/placeholder.svg?height=80&width=80" },
  //     { title: "Upgrade", icon: "/placeholder.svg?height=80&width=80" },
  //   ],
  // },
  // {
  //   id: 8,
  //   title: "Full home painting",
  //   icon: "/placeholder.svg?height=100&width=100",
  //   subServices: [
  //     { title: "Interior Painting", icon: "/placeholder.svg?height=80&width=80" },
  //     { title: "Exterior Painting", icon: "/placeholder.svg?height=80&width=80" },
  //     { title: "Wall Textures", icon: "/placeholder.svg?height=80&width=80" },
  //   ],
  // },
]

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="mb-2 text-4xl font-bold">Home services at your doorstep</h2>
      <h3 className="mb-8 text-2xl text-muted-foreground">What are you looking for?</h3>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service)}
            className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center transition-all hover:bg-gray-100"
          >
            <div className="relative h-24 w-24 mb-4">
              <Image src={service.icon || "/placeholder.svg"} alt={service.title} fill className="object-contain" />
            </div>
            <h4 className="text-sm font-medium">{service.title}</h4>
          </button>
        ))}
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedService?.title}</DialogTitle>
            <button
              onClick={() => setSelectedService(null)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {selectedService?.subServices.map((subService, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center">
                <div className="relative h-16 w-16 mb-2">
                  <Image
                    src={subService.icon || "/placeholder.svg"}
                    alt={subService.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h5 className="text-sm font-medium">{subService.title}</h5>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}


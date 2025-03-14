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
    icon: "/asserts/ac.webp",
    subServices: [
      { title: "AC Service & Repair", icon: "/asserts/ac.webp" },
      { title: "Refrigerator Repair", icon: "/asserts/refrigerator.jpg" },
      { title: "Washing Machine Repair", icon: "/asserts/washingmachine.jpg" },
    ],
  },
  {
    id: 4,
    title: "Cleaning",
    icon: "/asserts/cleaning_homepage.jpg",
    subServices: [
      { title: "Bathroom & kitchen cleaning", icon: "/asserts/bathroom and kitchen.jpg" },
      { title: "Full Home Cleaning", icon: "/asserts/fullhome.jpg" },
      { title: "Sofa & Carpet Cleaning", icon: "/asserts/sofa and carpet.webp" },
    ],
  },
  {
    id: 5,
    title: "Electrician, Plumber & Carpenter",
    icon: "/asserts/elec,plum,carp.webp",
    subServices: [
      { title: "Electrical Repairs", icon: "/asserts/electrical.jpg" },
      { title: "Plumbing Services", icon: "/asserts/plumber.webp" },
      { title: "Carpentry Work", icon: "/asserts/carenter.jpg" },
    ],
  },
  {
    id: 6,
    title: "Native Water Purifier",
    icon: "/asserts/watermain.webp",
    subServices: [
      { title: "Installation", icon: "/asserts/waterservice.webp" },
      { title: "Repair", icon: "/asserts/water services.jpg" },
      { title: "Maintenance", icon: "/asserts/watermain.webp" },
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
            <div className="relative h-40 w-40 mb-4">
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
                <div className="relative h-24 w-32 mb-2">
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


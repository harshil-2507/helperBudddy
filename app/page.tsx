"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, User, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./(components)/ui/accordion"
import { Button } from "./(components)/ui/button"
import { Input } from "./(components)/ui/input"
import { Textarea } from "./(components)/ui/textarea"
import ServicesGrid from "./(components)/services-grid"
import { AuthProvider } from "@/context/AuthContext"
import AnimatedTestimonials from "./(components)/testinomial"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Loader from "./(components)/Loader"

export default function Home() {
  const [email, setEmail] = useState("")
  const [initialLoading, setInitialLoading] = useState(true)
  
  useEffect(() => {
    if (initialLoading) {
      document.body.style.overflow = "hidden"
    }

    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [initialLoading]) // Added initialLoading to dependencies

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const dynamicText = ""

  return (
    <AuthProvider>
      <Loader />

      <main className="relative">
        <div className="absolute inset-0 h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover brightness-100"
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/asserts/prism.mp4" type="video/mp4" />
            <Image
              src="/asserts/cleaning_homepage.jpg"
              alt="Cleaning service professionals"
              fill
              className="object-cover brightness-75"
            />
          </video>
        </div>

        <nav className="relative z-10 bg-transparent py-4">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/asserts/helperBuddyLogo.avif"
                  alt="Helper Buddy Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-white"></span>
              </Link>

              <div className="flex items-center gap-6">
                <Link href="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
                <Link href="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/cart" className="text-gray-300 hover:text-white">
                <ShoppingCart className="h-6 w-6 text-white" />
              </Link>
              <Link href="/login" className="text-gray-300 hover:text-white">
                <User className="h-6 w-6 text-white" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Updated Hero Section */}
        <div className="relative h-screen">
          <div className="container mx-auto px-4 h-full flex items-center justify-center pt-20">
            <div className="text-center mt-16">
              <div>
                <motion.h2
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-8"
                >
                  {dynamicText.split("").map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h2>
              </div>
              <Link
                href="/book"
                className="inline-block rounded-full border-2 border-white bg-transparent px-8 py-3 text-white transition-colors hover:bg-white hover:text-black mt-6"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>

        <ServicesGrid />

        <AnimatedTestimonials />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Frequently asked questions</h2>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is HelperBuddy?</AccordionTrigger>
                  <AccordionContent>
                    HelperBuddy is a cleaning service that helps keep your home and office clean. We also clean air
                    conditioning units. Our goal is to make your spaces fresh and healthy.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What cleaning services do you offer?</AccordionTrigger>
                  <AccordionContent>
                    We offer a variety of cleaning services, including home cleaning, office cleaning, and AC cleaning.
                    Whether you need a deep clean or regular maintenance, we've got you covered.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I book a cleaning service?</AccordionTrigger>
                  <AccordionContent>
                    Booking is easy! Just give us a call or fill out our online form. We'll set up a time that works
                    best for you.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How much does your service cost?</AccordionTrigger>
                  <AccordionContent>
                    The cost depends on the size of your home or office and the type of cleaning you need. We have
                    options for every budget. For exact prices, check our pricing page/contact us.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="bg-black py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold">Get in touch</h2>
                <div className="mb-8">
                  <h3 className="mb-2 text-xl font-semibold">Address</h3>
                  <p>Amroli Cross Rd, near Santosh Electronics,</p>
                  <p>Bhagu Nagar-1, Amroli, Surat, Gujarat-394107</p>
                </div>
                <div className="mb-8">
                  <h3 className="mb-2 text-xl font-semibold">Contacts</h3>
                  <p>+91 6359398479</p>
                  <p>hello@helperbuddy.in</p>
                </div>
                <div className="flex gap-4">
                  <Link href="https://www.facebook.com/people/Helper-Buddy/61566410515044/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link href="https://www.instagram.com/helperbuddy.in/reels/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link href="https://x.com/helperbuddyin" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                    <Twitter className="h-6 w-6" />
                  </Link>
                </div>
              </div>
              <div>
                <form className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block">
                        Name*
                      </label>
                      <Input id="name" className="bg-white" required />
                    </div>
                    <div>
                      <label htmlFor="lastname" className="mb-2 block">
                        Last name
                      </label>
                      <Input id="lastname" className="bg-white" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block">
                      Your email*
                    </label>
                    <Input id="email" type="email" className="bg-white" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block">
                      Message*
                    </label>
                    <Textarea id="message" className="min-h-[120px] bg-white" required />
                  </div>
                  <Button className="w-fit bg-white text-black hover:bg-gray-100">Submit Button</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthProvider>
  )
}


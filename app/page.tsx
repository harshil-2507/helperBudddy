import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, User, Star, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./(components)/ui/accordion"
import { Button } from "./(components)/ui/button"
import { Input } from "./(components)/ui/input"
import { Textarea } from "./(components)/ui/textarea"
import SearchBar from "./(components)/SearchBar"
import ServicesGrid from "./(components)/services-grid"
import { AuthProvider } from "@/context/AuthContext"
import AnimatedTestimonials from "./(components)/testinomial"
import Navbar from "./(components)/ui/Navbar"
export default function Home() {
  return (
    <AuthProvider>
      <main>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="/asserts/cleaning_homepage.jpg"
          
          alt="Cleaning service professionals"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="container mx-auto max-w-4xl px-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Reliable, Fast & Affordable Services – Your Helper Buddy is Just a Click Away
          </h1>
          <Link
            href="/book"
            className="mt-8 rounded-full border-2 border-white bg-transparent px-8 py-3 text-white transition-colors hover:bg-white hover:text-black"
          >
            BOOK NOW
          </Link>
        </div>
      </section>

      <ServicesGrid />

      {/* Testimonials Section */}
      <AnimatedTestimonials/>

      {/* FAQ Section */}
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
                  Booking is easy! Just give us a call or fill out our online form. We'll set up a time that works best
                  for you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How much does your service cost?</AccordionTrigger>
                <AccordionContent>
                  The cost depends on the size of your home or office and the type of cleaning you need. We have options
                  for every budget. For exact prices, check our pricing page/contact us.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
                <p>6359398479</p>
                <p>hello@helperbuddy.in</p>
              </div>
              <div className="flex gap-4">
                <Link href="#" className="text-white hover:text-gray-300">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
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


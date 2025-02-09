import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import ServicesGrid from "./(components)/services-grid"

export default function Home() {
  return (
    <main>
      {/* Top Location Bar */}
      {/* <div className="w-full bg-white py-1 text-center text-sm font-medium">WE ARE AVAILABLE IN MUMBAI,SURAT</div> */}

      {/* Navigation */}
      <nav className="bg-black py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-white">
            HB
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-white underline"> 
              Home
            </Link>
            <Link href="/services" className="text-white">
              Services
            </Link>
            <Link href="/blog" className="text-white">
              Blog
            </Link>
            <Link href="/contact" className="text-white">
              Contact
            </Link>
            <Link href="/about" className="text-white">
              About
            </Link>
            <Link href="/cart" className="text-white">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/login" className="text-white"> 
              Sign in
            </Link>
          </div>
        </div>
      </nav>

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
    </main>
  )
}


import "./globals.css"
import type { Metadata } from "next"
import type React from "react" // Import React

export const metadata: Metadata = {
  title: "Helper Buddy - Professional Home Services",
  description: "Reliable, Fast & Affordable Home Services in Mumbai and Surat",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


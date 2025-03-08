// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import { CartProvider } from "@/context/CartContext";
// import Navbar from "./(components)/ui/Navbar";
// import Head from "next/head";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "HelperBuddy",
//   description: "A leading SaaS platform",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
      
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         suppressHydrationWarning
//       >
//         <AuthProvider>
//         <CartProvider>
//           {/* <Navbar/> */}

//           {children}
//         </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
// import Navbar from "./(components)/ui/Navbar";
// import Navbar from "./(components)/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata
export const metadata: Metadata = {
  title: "HelperBuddy - Professional Cleaning Services in Surat & Mumbai",
  description:
    "HelperBuddy offers top-notch cleaning services in Surat and Mumbai. We provide residential, commercial, and deep cleaning services with a focus on quality and affordability.",
  keywords: [
    "cleaning services",
    "professional cleaning",
    "home cleaning",
    "office cleaning",
    "deep cleaning",
    "Surat cleaning services",
    "Mumbai cleaning services",
    "HelperBuddy",
    "affordable cleaning",
    "cleaning company",
  ],
  openGraph: {
    title: "HelperBuddy - Professional Cleaning Services in Surat & Mumbai",
    description:
      "HelperBuddy offers top-notch cleaning services in Surat and Mumbai. We provide residential, commercial, and deep cleaning services with a focus on quality and affordability.",
    url: "https://www.helperbuddy.com",
    siteName: "HelperBuddy",
    images: [
      {
        url: "https://www.helperbuddy.com/images/og-image.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "HelperBuddy - Cleaning Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HelperBuddy - Professional Cleaning Services in Surat & Mumbai",
    description:
      "HelperBuddy offers top-notch cleaning services in Surat and Mumbai. We provide residential, commercial, and deep cleaning services with a focus on quality and affordability.",
    images: ["https://www.helperbuddy.com/images/og-image.jpg"], // Replace with your actual OG image URL
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico", // Replace with your favicon path
    shortcut: "/favicon-16x16.png", // Replace with your favicon path
    apple: "/apple-touch-icon.png", // Replace with your favicon path
  },
  metadataBase: new URL("https://www.helperbuddy.com"), // Replace with your actual domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
        <CartProvider>
          {/* <Navbar/> */}
          {children}
        </CartProvider>
        </AuthProvider>
      </div>
      </body>
      </html>
  );
}
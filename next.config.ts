import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com"], // Add 'res.cloudinary.com' to the allowed domains
  },
};

export default nextConfig;
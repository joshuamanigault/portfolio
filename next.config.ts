import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Enable static export capability
  output: undefined, // Use 'export' for static site, undefined for Vercel
};

export default nextConfig;

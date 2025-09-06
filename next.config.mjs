/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increase body size limit for file uploads
    },
  },
  // Performance optimizations
  images: {
    domains: ["res.cloudinary.com", "localhost"],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Disable scroll restoration
  scrollRestoration: false,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    // Removed appDir as it's now default in Next.js 15
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;

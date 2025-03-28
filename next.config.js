/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com', 'randomuser.me', 'i.ibb.co', 'img.freepik.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', 'recharts'],
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development'
  }
};

module.exports = nextConfig;

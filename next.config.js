/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'recharts'],
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development'
  }
};

module.exports = nextConfig;

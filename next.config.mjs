/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static site generation
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    eslint:{
        ignoreDuringBuilds:true
    },
    images: {
        unoptimized: true,
    },
    // ignoreBuildErrors: true,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@heroicons/react'],
        serverActions: {
            bodySizeLimit: '15mb'
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ebook.sdnthailand.com', 
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'oaugjewc9whitxvv.public.blob.vercel-storage.com',
                port: '',
                pathname: '/images/**',
            }
        ],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    webpack: (config, { dev }) => {
        if (dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            }
        }
        return config
    },
};

export default nextConfig;
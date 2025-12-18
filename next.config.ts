import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {},
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
            {
                protocol: "https",
                hostname: "www.gravatar.com",
            },
        ],
    },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // imagem de test, ao implementar a api sera removido
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.dicebear.com",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;

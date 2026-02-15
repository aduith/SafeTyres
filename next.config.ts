import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    outputFileTracingRoot: "/Users/aduiths/Downloads/SafeTyres/SafeTyres",
};

export default nextConfig;

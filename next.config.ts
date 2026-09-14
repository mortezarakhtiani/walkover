import type {NextConfig} from "next";

const nextConfig: NextConfig = {
     allowedDevOrigins: ['192.168.1.102'],
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;

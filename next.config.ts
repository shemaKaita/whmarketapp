import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://picsum.photos/**")],
  },
  // environment variables can be defined here or in a .env file
};

export default nextConfig;

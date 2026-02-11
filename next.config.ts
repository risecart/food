import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-1c37b2c0ac504af39f174eebcbfdfd39.r2.dev",
        port: "", // optional
        pathname: "/**", // match all paths
      },
    ],
  },
  output: "standalone",

  reactStrictMode: false,
};

export default nextConfig;

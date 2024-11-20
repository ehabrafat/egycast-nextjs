import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "nauitlaphuishxksvvtj.supabase.co",
        pathname: "/**", // Match all paths
      },
    ],
  }
};

export default nextConfig;

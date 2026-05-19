import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    ...(process.env.NODE_ENV !== "production"
      ? { devtoolSegmentExplorer: false }
      : {}),
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**", // This allows any path under the hostname
      },
      {
        protocol: "https",
        hostname: "auzyjcdanenhoqyrbjxg.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  transpilePackages: ["motion"],
  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === "true") {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;

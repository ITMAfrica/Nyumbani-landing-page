import type {NextConfig} from 'next';

// In dev, Next 15 can inject SegmentViewNode (segment explorer) in a way that throws
// "not in the React Client Manifest" and then __webpack_modules__ errors. Disabling
// the explorer in development avoids that. Do not set this for production builds:
// `devtoolSegmentExplorer: false` breaks static prerender in this app on Next 15.5.15.
const nextConfig: NextConfig = {
  experimental: {
    ...(process.env.NODE_ENV !== 'production'
      ? {devtoolSegmentExplorer: false}
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
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'auzyjcdanenhoqyrbjxg.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;

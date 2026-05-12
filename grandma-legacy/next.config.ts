
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Stable dev in Safari: avoid RSC cache hook paths that can mismatch some React patch versions.
    useCache: false,
    cacheComponents: false
  },
  // Prevent Next from inferring a parent directory as the "root"
  // when multiple lockfiles exist on the machine.
  turbopack: {
    root: __dirname
  },
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      // Supabase Storage public URLs
      { protocol: "https", hostname: "**.supabase.co" }
    ]
  },
  // Browsers request /favicon.ico before parsing HTML; without it some hosts show a generic icon.
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.png" }];
  }
};

export default nextConfig;


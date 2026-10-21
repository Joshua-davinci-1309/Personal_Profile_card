import type { NextConfig } from "next";

/**
 * The site is fully static: `next build` emits `out/`, which is what GitHub Pages serves.
 * No server-only features (route handlers, ISR, cookies) are used on purpose so the
 * deployment target stays a plain CDN.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

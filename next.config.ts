import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback. Both are dramatically smaller than JPEG at
    // equivalent perceptual quality, which protects the LCP budget.
    formats: ["image/avif", "image/webp"],
    // Matches the container breakpoints in `globals.css` so the browser never
    // downloads a candidate wider than the layout can ever paint.
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
  },
  experimental: {
    // Tree-shakes `react-icons` down to only the glyphs actually imported
    // instead of pulling whole icon packs into the client bundle.
    // NOTE: `framer-motion` is deliberately NOT in this list. Its `motion`
    // export is a Proxy, and barrel-optimising it breaks dynamic member access
    // such as `motion[tag]`.
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;

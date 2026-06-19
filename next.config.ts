import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo from a subpath (https://<user>.github.io/ARI/).
 * For a static export to work there, every asset URL must be prefixed with that
 * subpath — otherwise the CSS/JS 404 and the site renders completely unstyled.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set to "/ARI" by the GitHub Pages workflow and is
 * empty locally, so `npm run dev` still works at http://localhost:3000.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export", // static HTML export for GitHub Pages
  basePath: basePath || undefined,
  trailingSlash: true, // emit /about/index.html so Pages serves clean URLs
  images: { unoptimized: true }, // no image optimization server on Pages
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true
  },
  generateBuildId: () => 'build',
  distDir: 'out',
  assetPrefix: ''
};

export default nextConfig;

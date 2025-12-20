import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true, // skips ESLint error checks during build
  },
  typescript: {
    ignoreBuildErrors: true, // skips TS type error checks during build
  },
  webpack: (config) => {
    // Exclude your scripts-db folder from module rules
    config.module.rules.push({
      test: /\.(js|ts|jsx|tsx)$/,
      include: [path.resolve(__dirname, "app/api/scripts-db")],
      loader: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next2",
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.drpolarizados.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "colonia.cloud",
      },
    ],
  },
};

export default nextConfig;

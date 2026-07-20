import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permitir eval() requerido por framer-motion y Lenis en desarrollo
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
        },
      ],
    },
  ],
};

export default nextConfig;

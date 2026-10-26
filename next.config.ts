import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // One address for search engines: www.spbcivilworks.com → spbcivilworks.com (permanent).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.spbcivilworks.com" }],
        destination: "https://spbcivilworks.com/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

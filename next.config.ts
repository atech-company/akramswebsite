import type { NextConfig } from "next";

const productionApiHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || "https://akramlab.atechleb.com/api/v1").hostname;
  } catch {
    return "akramlab.atechleb.com";
  }
})();

const nextConfig: NextConfig = {
  // HTML can be briefly cached at the edge; static assets stay long-lived via /_next
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|favicon.ico|brand/|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=10, stale-while-revalidate=60",
          },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    // Shared hosting often can't reach /_next/image — load remote URLs directly
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED !== "false",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.pcbway.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "content.instructables.com" },
      { protocol: "https", hostname: productionApiHost, pathname: "/storage/**" },
      { protocol: "https", hostname: productionApiHost, pathname: "/uploads/**" },
      { protocol: "https", hostname: "akramlab.atechleb.com", pathname: "/storage/**" },
      { protocol: "https", hostname: "akramlab.atechleb.com", pathname: "/uploads/**" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/storage/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/storage/**" },
    ],
  },
};

export default nextConfig;

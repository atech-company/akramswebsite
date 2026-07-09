import type { NextConfig } from "next";

const productionApiHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || "https://akramlab.atechleb.com/api/v1").hostname;
  } catch {
    return "akramlab.atechleb.com";
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.pcbway.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "content.instructables.com" },
      { protocol: "https", hostname: productionApiHost, pathname: "/storage/**" },
      { protocol: "https", hostname: "akramlab.atechleb.com", pathname: "/storage/**" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/storage/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/storage/**" },
    ],
  },
};

export default nextConfig;

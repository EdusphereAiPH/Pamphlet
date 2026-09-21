import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev overlay would otherwise get baked into panel textures and QA screenshots.
  devIndicators: false,
  // Dev only: let phones on the local network load the dev server's assets.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],
  // The QR code points at /p. Keep / as a courtesy redirect.
  async redirects() {
    return [{ source: "/", destination: "/p", permanent: false }];
  },
};

export default nextConfig;

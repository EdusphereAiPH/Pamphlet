import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The QR code points at /p. Keep / as a courtesy redirect.
  async redirects() {
    return [{ source: "/", destination: "/p", permanent: false }];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Allow local /images/ folder
    unoptimized: true,
  },
  // Proxy API calls through this same origin in production so auth cookies
  // stay first-party (Vercel + Render are different domains — without this,
  // browsers treat the backend's cookies as third-party and silently drop
  // them). Local dev talks to localhost:4000 directly, no proxy needed there
  // since same-hostname-different-port still counts as same-site.
  async rewrites() {
    if (!process.env.RENDER_API_ORIGIN) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.RENDER_API_ORIGIN}/api/:path*`,
      },
    ];
  },
};
module.exports = nextConfig;

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
};
module.exports = nextConfig;

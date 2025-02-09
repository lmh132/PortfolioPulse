/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Accepts any hostname
      },
      {
        protocol: "http",
        hostname: "**", // For HTTP images (if needed)
      },
    ],
  },
};

module.exports = nextConfig;

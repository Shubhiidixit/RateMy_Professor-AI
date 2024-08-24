/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Remove `appDir` if it's not needed
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase to 10 MB or as needed
    },
  },
};

module.exports = nextConfig;
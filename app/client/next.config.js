const { config } = require('@blox/config');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    SERVER_API_URL: config.SERVER_API_URL || 'http://localhost:1206/api',
    GITHUB_CLIENT_ID: config.GITHUB_CLIENT_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
}

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
})
module.exports = withPWA(nextConfig)

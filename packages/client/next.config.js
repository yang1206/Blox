const { config } = require('@my-blog/config');
const UnoCSS = require('@unocss/webpack').default
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
  webpack: (config, context) => {
    config.plugins.push(UnoCSS())

    if (context.buildId !== 'development')
      config.cache = false

    return config
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

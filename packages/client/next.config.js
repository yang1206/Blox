const UnoCSS = require('@unocss/webpack').default
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
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

module.exports = nextConfig

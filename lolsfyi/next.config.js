/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static.wikia.nocookie.net', 'cdn.mobalytics.gg', 'am-a.akamaihd.net', 'logos-world.net', 'www.factor.gg'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.81.213.226",
        port: "81",
        pathname: "/89/api/v1/download/**",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS,
        port: "81",
        pathname: "/89/api/v1/download/**",
      },
    ],
  },
}

module.exports = nextConfig

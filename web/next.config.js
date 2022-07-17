/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"],
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["blooms-strapi.herokuapp.com", "res.cloudinary.com"],
  },
}

if (process.env.NODE_ENV === "development") {
  nextConfig.images.domains.push("localhost");
}

module.exports = nextConfig

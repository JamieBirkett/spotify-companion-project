/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
  
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**imgur.com"
      },
      {
        protocol: "https",
        hostname: "i.scdn.co"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "images.rawpixel.com"
      },
    ],
  },
};

export default nextConfig;

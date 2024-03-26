/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://cowork-server.vercel.app/:path*', // Proxy to Backend
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
      
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
 
}


module.exports = nextConfig

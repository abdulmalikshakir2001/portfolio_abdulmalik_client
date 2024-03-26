/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:8000/:path*', // Proxy to Backend
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

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      async rewrites() {
        return [
          {
            source: '/:path*',
            destination: 'https://portfolio-abdulmalik-server.vercel.app/:path*', // Matched parameters can be used in the destination
            
          },
        ]
      },
}


module.exports = nextConfig

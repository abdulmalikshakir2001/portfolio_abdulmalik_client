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
            // destination: 'http://localhost:8000/:path*', // Matched parameters can be used in the destination
            destination: 'https://vercel.com/abdulmalikshakir2001s-projects/portfolio-abdulmalik-server/:path*', // Matched parameters can be used in the destination
          },
        ]
      },
}

module.exports = nextConfig

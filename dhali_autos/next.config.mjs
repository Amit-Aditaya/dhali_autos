/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'begautos.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'author.begautos.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;

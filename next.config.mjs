/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint: {
      ignoreDuringBuilds: true,
    },
  
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',   
        hostname: 'api.builder.io', 
      },
    ],
  },
};




export default nextConfig;

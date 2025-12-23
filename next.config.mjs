/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Three.js / React Three Fiber to work smoothly in some environments
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Disable powered by header for security
  poweredByHeader: false,
  
  // Optimization for images if you use the <Image /> component later
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
      },
    ],
  },
};

export default nextConfig;

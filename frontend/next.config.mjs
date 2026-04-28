/** @type {import('next').NextConfig} */


const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com', 'res.cloudinary.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
        ],
      }
    
}

export default nextConfig;

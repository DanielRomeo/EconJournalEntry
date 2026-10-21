/** @type {import('next').NextConfig} */


const nextConfig = {
    images: {
        remotePatterns: [
          { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/**' },
          { protocol: 'https', hostname: 'unsplash.com', pathname: '/**' },
          { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
          {
            protocol: 'https',
            hostname: 'i.ytimg.com',
            pathname: '/vi/**',
          },
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

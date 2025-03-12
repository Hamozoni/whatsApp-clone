/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers () {
        return [
            {
                source : '/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                    }
                ],
            }
        ]
    },
    images: {
        remotePatterns : [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port:'',
                pathname: '/*/**',

            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port:'',
                pathname: '/**',
                
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port:'',
                pathname: '/**',
                
            }
        ]
      },
};

export default nextConfig;


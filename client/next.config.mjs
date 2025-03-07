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
                ]
            }
        ]
    }
};

export default nextConfig;

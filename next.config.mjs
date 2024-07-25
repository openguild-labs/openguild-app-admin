/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/users",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Helps when using nodemailer in server code on Vercel
    serverComponentsExternalPackages: ['nodemailer'],
  },
};

export default nextConfig;

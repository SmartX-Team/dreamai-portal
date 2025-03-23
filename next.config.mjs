/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.minio.mobilex.kr",
        pathname: "/**/public/**",
      },
    ],
  },
};

export default nextConfig;

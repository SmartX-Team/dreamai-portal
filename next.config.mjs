/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  output: "standalone",
  async rewrites() {
    return { fallback: [{ source: "/images/:path*", destination: "/api/portal-content/legacy/images/:path*" }] };
  },
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

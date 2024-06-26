/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cloud.appwrite.io","static.cdninstagram.com","www.instagram.com"],
  },
  webpack: (config, { isServer }) => {
    //Add a rule to handle the canvas.node binary module
    config.module.rules.push({ test: /\.node$/, use: "raw-loader" });

    //exclude canvas from being processed by next.js in the browser
    if (!isServer) config.externals.push("canvas");
    return config;
  },
};

export default nextConfig;

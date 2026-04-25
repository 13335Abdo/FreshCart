import type { NextConfig } from "next";
//https://ecommerce.routemisr.com/api/v1/products
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"ecommerce.routemisr.com",
        pathname:"/**",
      }
    ]
  }
};

export default nextConfig;

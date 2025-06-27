import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'**'
      },
      {
        protocol: 'http',
        hostname: '**', // optionally allow all HTTP domains
      },
    ]
      
    
  },
  eslint:{
    ignoreDuringBuilds:true
  }
  /* config options here */
};

export default nextConfig;

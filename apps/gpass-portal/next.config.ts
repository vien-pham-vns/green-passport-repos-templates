import type { NextConfig } from 'next';

import { AppConfig } from 'app-config';
import path from 'node:path';

// https://nextjs.org/docs/app/guides/content-security-policy#without-nonces
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const BASE_PATH = AppConfig.BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  assetPrefix: BASE_PATH,
  basePath: BASE_PATH,
  cacheComponents: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'directus-asset.dt-dev.vnsilicon.cloud',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'directus-asset.dt-staging.vnsilicon.cloud',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'directus-asset.e-trace.bks.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'directus-asset-sandbox.e-trace.bks.com',
        pathname: '/**',
      },
    ],
    qualities: [50, 75, 100], // nextjs 16 by default set to 75 only
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
  output: 'standalone',
  turbopack: {
    resolveAlias: {
      '@': path.resolve('./src'),
      '@features': path.resolve('./src/features'),
    },
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  devIndicators: { position: 'bottom-right' },
  reactCompiler: {
    compilationMode: 'annotation',
  },
  // Next.js native logging - shows cache hits/misses automatically
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
export default nextConfig;

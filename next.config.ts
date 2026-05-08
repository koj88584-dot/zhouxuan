import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

function hasPostgresDatabaseURL() {
  try {
    const url = new URL(process.env.DATABASE_URL || '')
    return url.protocol === 'postgres:' || url.protocol === 'postgresql:'
  } catch {
    return false
  }
}

const hasPayloadDatabase =
  process.env.PAYLOAD_DATABASE_DISABLED !== '1' && hasPostgresDatabaseURL()

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  experimental: {
    isrFlushToDisk: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default hasPayloadDatabase ? withPayload(nextConfig) : nextConfig

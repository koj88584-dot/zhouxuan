import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const hasPayloadDatabase =
  process.env.PAYLOAD_DATABASE_DISABLED !== '1' && Boolean(process.env.DATABASE_URL)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  serverExternalPackages: ['@payloadcms/db-postgres'],
}

export default hasPayloadDatabase ? withPayload(nextConfig) : nextConfig

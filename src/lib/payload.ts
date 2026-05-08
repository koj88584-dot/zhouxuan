import { getPayload } from 'payload'

declare global {
  var __payloadClientPromise__: ReturnType<typeof getPayload> | undefined
}

const isPayloadDatabaseDisabled = () => process.env.PAYLOAD_DATABASE_DISABLED === '1'

function hasPostgresDatabaseURL() {
  try {
    const url = new URL(process.env.DATABASE_URL || '')
    return url.protocol === 'postgres:' || url.protocol === 'postgresql:'
  } catch {
    return false
  }
}

export async function getPayloadClient() {
  if (isPayloadDatabaseDisabled() || !hasPostgresDatabaseURL() || !process.env.PAYLOAD_SECRET) {
    return null
  }

  const { default: config } = await import('@/payload-config')

  globalThis.__payloadClientPromise__ ??= getPayload({
    config,
  })

  return globalThis.__payloadClientPromise__
}

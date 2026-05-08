import { getPayload } from 'payload'

declare global {
  var __payloadClientPromise__: ReturnType<typeof getPayload> | undefined
}

const isPayloadDatabaseDisabled = () => process.env.PAYLOAD_DATABASE_DISABLED === '1'

export async function getPayloadClient() {
  if (isPayloadDatabaseDisabled() || !process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) {
    return null
  }

  const { default: config } = await import('@/payload-config')

  globalThis.__payloadClientPromise__ ??= getPayload({
    config,
  })

  return globalThis.__payloadClientPromise__
}

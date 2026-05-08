import { getPayload } from 'payload'
import { isPayloadConfigured } from '@/lib/payload-status'

declare global {
  var __payloadClientPromise__: ReturnType<typeof getPayload> | undefined
}

export async function getPayloadClient() {
  if (!isPayloadConfigured()) {
    return null
  }

  try {
    const { default: config } = await import('@/payload-config')

    globalThis.__payloadClientPromise__ ??= getPayload({
      config,
    })

    return await globalThis.__payloadClientPromise__
  } catch (error) {
    globalThis.__payloadClientPromise__ = undefined
    console.error('Payload is unavailable; falling back to public seed content.', error)
    return null
  }
}

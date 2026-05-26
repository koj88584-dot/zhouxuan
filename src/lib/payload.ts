import { getPayload, type Payload } from 'payload'
import { isPayloadConfigured } from '@/lib/payload-status'

declare global {
  var __payloadClient__: Payload | null | undefined
}

export async function getPayloadClient() {
  if (!isPayloadConfigured()) {
    return null
  }

  // Return cached successful client
  if (globalThis.__payloadClient__) {
    return globalThis.__payloadClient__
  }

  // Already determined it's unavailable this process lifetime
  if (globalThis.__payloadClient__ === null) {
    return null
  }

  try {
    const { default: config } = await import('@/payload-config')
    const client = await getPayload({ config })
    globalThis.__payloadClient__ = client
    return client
  } catch (error) {
    globalThis.__payloadClient__ = null
    console.warn('Payload is unavailable; falling back to public seed content.', error)
    return null
  }
}

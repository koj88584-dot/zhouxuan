export function isPayloadConfigured() {
  if (process.env.PAYLOAD_DATABASE_DISABLED === '1' || !process.env.PAYLOAD_SECRET) {
    return false
  }

  try {
    const url = new URL(process.env.DATABASE_URL || '')
    return url.protocol === 'postgres:' || url.protocol === 'postgresql:'
  } catch {
    return false
  }
}

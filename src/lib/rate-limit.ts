const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

const store = new Map<string, { count: number; resetAt: number }>()
let cleanupTimer: ReturnType<typeof setInterval> | null = null

function ensureCleanup() {
  if (cleanupTimer) return
  cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key)
    }
    if (store.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer)
      cleanupTimer = null
    }
  }, 60_000)
  if (typeof cleanupTimer === 'object' && 'unref' in cleanupTimer) {
    cleanupTimer.unref()
  }
}

export function checkRateLimit(identifier: string, limit = MAX_REQUESTS): boolean {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS })
    ensureCleanup()
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}
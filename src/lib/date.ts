export const SPA_TIME_ZONE = 'America/Chicago'

export function getSpaTodayIso(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SPA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)

  const valueByType = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${valueByType.year}-${valueByType.month}-${valueByType.day}`
}

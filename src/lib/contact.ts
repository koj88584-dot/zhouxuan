export function getContactHref(line: string) {
  if (line.includes('@')) return `mailto:${line}`

  const phoneNumber = line.replace(/[^\d+]/g, '')
  if (phoneNumber.length >= 7) return `tel:${phoneNumber}`

  return undefined
}

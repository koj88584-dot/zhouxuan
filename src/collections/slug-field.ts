import type { FieldHook } from 'payload'

export const formatSlug = (fallback: string): FieldHook => ({ data, value }) => {
  if (typeof value === 'string' && value.trim()) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const source = (data?.[fallback] as string | undefined)?.trim()
  if (!source) return value

  return source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

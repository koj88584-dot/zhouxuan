import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function paragraphsFromContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((entry) => entry.trim())
    .filter(Boolean)
}

export function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

export function absoluteUrl(path: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return new URL(path, siteUrl).toString()
}

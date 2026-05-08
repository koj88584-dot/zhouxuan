import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/utils'

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: absoluteUrl(path),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function buildSpaJsonLd({
  name,
  description,
  telephone,
  email,
  addressLine1,
  addressLine2,
}: {
  name: string
  description: string
  telephone: string
  email: string
  addressLine1: string
  addressLine2: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Spa',
    name,
    description,
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: addressLine1,
      addressLocality: addressLine2.split(',')[0]?.trim() || addressLine2,
      addressRegion: 'WI',
      postalCode: '53719',
      addressCountry: 'US',
    },
    url: absoluteUrl('/'),
  }
}

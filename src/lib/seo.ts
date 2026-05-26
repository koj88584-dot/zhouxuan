import type { Metadata } from 'next'
import type { ContactInfo } from '@/lib/types'
import { storefrontImage } from '@/lib/site-media'
import { absoluteUrl } from '@/lib/utils'

const DEFAULT_OG_IMAGE = storefrontImage.src

export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  const ogImage = image || DEFAULT_OG_IMAGE
  const imageUrl = absoluteUrl(ogImage)

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: absoluteUrl(path),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export function buildSpaJsonLd({
  name,
  description,
  telephone,
  email,
  contact,
}: {
  name: string
  description: string
  telephone: string
  email: string
  contact: ContactInfo
}) {
  const addressParts = contact.addressLine2.split(',')
  const addressLocality = addressParts[0]?.trim() || contact.addressLine2
  const regionPostal = addressParts[1]?.trim() || ''
  const regionMatch = regionPostal.match(/^([A-Z]{2})\s*(\d{5})?$/)
  const addressRegion = regionMatch?.[1] || 'WI'
  const postalCode = regionMatch?.[2] || '53719'

  return {
    '@context': 'https://schema.org',
    '@type': 'Spa',
    name,
    description,
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.addressLine1,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: 'US',
    },
    url: absoluteUrl('/'),
    image: absoluteUrl(storefrontImage.src),
  }
}

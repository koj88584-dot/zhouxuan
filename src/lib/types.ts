export type CtaType = 'booking' | 'gift-card' | 'internal'

export type DisplayPriceMode = 'custom' | 'square' | 'hidden'

export type ServiceIcon =
  | 'lotus'
  | 'sparkles'
  | 'hand'
  | 'leaf'
  | 'moon'
  | 'waves'
  | 'gem'
  | 'flower'

export type ServiceSquareBinding = {
  squareAppointmentUrl: string
  squareCategoryId?: string
  squareItemId?: string
  giftCardUrl?: string
  active: boolean
}

export type HeroFeature = {
  title: string
  copy: string
}

export type StatTile = {
  label: string
  value: string
}

export type NavLink = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
}

export type ContactInfo = {
  addressLine1: string
  addressLine2: string
  phone: string
  email: string
  mapQuery: string
}

export type SiteSettings = {
  siteName: string
  siteTagline: string
  siteDescription: string
  bookingUrl: string
  giftCardUrl: string
  primaryNav: NavLink[]
  footerNav: NavLink[]
  contact: ContactInfo
  hours: Array<{ day: string; hours: string }>
  socials: SocialLink[]
  heroFeatures: HeroFeature[]
  stats: StatTile[]
}

export type PageDoc = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  bodyContent: string
  highlights?: string[]
  ctaLabel?: string
  ctaHref?: string
}

export type ServiceDoc = {
  slug: string
  title: string
  summary: string
  bodyContent: string
  duration: string
  benefits: string[]
  ritualSteps: string[]
  icon: ServiceIcon
  ctaLabel: string
  ctaType: CtaType
  displayPriceMode: DisplayPriceMode
  priceLabel?: string
  featured?: boolean
  binding: ServiceSquareBinding
}

export type TechnicianDoc = {
  slug: string
  name: string
  title: string
  bio: string
  serviceSlugs: string[]
  specialties: string[]
  languages: string[]
  availabilityNote: string
  active: boolean
  displayOrder: number
}

export type BookingInput = {
  serviceSlug: string
  technicianSlug: string
  preferredDate: string
  preferredTime: string
  durationPreference: string
  name: string
  phone: string
  email: string
  notes?: string
}

export type RedirectEntry = {
  from: string
  to: string
  permanent: boolean
}

export type InquiryInput = {
  name: string
  email: string
  phone?: string
  message: string
  serviceSlug?: string
}

export type SquareSyncEntry = {
  slug: string
  active: boolean
  live: boolean
  priceLabel?: string
  reason?: string
}

export type SquareSyncSummary = {
  syncedAt: string
  live: boolean
  services: SquareSyncEntry[]
}

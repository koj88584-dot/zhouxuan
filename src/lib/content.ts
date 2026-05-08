import {
  pagesSeed,
  redirectsSeed,
  servicesSeed,
  siteSettingsSeed,
  techniciansSeed,
} from '@/lib/default-content'
import {
  defaultLocale,
  localizePage,
  localizeService,
  localizeSiteSettings,
  localizeTechnician,
  type Locale,
} from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import type { PageDoc, RedirectEntry, ServiceDoc, SiteSettings, TechnicianDoc } from '@/lib/types'

const preferredServiceOrder = [
  'body-massage',
  'couples-massage',
  'foot-reflexology',
  'aromatherapy-massage',
  'chair-massage',
  'body-massage-and-foot-reflexology-combo',
  'foot-reflexology-and-tuina-combo',
  'cupping-therapy',
  'essential-oils-massage',
] as const

const serviceOrderMap = new Map<string, number>(preferredServiceOrder.map((slug, index) => [slug, index]))

function mergeBySlug<T extends { slug: string }>(seed: T[], docs: T[]) {
  const merged = new Map(seed.map((entry) => [entry.slug, entry]))

  for (const doc of docs) {
    if (doc.slug) merged.set(doc.slug, doc)
  }

  return Array.from(merged.values())
}

function mergeNavLinks(seed: SiteSettings['primaryNav'], docs: unknown) {
  const entries = Array.isArray(docs)
    ? docs
        .map((item) => ({
          label: String((item as Record<string, unknown>).label || ''),
          href: String((item as Record<string, unknown>).href || ''),
        }))
        .filter((item) => item.label && item.href)
    : []
  const merged = new Map(seed.map((item) => [item.href, item]))

  for (const item of entries) {
    merged.set(item.href, item)
  }

  return Array.from(merged.values())
}

function normalizeContactInfo(seed: SiteSettings['contact'], doc: unknown): SiteSettings['contact'] {
  const contact = (doc || {}) as Partial<Record<keyof SiteSettings['contact'], unknown>>

  return {
    addressLine1: String(contact.addressLine1 || seed.addressLine1),
    addressLine2: String(contact.addressLine2 || seed.addressLine2),
    phone: String(contact.phone || seed.phone),
    email: String(contact.email || seed.email || ''),
    mapQuery: String(contact.mapQuery || seed.mapQuery),
  }
}

function sortServices(services: ServiceDoc[]) {
  return [...services].sort((left, right) => {
    const leftOrder = serviceOrderMap.get(left.slug) ?? Number.MAX_SAFE_INTEGER
    const rightOrder = serviceOrderMap.get(right.slug) ?? Number.MAX_SAFE_INTEGER

    if (leftOrder !== rightOrder) return leftOrder - rightOrder
    return left.title.localeCompare(right.title)
  })
}

function normalizePage(doc: Record<string, unknown>): PageDoc {
  return {
    slug: String(doc.slug || ''),
    title: String(doc.title || ''),
    eyebrow: String(doc.eyebrow || ''),
    summary: String(doc.summary || ''),
    bodyContent: String(doc.bodyContent || ''),
    highlights: Array.isArray(doc.highlights)
      ? doc.highlights.map((entry) =>
          typeof entry === 'string' ? entry : String((entry as Record<string, unknown>).value || ''),
        )
      : undefined,
    ctaLabel: doc.ctaLabel ? String(doc.ctaLabel) : undefined,
    ctaHref: doc.ctaHref ? String(doc.ctaHref) : undefined,
  }
}

function normalizeService(doc: Record<string, unknown>): ServiceDoc {
  const binding = (doc.binding as Record<string, unknown> | undefined) || {}
  return {
    slug: String(doc.slug || ''),
    title: String(doc.title || ''),
    summary: String(doc.summary || ''),
    bodyContent: String(doc.bodyContent || ''),
    duration: String(doc.duration || ''),
    benefits: Array.isArray(doc.benefits)
      ? doc.benefits.map((entry) =>
          typeof entry === 'string' ? entry : String((entry as Record<string, unknown>).value || ''),
        )
      : [],
    ritualSteps: Array.isArray(doc.ritualSteps)
      ? doc.ritualSteps.map((entry) =>
          typeof entry === 'string' ? entry : String((entry as Record<string, unknown>).value || ''),
        )
      : [],
    icon: String(doc.icon || 'lotus') as ServiceDoc['icon'],
    ctaLabel: String(doc.ctaLabel || 'Book service'),
    ctaType: String(doc.ctaType || 'booking') as ServiceDoc['ctaType'],
    displayPriceMode: String(doc.displayPriceMode || 'hidden') as ServiceDoc['displayPriceMode'],
    priceLabel: doc.priceLabel ? String(doc.priceLabel) : undefined,
    featured: Boolean(doc.featured),
    binding: {
      squareAppointmentUrl: String(binding.squareAppointmentUrl || process.env.NEXT_PUBLIC_DEFAULT_BOOKING_URL || '/contact-us'),
      squareCategoryId: binding.squareCategoryId ? String(binding.squareCategoryId) : undefined,
      squareItemId: binding.squareItemId ? String(binding.squareItemId) : undefined,
      giftCardUrl: binding.giftCardUrl ? String(binding.giftCardUrl) : undefined,
      active: binding.active !== false,
    },
  }
}

function normalizeArrayField(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value
    .map((entry) => (typeof entry === 'string' ? entry : String((entry as Record<string, unknown>).value || '')))
    .filter(Boolean)
}

function normalizeTechnician(doc: Record<string, unknown>): TechnicianDoc {
  return {
    slug: String(doc.slug || ''),
    name: String(doc.name || ''),
    title: String(doc.title || ''),
    bio: String(doc.bio || ''),
    serviceSlugs: normalizeArrayField(doc.serviceSlugs),
    specialties: normalizeArrayField(doc.specialties),
    languages: normalizeArrayField(doc.languages),
    availabilityNote: String(doc.availabilityNote || 'Availability confirmed after request.'),
    active: doc.active !== false,
    displayOrder: Number(doc.displayOrder || 100),
  }
}

export async function getSiteSettings(locale: Locale = defaultLocale): Promise<SiteSettings> {
  const payload = await getPayloadClient()

  if (!payload) return localizeSiteSettings(siteSettingsSeed, locale)

  try {
    const globalDoc = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })

    return localizeSiteSettings({
      ...siteSettingsSeed,
      ...globalDoc,
      bookingUrl: '/booking',
      contact: normalizeContactInfo(siteSettingsSeed.contact, globalDoc.contact),
      hours: Array.isArray(globalDoc.hours) && globalDoc.hours.length ? globalDoc.hours : siteSettingsSeed.hours,
      socials:
        Array.isArray(globalDoc.socials) && globalDoc.socials.length ? globalDoc.socials : siteSettingsSeed.socials,
      primaryNav:
        Array.isArray(globalDoc.primaryNav) && globalDoc.primaryNav.length
          ? mergeNavLinks(siteSettingsSeed.primaryNav, globalDoc.primaryNav)
          : siteSettingsSeed.primaryNav,
      footerNav:
        Array.isArray(globalDoc.footerNav) && globalDoc.footerNav.length
          ? mergeNavLinks(siteSettingsSeed.footerNav, globalDoc.footerNav)
          : siteSettingsSeed.footerNav,
      heroFeatures:
        Array.isArray(globalDoc.heroFeatures) && globalDoc.heroFeatures.length
          ? globalDoc.heroFeatures
          : siteSettingsSeed.heroFeatures,
      stats: Array.isArray(globalDoc.stats) && globalDoc.stats.length ? globalDoc.stats : siteSettingsSeed.stats,
    }, locale)
  } catch {
    return localizeSiteSettings(siteSettingsSeed, locale)
  }
}

export async function getPages(locale: Locale = defaultLocale): Promise<PageDoc[]> {
  const payload = await getPayloadClient()

  if (!payload) return pagesSeed.map((page) => localizePage(page, locale))

  try {
    const result = await payload.find({
      collection: 'pages',
      depth: 1,
      limit: 100,
      pagination: false,
    })

    return mergeBySlug(
      pagesSeed,
      result.docs.map((doc) => normalizePage(doc as unknown as Record<string, unknown>)),
    ).map((page) => localizePage(page, locale))
  } catch {
    return pagesSeed.map((page) => localizePage(page, locale))
  }
}

export async function getPageBySlug(slug: string, locale: Locale = defaultLocale) {
  const pages = await getPages(locale)
  return pages.find((page) => page.slug === slug)
}

export async function getServices(locale: Locale = defaultLocale): Promise<ServiceDoc[]> {
  const payload = await getPayloadClient()

  if (!payload) return sortServices(servicesSeed).map((service) => localizeService(service, locale))

  try {
    const result = await payload.find({
      collection: 'services',
      depth: 1,
      limit: 100,
      pagination: false,
      sort: 'title',
    })

    return sortServices(
      mergeBySlug(
        servicesSeed,
        result.docs.map((doc) => normalizeService(doc as unknown as Record<string, unknown>)),
      ),
    ).map((service) => localizeService(service, locale))
  } catch {
    return sortServices(servicesSeed).map((service) => localizeService(service, locale))
  }
}

export async function getServiceBySlug(slug: string, locale: Locale = defaultLocale) {
  const services = await getServices(locale)
  return services.find((service) => service.slug === slug)
}

export async function getTechnicians(locale: Locale = defaultLocale): Promise<TechnicianDoc[]> {
  const payload = await getPayloadClient()

  if (!payload) return techniciansSeed.map((technician) => localizeTechnician(technician, locale))

  try {
    const result = await payload.find({
      collection: 'technicians',
      depth: 1,
      limit: 100,
      pagination: false,
      sort: 'displayOrder',
      where: {
        active: {
          equals: true,
        },
      },
    })

    return mergeBySlug(
      techniciansSeed,
      result.docs.map((doc) => normalizeTechnician(doc as unknown as Record<string, unknown>)),
    )
      .map((technician) => localizeTechnician(technician, locale))
      .sort((left, right) => left.displayOrder - right.displayOrder)
  } catch {
    return techniciansSeed.map((technician) => localizeTechnician(technician, locale))
  }
}

export async function getRedirects(): Promise<RedirectEntry[]> {
  const payload = await getPayloadClient()

  if (!payload) return redirectsSeed

  try {
    const result = await payload.find({
      collection: 'redirects',
      limit: 100,
      pagination: false,
    })

    return result.docs.map((doc) => ({
      from: String((doc as unknown as Record<string, unknown>).from || ''),
      to: String((doc as unknown as Record<string, unknown>).to || '/'),
      permanent: (doc as unknown as Record<string, unknown>).permanent !== false,
    }))
  } catch {
    return redirectsSeed
  }
}

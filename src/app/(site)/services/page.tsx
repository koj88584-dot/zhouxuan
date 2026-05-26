import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { ServiceCard } from '@/components/service-card'
import { getPageBySlug, getServices } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  const locale = await getCurrentLocale()
  const page = await getPageBySlug('services', locale)
  if (!page) return {}

  return buildMetadata({
    title: `${page.title} | ${page.eyebrow}`,
    description: page.summary,
    path: '/services',
  })
}

export default async function ServicesPage() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const [page, services] = await Promise.all([getPageBySlug('services', locale), getServices(locale)])
  if (!page) notFound()

  const mostBooked = copy.services.mostBookedItems

  return (
    <div className="space-y-8 pb-10">
      <PageHero eyebrow={page.eyebrow} title={page.title} summary={page.summary} />

      <section className="rounded-[1.6rem] border border-white/85 bg-white/82 p-5 shadow-[0_14px_36px_rgba(23,35,29,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-600">{copy.services.mostBooked}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {mostBooked.map((item) => (
            <span key={item} className="rounded-full bg-olive-900 px-4 py-2 text-xs font-semibold text-ivory">
              {item}
            </span>
          ))}
        </div>
      </section>

      {services.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.8rem] border border-white/85 bg-white/88 p-8 text-center shadow-[0_18px_48px_rgba(23,35,29,0.08)]">
          <p className="text-olive-700">{copy.services.emptyFallback}</p>
        </div>
      )}
    </div>
  )
}
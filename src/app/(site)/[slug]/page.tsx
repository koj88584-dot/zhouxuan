import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { getServiceBySlug } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { serviceImageBySlug } from '@/lib/site-media'
import { buildMetadata } from '@/lib/seo'
import { paragraphsFromContent } from '@/lib/utils'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const service = await getServiceBySlug(slug, locale)
  if (!service) return {}

  return buildMetadata({
    title: `${service.title} | ${copy.serviceDetail.eyebrow}`,
    description: service.summary,
    path: `/${service.slug}`,
  })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const service = await getServiceBySlug(slug, locale)

  if (!service) notFound()

  const imageSrc = serviceImageBySlug[service.slug]
  const paragraphs = paragraphsFromContent(service.bodyContent).slice(0, 2)

  return (
    <div className="space-y-8 pb-10">
      <PageHero
        eyebrow={copy.serviceDetail.eyebrow}
        title={service.title}
        summary={service.summary}
        actions={
          <>
            <Link
              href={`/booking?service=${encodeURIComponent(service.slug)}`}
              className="rounded-full bg-olive-800 px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-900"
            >
              {service.ctaLabel}
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-olive-300 bg-white/70 px-5 py-3 text-sm font-semibold text-olive-900 transition hover:border-olive-800"
            >
              {copy.serviceDetail.backToMenu}
            </Link>
          </>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <article className="rounded-[1.9rem] border border-white/85 bg-white/84 p-6 shadow-[0_18px_48px_rgba(23,35,29,0.08)] md:p-8">
            <div className="space-y-5 text-sm leading-8 text-olive-800 md:text-base">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <article className="rounded-[1.8rem] border border-white/85 bg-white/84 p-6 shadow-[0_18px_48px_rgba(23,35,29,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-olive-600">{copy.serviceDetail.benefits}</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-olive-800">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-olive-700" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="grid gap-5">
          {imageSrc ? (
            <article className="overflow-hidden rounded-[1.8rem] border border-white/85 bg-white/88 shadow-[0_18px_48px_rgba(23,35,29,0.08)]">
              <div className="relative aspect-[4/3]">
                <Image src={imageSrc} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
              </div>
            </article>
          ) : null}

          <article className="rounded-[1.8rem] bg-[linear-gradient(165deg,#274b3a_0%,#1c3529_100%)] p-6 text-ivory shadow-[0_18px_48px_rgba(18,27,22,0.22)]">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">{copy.serviceDetail.rhythm}</p>
            <p className="mt-4 text-3xl">{service.duration}</p>
            <div className="mt-6 space-y-3 text-sm text-stone-300">
              {service.ritualSteps.map((step) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  {step}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

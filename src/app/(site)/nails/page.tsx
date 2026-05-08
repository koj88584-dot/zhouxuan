import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { getPageBySlug, getSiteSettings } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { nailsImage } from '@/lib/site-media'
import { buildMetadata } from '@/lib/seo'
import { paragraphsFromContent } from '@/lib/utils'

export const revalidate = 60

export async function generateMetadata() {
  const locale = await getCurrentLocale()
  const page = await getPageBySlug('nails', locale)
  if (!page) return {}

  return buildMetadata({
    title: `${page.title} | ${page.eyebrow}`,
    description: page.summary,
    path: '/nails',
  })
}

export default async function NailsPage() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const [page, settings] = await Promise.all([getPageBySlug('nails', locale), getSiteSettings(locale)])
  if (!page) notFound()

  const treatments = copy.nails.treatments

  return (
    <div className="space-y-8 pb-10">
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        summary={page.summary}
        actions={
          <Link href={settings.bookingUrl} className="rounded-full bg-olive-800 px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-900">
            {copy.nails.book}
          </Link>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
          {treatments.map((treatment) => (
            <article key={treatment.name} className="rounded-[1.7rem] border border-white/85 bg-white/88 p-6 shadow-[0_16px_44px_rgba(23,35,29,0.08)]">
              <p className="text-2xl text-olive-950">{treatment.name}</p>
              <p className="mt-4 text-sm leading-7 text-olive-700">{treatment.copy}</p>
            </article>
          ))}
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-white/85 bg-white/88 shadow-[0_18px_44px_rgba(23,35,29,0.08)]">
          <div className="relative aspect-[4/4.5]">
            <Image src={nailsImage.src} alt={copy.nails.imageAlt || nailsImage.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </div>
        </article>
      </section>

      <section className="rounded-[2rem] border border-white/85 bg-white/84 p-6 text-sm leading-8 text-olive-800 shadow-[0_18px_48px_rgba(23,35,29,0.08)] md:p-8 md:text-base">
        {paragraphsFromContent(page.bodyContent).map((paragraph, index) => (
          <p key={paragraph} className={index > 0 ? 'mt-5' : undefined}>
            {paragraph}
          </p>
        ))}
      </section>
    </div>
  )
}

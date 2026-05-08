import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { getPageBySlug } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { buildMetadata } from '@/lib/seo'
import { paragraphsFromContent } from '@/lib/utils'

export const revalidate = 60

export async function generateMetadata() {
  const locale = await getCurrentLocale()
  const page = await getPageBySlug('aboutus', locale)
  if (!page) return {}

  return buildMetadata({
    title: `${page.title} | ${page.eyebrow}`,
    description: page.summary,
    path: '/aboutus',
  })
}

export default async function AboutPage() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const page = await getPageBySlug('aboutus', locale)
  if (!page) notFound()

  return (
    <div className="space-y-8 pb-10">
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        summary={page.summary}
        actions={
          <Link href="/services" className="rounded-full bg-olive-800 px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-900">
            {copy.about.viewServiceMenu}
          </Link>
        }
      />

      <section className="grid gap-8 rounded-[2rem] border border-white/85 bg-white/84 p-6 shadow-[0_18px_48px_rgba(23,35,29,0.07)] md:grid-cols-[1.2fr_0.8fr] md:p-8">
        <div className="space-y-5 text-sm leading-8 text-olive-800 md:text-base">
          {paragraphsFromContent(page.bodyContent).slice(0, 2).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="rounded-[1.7rem] bg-[linear-gradient(180deg,#274b3a_0%,#1c3529_100%)] p-6 text-ivory shadow-[0_24px_50px_rgba(18,27,22,0.18)]">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">{copy.about.atmosphereCues}</p>
          <div className="mt-5 space-y-4">
            {page.highlights?.map((item) => (
              <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

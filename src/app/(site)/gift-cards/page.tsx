import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { getPageBySlug, getSiteSettings } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { homeGallery } from '@/lib/site-media'
import { buildMetadata } from '@/lib/seo'
import { paragraphsFromContent } from '@/lib/utils'

export const revalidate = 60

export async function generateMetadata() {
  const locale = await getCurrentLocale()
  const page = await getPageBySlug('gift-cards', locale)
  if (!page) return {}

  return buildMetadata({
    title: `${page.title} | ${page.eyebrow}`,
    description: page.summary,
    path: '/gift-cards',
  })
}

export default async function GiftCardsPage() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const [page, settings] = await Promise.all([getPageBySlug('gift-cards', locale), getSiteSettings(locale)])
  const paragraphs = paragraphsFromContent(page?.bodyContent || '').slice(0, 1)

  return (
    <div className="space-y-8 pb-10">
      <PageHero
        eyebrow={page?.eyebrow || 'Gift Cards'}
        title={page?.title || 'Gift cards'}
        summary={page?.summary || ''}
        actions={
          <>
            <Link
              href={settings.giftCardUrl}
              className="rounded-full bg-olive-800 px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-900"
            >
              {copy.giftCards.purchase}
            </Link>
            <Link
              href="/contact-us"
              className="rounded-full border border-olive-300 bg-white/70 px-5 py-3 text-sm font-semibold text-olive-900 transition hover:border-olive-800"
            >
              {copy.giftCards.ask}
            </Link>
          </>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[2rem] border border-white/85 bg-white/88 p-6 shadow-[0_18px_44px_rgba(23,35,29,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-600">{copy.giftCards.why}</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-olive-700 md:text-base">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-sm text-olive-800">
            {copy.giftCards.points.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-[2rem] border border-white/85 bg-white/88 shadow-[0_18px_44px_rgba(23,35,29,0.08)]">
          <div className="relative aspect-[5/4]">
            <Image
              src={homeGallery[0].src}
              alt={copy.giftCards.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </article>
      </section>
    </div>
  )
}

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ContactForm } from '@/components/contact-form'
import { PageHero } from '@/components/page-hero'
import { getContactHref } from '@/lib/contact'
import { getPageBySlug, getServices, getSiteSettings } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { homeGallery, storefrontImage } from '@/lib/site-media'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  const locale = await getCurrentLocale()
  const page = await getPageBySlug('contact-us', locale)
  if (!page) return {}

  return buildMetadata({
    title: `${page.title} | ${page.eyebrow}`,
    description: page.summary,
    path: '/contact-us',
    image: storefrontImage.src,
  })
}

export default async function ContactPage() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const [page, settings, services] = await Promise.all([
    getPageBySlug('contact-us', locale),
    getSiteSettings(locale),
    getServices(locale),
  ])
  if (!page) notFound()

  const contactLines = [settings.contact.addressLine1, settings.contact.addressLine2, settings.contact.phone, settings.contact.email].filter(Boolean)

  return (
    <div className="space-y-8 pb-10">
      <PageHero eyebrow={page.eyebrow} title={page.title} summary={page.summary} />

      <section className="grid gap-5 lg:grid-cols-[0.8fr_0.8fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-[1.8rem] border border-white/85 bg-white/88 p-6 shadow-[0_16px_44px_rgba(23,35,29,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-600">{copy.contact.visitStudio}</p>
            <h2 className="mt-4 text-3xl text-olive-950">{copy.contact.locationHours}</h2>
            <div className="mt-5 space-y-2 text-sm leading-7 text-olive-800">
              {contactLines.map((line) => {
                const href = getContactHref(line)

                return (
                  <p key={line}>
                    {href ? (
                      <a href={href} className="font-semibold transition hover:text-olive-950">
                        {line}
                      </a>
                    ) : (
                      line
                    )}
                  </p>
                )
              })}
              {!contactLines.length ? <p>{copy.contact.fallback}</p> : null}
            </div>
            <div className="mt-6 space-y-2 text-sm text-olive-700">
              {settings.hours.map((item) => (
                <div key={item.day} className="flex justify-between gap-4 border-b border-olive-100 pb-2">
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-olive-200/80 bg-white shadow-[0_16px_44px_rgba(23,35,29,0.08)]">
            <iframe
              title={copy.contact.mapTitle}
              className="h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(settings.contact.mapQuery)}&output=embed`}
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.8rem] bg-[linear-gradient(165deg,#274b3a_0%,#1c3529_100%)] p-6 text-white shadow-[0_22px_56px_rgba(18,27,22,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-300">{copy.contact.panelEyebrow}</p>
            <h2 className="mt-4 text-4xl">{copy.contact.panelTitle}</h2>
            <p className="mt-5 text-sm leading-7 text-stone-300">{copy.contact.panelSummary}</p>
            <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-stone-200">
              <p>{copy.contact.bestFor}</p>
              {copy.contact.bestForItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/85 bg-white shadow-[0_16px_44px_rgba(23,35,29,0.08)]">
            <div className="relative aspect-[4/5]">
              <Image
                src={homeGallery[2].src}
                alt={homeGallery[2].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.8rem] border border-white/85 bg-white/88 p-6 shadow-[0_16px_44px_rgba(23,35,29,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-600">{copy.contact.sendMessage}</p>
            <h2 className="mt-4 text-3xl text-olive-950">{copy.contact.formTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-olive-700">{copy.contact.formSummary}</p>
          </div>
          <ContactForm services={services} locale={locale} />
        </div>
      </section>
    </div>
  )
}

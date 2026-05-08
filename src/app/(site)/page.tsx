import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarCheck, Gift, MapPin, Sparkles } from 'lucide-react'
import { ServiceCard } from '@/components/service-card'
import { getPageBySlug, getServices, getSiteSettings } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { homeGallery } from '@/lib/site-media'
import { paragraphsFromContent } from '@/lib/utils'

export const revalidate = 60

export default async function HomePage() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const [settings, services, aboutPage] = await Promise.all([
    getSiteSettings(locale),
    getServices(locale),
    getPageBySlug('aboutus', locale),
  ])

  const menuServices = services
  const aboutParagraphs = aboutPage ? paragraphsFromContent(aboutPage.bodyContent).slice(0, 1) : []
  const heroPills = copy.home.heroPills

  return (
    <div className="space-y-10 pb-10">
      <section className="relative flex overflow-hidden rounded-[2.4rem] border border-white/80 bg-olive-900 text-ivory shadow-[0_28px_88px_rgba(18,27,22,0.24)]">
        <Image
          src="/images/oasis/gallery-1.jpg"
          alt="Oasis Spa reception and treatment lounge"
          fill
          priority
          sizes="(max-width: 1180px) 100vw, 1180px"
          className="object-cover object-[56%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,26,20,0.78)_0%,rgba(13,26,20,0.56)_38%,rgba(13,26,20,0.18)_72%,rgba(13,26,20,0.02)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,26,20,0.08)_0%,rgba(13,26,20,0.18)_58%,rgba(13,26,20,0.68)_100%)]" />

        <div className="relative flex min-h-[560px] w-full flex-col justify-between gap-8 p-6 md:min-h-[610px] md:p-10 lg:p-12">
          <div className="max-w-3xl pt-2 md:pt-8">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-stone-200">
              <Sparkles className="size-4" aria-hidden="true" />
              {copy.home.eyebrow}
            </p>
            <h1 className="mt-5 max-w-2xl text-5xl leading-[0.92] text-white md:text-6xl lg:text-7xl">
              {copy.home.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-100 md:text-lg">
              {copy.home.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={settings.bookingUrl}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-semibold text-olive-900 shadow-[0_16px_34px_rgba(0,0,0,0.2)] transition hover:bg-white"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                {copy.common.bookAppointment}
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/55 bg-white/12 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {copy.home.viewServices}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {heroPills.map((label) => (
                <span key={label} className="rounded-full border border-white/24 bg-white/12 px-4 py-2 text-xs font-semibold text-stone-100 backdrop-blur">
                  {label}
                </span>
              ))}
            </div>

            <Link
              href="/contact-us"
              className="mt-6 inline-flex max-w-[18rem] items-center gap-3 rounded-full border border-white/24 bg-white/12 px-4 py-3 text-sm font-semibold text-white backdrop-blur md:hidden"
            >
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {settings.contact.addressLine1}
            </Link>
          </div>

          <div className="hidden gap-3 rounded-[1.4rem] border border-white/18 bg-[#10261d]/70 p-4 shadow-[0_20px_46px_rgba(0,0,0,0.2)] backdrop-blur-md md:grid md:grid-cols-3 md:p-5">
            <Link href="/contact-us" className="group flex min-h-16 items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/8">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/14 text-white">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.22em] text-stone-300">{copy.home.visitLabel}</span>
                <span className="mt-1 block text-sm font-semibold text-white">
                  {settings.contact.addressLine1}, {settings.contact.addressLine2}
                </span>
              </span>
            </Link>
            <Link href="/gift-cards" className="group flex min-h-16 items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/8">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/14 text-white">
                <Gift className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.22em] text-stone-300">{copy.home.giftLabel}</span>
                <span className="mt-1 block text-sm font-semibold text-white">{copy.home.giftCopy}</span>
              </span>
            </Link>
            <Link href="/services" className="group flex min-h-16 items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/8">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/14 text-white">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.22em] text-stone-300">{copy.home.menuLabel}</span>
                <span className="mt-1 block text-sm font-semibold text-white">{copy.home.menuCopy}</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {settings.heroFeatures.map((feature) => (
          <article
            key={feature.title}
            className="rounded-[1.4rem] border border-white/85 bg-white/82 p-5 shadow-[0_14px_32px_rgba(23,35,29,0.055)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-600">{feature.title}</p>
            <p className="mt-3 text-sm leading-6 text-olive-700">{feature.copy}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 rounded-[2.2rem] border border-white/85 bg-white/82 p-6 shadow-[0_20px_54px_rgba(23,35,29,0.07)] md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-600">{copy.home.aboutEyebrow}</p>
          <h2 className="mt-4 text-4xl text-olive-950 md:text-5xl">{copy.home.aboutTitle}</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-olive-700 md:text-base">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link href="/aboutus" className="mt-6 inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-olive-800 transition hover:bg-olive-50 hover:text-olive-600">
            {copy.home.learnMore}
          </Link>
        </div>

        <div className="grid gap-4 self-end">
          {settings.stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.5rem] bg-olive-50/85 p-5 text-olive-900 shadow-[inset_0_0_0_1px_rgba(39,75,58,0.08)]">
              <p className="text-xs uppercase tracking-[0.32em] text-olive-600">{stat.label}</p>
              <p className="mt-3 text-4xl">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-600">{copy.home.servicesEyebrow}</p>
            <h2 className="mt-3 text-4xl text-olive-950 md:text-5xl">{copy.home.servicesTitle}</h2>
          </div>
          <Link href="/services" className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-olive-800 transition hover:bg-olive-50 hover:text-olive-600">
            {copy.home.viewFullMenu}
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {menuServices.map((service) => (
            <ServiceCard key={service.slug} service={service} locale={locale} />
          ))}
          <article className="group flex h-full flex-col justify-between rounded-[1.9rem] border border-white/85 bg-white/90 p-4 shadow-[0_18px_44px_rgba(23,35,29,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(23,35,29,0.12)]">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-olive-100">
                <Image
                  src="/images/oasis/nails.jpg"
                  alt="Nail care at Oasis Spa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(21,33,25,0.05)_52%,rgba(21,33,25,0.46)_100%)]" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">{copy.home.companionCare}</p>
                  <p className="mt-2 text-2xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">{copy.home.nails}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-olive-700">{copy.home.nailsSummary}</p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3 px-1">
              <Link href="/nails" className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-olive-800 transition hover:bg-olive-50 hover:text-olive-600">
                {copy.home.details}
              </Link>
              <Link
                href={settings.bookingUrl}
                className="inline-flex min-h-11 items-center rounded-full border border-olive-300 px-4 py-2 text-sm font-semibold text-olive-900 transition hover:border-olive-900 hover:bg-olive-900 hover:text-ivory"
              >
                {copy.common.bookNow}
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-5 md:grid-cols-3">
          {homeGallery.map((item, index) => (
            <article key={item.src} className="group overflow-hidden rounded-[1.9rem] border border-white/85 bg-white/88 shadow-[0_18px_44px_rgba(23,35,29,0.08)]">
              <div className="relative aspect-[4/4.5] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-600">{copy.home.atmosphere}</p>
                <h3 className="mt-3 text-2xl text-olive-950">{copy.home.galleryTitles[index] || item.title}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/85 bg-white/88 px-6 py-8 shadow-[0_20px_54px_rgba(23,35,29,0.07)] md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-600">{copy.home.giftCards}</p>
          <h2 className="mt-4 text-4xl text-olive-950">{copy.home.giftTitle}</h2>
          <p className="mt-5 text-sm leading-7 text-olive-700 md:text-base">{copy.home.giftSummary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/gift-cards"
              className="rounded-full bg-olive-800 px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-900"
            >
              {copy.home.giftCards}
            </Link>
            <Link
              href="/contact-us"
              className="rounded-full border border-olive-300 bg-white/75 px-5 py-3 text-sm font-semibold text-olive-900 transition hover:border-olive-800"
            >
              {copy.home.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { getUiCopy, type Locale, defaultLocale } from '@/lib/i18n'
import type { ServiceDoc } from '@/lib/types'
import { ServiceIcon } from '@/components/service-icon'
import { serviceImageBySlug } from '@/lib/site-media'

export function ServiceCard({ service, locale = defaultLocale }: { service: ServiceDoc; locale?: Locale }) {
  const copy = getUiCopy(locale)
  const priceText =
    service.displayPriceMode === 'custom'
      ? service.priceLabel
      : service.displayPriceMode === 'square'
        ? service.priceLabel || copy.serviceCard.squarePricing
        : undefined

  const imageSrc = serviceImageBySlug[service.slug]
  const bookingHref =
    service.ctaType === 'booking'
      ? `/booking?service=${encodeURIComponent(service.slug)}`
      : service.binding.giftCardUrl || '/gift-cards'

  return (
    <article className="group flex h-full flex-col justify-between rounded-[1.9rem] border border-white/85 bg-white/90 p-4 shadow-[0_18px_44px_rgba(23,35,29,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(23,35,29,0.12)]">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-olive-100 bg-[linear-gradient(160deg,#edf1eb_0%,#faf8f3_55%,#e6ddd0_100%)]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={service.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(21,33,25,0.05)_52%,rgba(21,33,25,0.5)_100%)]" />
          <div className="absolute left-5 top-5 inline-flex rounded-full border border-white/75 bg-white/78 p-3 text-olive-800 shadow-[0_10px_24px_rgba(20,31,24,0.08)]">
            <ServiceIcon name={service.icon} />
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">{copy.serviceCard.signature}</p>
              <p className="mt-2 text-2xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">{service.title}</p>
            </div>
            <span className="rounded-full bg-white/84 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-olive-700">
              {service.duration}
            </span>
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-olive-700">{service.summary}</p>
        {priceText ? <p className="mt-4 text-sm font-semibold text-olive-900">{priceText}</p> : null}
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 px-1">
        <Link href={`/${service.slug}`} className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-olive-800 transition hover:bg-olive-50 hover:text-olive-600">
          {copy.serviceCard.details}
        </Link>
        <Link
          href={bookingHref}
          className="inline-flex min-h-11 items-center rounded-full border border-olive-300 px-4 py-2 text-sm font-semibold text-olive-900 transition hover:border-olive-900 hover:bg-olive-900 hover:text-ivory"
        >
          {service.ctaLabel || copy.common.bookNow}
        </Link>
      </div>
    </article>
  )
}

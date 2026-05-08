import { Suspense } from 'react'
import { BookingForm } from '@/components/booking-form'
import { PageHero } from '@/components/page-hero'
import { getServices, getTechnicians } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)

  return buildMetadata({
    title: `${copy.bookingPage.eyebrow} | Oasis Spa`,
    description: copy.bookingPage.summary,
    path: '/booking',
  })
}

export default async function BookingPage() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const [services, technicians] = await Promise.all([getServices(locale), getTechnicians(locale)])

  return (
    <div className="space-y-8 pb-10">
      <PageHero
        eyebrow={copy.bookingPage.eyebrow}
        title={copy.bookingPage.title}
        summary={copy.bookingPage.summary}
      />

      <Suspense fallback={<div className="rounded-[1.8rem] bg-white/88 p-6 text-olive-800">{copy.bookingPage.loading}</div>}>
        <BookingForm services={services} technicians={technicians} locale={locale} />
      </Suspense>
    </div>
  )
}

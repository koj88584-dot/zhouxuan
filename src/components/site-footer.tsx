import Link from 'next/link'
import { getContactHref } from '@/lib/contact'
import { getUiCopy, type Locale } from '@/lib/i18n'
import type { SiteSettings } from '@/lib/types'

export function SiteFooter({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const copy = getUiCopy(locale)
  const contactLines = [settings.contact.addressLine1, settings.contact.addressLine2, settings.contact.phone, settings.contact.email].filter(Boolean)

  return (
    <footer className="mt-16 px-4 pb-10 md:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-10 rounded-[2rem] bg-olive-900 px-6 py-10 text-stone-300 shadow-[0_28px_80px_rgba(18,27,22,0.2)] md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <p className="text-3xl text-ivory md:text-4xl">{settings.siteName}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-300">{settings.siteDescription}</p>
          <Link
            href={settings.bookingUrl}
            className="mt-6 inline-flex rounded-full bg-ivory px-5 py-3 text-sm font-semibold text-olive-900 transition hover:bg-white"
          >
            {copy.common.bookAppointment}
          </Link>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">{copy.footer.visit}</p>
          <div className="mt-4 space-y-2 text-sm">
            {contactLines.map((line) => {
              const href = getContactHref(line)

              return (
                <p key={line}>
                  {href ? (
                    <a href={href} className="transition hover:text-ivory">
                      {line}
                    </a>
                  ) : (
                    line
                  )}
                </p>
              )
            })}
            {!contactLines.length ? <p>{copy.footer.contactFallback}</p> : null}
          </div>
          <div className="mt-6 space-y-2 text-sm text-stone-400">
            {settings.hours.slice(0, 3).map((item) => (
              <p key={item.day}>
                {item.day}: {item.hours}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">{copy.footer.navigate}</p>
          <div className="mt-4 grid gap-2 text-sm">
            {settings.footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition hover:text-ivory">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

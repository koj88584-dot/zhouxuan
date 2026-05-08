'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { getUiCopy, type Locale } from '@/lib/i18n'
import type { SiteSettings } from '@/lib/types'
import { cn } from '@/lib/utils'

export function SiteHeader({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const copy = getUiCopy(locale)

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-[1.8rem] border border-white/75 bg-[rgba(252,250,247,0.86)] px-5 py-4 shadow-[0_18px_40px_rgba(21,33,25,0.09)] backdrop-blur-xl">
        <Link href="/" className="flex min-h-11 min-w-0 flex-col justify-center">
          <p className="text-[1.7rem] leading-none text-olive-900 md:text-[2rem]">{settings.siteName}</p>
          <p className="mt-1 hidden text-[10px] uppercase tracking-[0.3em] text-olive-600 md:block">
            {settings.siteTagline}
          </p>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {settings.primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center px-1 text-sm font-medium tracking-[0.03em] text-olive-800 transition hover:text-olive-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <Link
            href={settings.bookingUrl}
            className="hidden min-h-11 items-center rounded-full bg-olive-800 px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-900 md:inline-flex"
          >
            {copy.common.bookAppointment}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-olive-200 bg-white/70 p-2 text-olive-900 md:hidden"
            aria-label={isOpen ? copy.header.closeNavigation : copy.header.openNavigation}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          className={cn(
            'mx-auto mt-3 max-w-[1180px] overflow-hidden rounded-[1.6rem] border border-white/80 bg-ivory px-5 py-4 text-olive-900 shadow-[0_18px_48px_rgba(18,33,26,0.12)] md:hidden',
          )}
        >
          <div className="grid gap-3">
            {settings.primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center border-b border-olive-100 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={settings.bookingUrl}
              className="mt-1 inline-flex min-h-11 items-center justify-center rounded-full bg-olive-900 px-4 py-3 text-center text-sm font-semibold text-ivory"
              onClick={() => setIsOpen(false)}
            >
              {copy.common.bookAppointment}
            </Link>
            <LanguageSwitcher locale={locale} onSelect={() => setIsOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  )
}

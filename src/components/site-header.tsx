'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { getUiCopy, type Locale } from '@/lib/i18n'
import { brandLogo } from '@/lib/site-media'
import type { SiteSettings } from '@/lib/types'
import { cn } from '@/lib/utils'

export function SiteHeader({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const copy = getUiCopy(locale)

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-[1.8rem] border border-white/80 bg-[rgba(252,249,246,0.92)] px-5 py-4 shadow-[0_18px_40px_rgba(21,33,25,0.08)] backdrop-blur-xl">
        <Link href="/" className="flex min-h-11 min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-rose-100 bg-white shadow-[0_10px_24px_rgba(164,34,60,0.08)]">
            <Image src={brandLogo.src} alt={brandLogo.alt} fill sizes="48px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[1.45rem] leading-none text-rose-700 md:text-[1.8rem]">{settings.siteName}</p>
            <p className="mt-1 hidden text-[10px] uppercase tracking-[0.34em] text-olive-600 md:block">
              {settings.siteTagline}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {settings.primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center px-1 text-sm font-medium tracking-[0.03em] text-olive-800 transition hover:text-rose-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <a
            href={`tel:${settings.contact.phone.replace(/[^0-9+]/g, '')}`}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 md:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {settings.contact.phone}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-olive-200 bg-white/70 p-2 text-olive-900 md:hidden"
            aria-label={isOpen ? copy.header.closeNavigation : copy.header.openNavigation}
            aria-expanded={isOpen}
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
            <a
              href={`tel:${settings.contact.phone.replace(/[^0-9+]/g, '')}`}
              className="mt-1 inline-flex min-h-11 items-center justify-center rounded-full bg-rose-600 px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              {settings.contact.phone}
            </a>
            <LanguageSwitcher locale={locale} onSelect={() => setIsOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  )
}

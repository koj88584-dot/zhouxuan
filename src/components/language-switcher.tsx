'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { getUiCopy, localeLabels, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ locale, onSelect }: { locale: Locale; onSelect?: () => void }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const copy = getUiCopy(locale)

  async function selectLocale(nextLocale: Locale) {
    if (isPending || nextLocale === locale) return

    await fetch('/api/locale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locale: nextLocale }),
    })
    onSelect?.()
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div
      aria-label={copy.common.languageLabel}
      role="group"
      className="inline-flex min-h-11 items-center rounded-full border border-olive-200 bg-white/70 p-1 text-xs font-semibold text-olive-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]"
    >
      {(['en', 'zh'] as const).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={locale === item}
          disabled={isPending}
          onClick={() => {
            void selectLocale(item)
          }}
          className={cn(
            'min-h-9 rounded-full px-3 transition disabled:cursor-not-allowed disabled:opacity-60',
            locale === item ? 'bg-olive-900 text-ivory shadow-[0_8px_20px_rgba(28,53,41,0.16)]' : 'text-olive-700 hover:bg-olive-50',
          )}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  )
}

import Link from 'next/link'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'

export default async function NotFound() {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-[2rem] border border-olive-200/80 bg-white/80 p-10 text-center shadow-[0_18px_48px_rgba(23,35,29,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-500">{copy.notFound.eyebrow}</p>
      <h1 className="mt-4 text-5xl text-olive-950">{copy.notFound.title}</h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-olive-700">{copy.notFound.summary}</p>
      <Link href="/" className="mt-8 rounded-full bg-olive-900 px-5 py-3 text-sm font-semibold text-ivory">
        {copy.notFound.action}
      </Link>
    </div>
  )
}

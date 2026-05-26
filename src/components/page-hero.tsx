import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  summary,
  actions,
  className,
}: {
  eyebrow: string
  title: string
  summary: string
  actions?: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-[radial-gradient(circle_at_top_right,_rgba(39,75,58,0.14),_transparent_28%),radial-gradient(circle_at_left,_rgba(255,255,255,0.88),_transparent_45%),linear-gradient(180deg,#fbf8f4_0%,#f3f0ea_100%)] px-6 py-12 text-olive-900 shadow-[0_24px_70px_rgba(22,33,25,0.08)] md:px-10 md:py-20',
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-10 top-8 size-52 rounded-full bg-white/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-56 rounded-tr-full bg-olive-100/55 blur-2xl" />
      <div className="relative max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-olive-600">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[0.98] md:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-olive-700 md:text-lg">{summary}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
      </div>
    </section>
  )
}

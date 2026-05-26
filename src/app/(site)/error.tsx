'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="rounded-full bg-olive-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
        Something went wrong
      </div>
      <h1 className="max-w-md text-3xl text-olive-900 md:text-4xl">
        We ran into an issue loading this page.
      </h1>
      <p className="max-w-md text-sm leading-7 text-olive-600">
        Please try again in a moment. If the problem persists, give us a call or send a message through our contact page.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex min-h-11 items-center rounded-full bg-olive-900 px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full border border-olive-300 px-6 py-3 text-sm font-semibold text-olive-900 transition hover:bg-olive-100"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
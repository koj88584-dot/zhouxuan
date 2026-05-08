import { NextResponse } from 'next/server'
import { localeCookieName, parseLocale } from '@/lib/i18n'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { locale?: string }
  const locale = parseLocale(body.locale)
  const response = NextResponse.json({ locale })

  response.cookies.set(localeCookieName, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  })

  return response
}

import { NextResponse } from 'next/server'
import { localeCookieName, parseLocale } from '@/lib/i18n'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-nf-client-connection-ip') || request.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(`locale:${ip}`, 20)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  const body = (await request.json().catch(() => ({}))) as { locale?: string }
  const locale = parseLocale(typeof body.locale === 'string' ? body.locale.trim() : body.locale)
  const response = NextResponse.json({ locale })

  response.cookies.set(localeCookieName, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  })

  return response
}
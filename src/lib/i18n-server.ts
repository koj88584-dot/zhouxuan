import { cache } from 'react'
import { cookies } from 'next/headers'
import { localeCookieName, parseLocale } from '@/lib/i18n'

const _getCurrentLocale = cache(async () => {
  const cookieStore = await cookies()
  return parseLocale(cookieStore.get(localeCookieName)?.value)
})

export const getCurrentLocale = _getCurrentLocale
import { cookies } from 'next/headers'
import { localeCookieName, parseLocale } from '@/lib/i18n'

export async function getCurrentLocale() {
  const cookieStore = await cookies()
  return parseLocale(cookieStore.get(localeCookieName)?.value)
}

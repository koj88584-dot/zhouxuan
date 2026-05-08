import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import Script from 'next/script'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getSiteSettings } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { buildMetadata, buildSpaJsonLd } from '@/lib/seo'
import '@/app/globals.css'

export const dynamic = 'force-dynamic'

const display = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
})

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale()
  const copy = getUiCopy(locale)
  const settings = await getSiteSettings(locale)

  return buildMetadata({
    title: `${settings.siteName} | ${copy.home.title}`,
    description: settings.siteDescription,
    path: '/',
  })
}

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getCurrentLocale()
  const settings = await getSiteSettings(locale)
  const jsonLd = buildSpaJsonLd({
    name: settings.siteName,
    description: settings.siteDescription,
    telephone: settings.contact.phone,
    email: settings.contact.email,
    addressLine1: settings.contact.addressLine1,
    addressLine2: settings.contact.addressLine2,
  })

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <Script id="spa-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="relative min-h-screen pb-10">
          <SiteHeader settings={settings} locale={locale} />
          <main className="mx-auto mt-6 max-w-[1180px] px-4 md:px-8">{children}</main>
          <SiteFooter settings={settings} locale={locale} />
        </div>
      </body>
    </html>
  )
}

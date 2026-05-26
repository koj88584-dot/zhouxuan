import type { Metadata } from 'next'
import Script from 'next/script'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getSiteSettings } from '@/lib/content'
import { getUiCopy } from '@/lib/i18n'
import { getCurrentLocale } from '@/lib/i18n-server'
import { buildMetadata, buildSpaJsonLd } from '@/lib/seo'
import '@/app/globals.css'

export const dynamic = 'force-dynamic'

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
    contact: settings.contact,
  })

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'}>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-full focus:bg-olive-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ivory">Skip to main content</a>
        <Script id="spa-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="relative min-h-screen pb-10">
          <SiteHeader settings={settings} locale={locale} />
          <main id="main-content" className="mx-auto mt-6 max-w-[1180px] px-4 md:px-8">{children}</main>
          <SiteFooter settings={settings} locale={locale} />
        </div>
      </body>
    </html>
  )
}

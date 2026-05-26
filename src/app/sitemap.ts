import type { MetadataRoute } from 'next'
import { getPages, getServices } from '@/lib/content'
import { absoluteUrl } from '@/lib/utils'

const alwaysIncluded = ['/services', '/aboutus', '/contact-us']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, services] = await Promise.all([getPages(), getServices()])
  const urls = new Map<string, MetadataRoute.Sitemap[number]>()

  urls.set(absoluteUrl('/'), {
    url: absoluteUrl('/'),
    lastModified: new Date(),
  })

  for (const path of alwaysIncluded) {
    urls.set(absoluteUrl(path), {
      url: absoluteUrl(path),
      lastModified: new Date(),
    })
  }

  for (const page of pages) {
    urls.set(absoluteUrl(`/${page.slug}`), {
      url: absoluteUrl(`/${page.slug}`),
      lastModified: new Date(),
    })
  }

  for (const service of services) {
    urls.set(absoluteUrl(`/${service.slug}`), {
      url: absoluteUrl(`/${service.slug}`),
      lastModified: new Date(),
    })
  }

  return Array.from(urls.values())
}

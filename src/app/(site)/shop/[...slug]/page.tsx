import { permanentRedirect } from 'next/navigation'
import { getServiceBySlug } from '@/lib/content'

export default async function LegacyShopPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const first = slug[0]

  if (first) {
    const service = await getServiceBySlug(first)
    if (service) {
      permanentRedirect(`/${service.slug}`)
    }
  }

  permanentRedirect('/services')
}

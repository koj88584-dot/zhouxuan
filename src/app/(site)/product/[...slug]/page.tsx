import { permanentRedirect } from 'next/navigation'

export default async function LegacyProductPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  if (slug[0] === 'card-courtesy-fee') {
    permanentRedirect('/contact-us')
  }

  permanentRedirect('/services')
}

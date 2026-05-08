import type { Metadata } from 'next'

type AdminPageProps = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

const isPayloadConfigured = () =>
  process.env.PAYLOAD_DATABASE_DISABLED !== '1' &&
  Boolean(process.env.DATABASE_URL && process.env.PAYLOAD_SECRET)

export const generateMetadata = async ({
  params,
  searchParams,
}: AdminPageProps): Promise<Metadata> => {
  if (!isPayloadConfigured()) {
    return {
      title: 'Admin setup required | Verdant Meridian Spa',
      description: 'Connect a production database to enable the admin panel.',
    }
  }

  const [{ generatePageMetadata }, { default: payloadConfig }] = await Promise.all([
    import('@payloadcms/next/views'),
    import('@/payload-config'),
  ])

  return generatePageMetadata({
    config: Promise.resolve(payloadConfig),
    params,
    searchParams,
  })
}

export default async function PayloadAdminPage({ params, searchParams }: AdminPageProps) {
  if (!isPayloadConfigured()) {
    return (
      <main className="admin-setup-required">
        <section>
          <p className="admin-setup-required__eyebrow">Admin setup</p>
          <h1>Connect the production database</h1>
          <p>
            The public spa site is live. Add a Netlify environment variable named DATABASE_URL to
            enable login, registration, bookings, services, technicians, and content management.
          </p>
        </section>
      </main>
    )
  }

  const [{ RootPage }, { default: payloadConfig }, { importMap }] = await Promise.all([
    import('@payloadcms/next/views'),
    import('@/payload-config'),
    import('@/app/(payload)/admin/importMap'),
  ])

  return RootPage({
    config: Promise.resolve(payloadConfig),
    importMap,
    params,
    searchParams,
  })
}

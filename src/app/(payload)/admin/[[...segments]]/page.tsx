import type { Metadata } from 'next'
import { isPayloadConfigured } from '@/lib/payload-status'

type AdminPageProps = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

function AdminSetupRequired({ mode = 'setup' }: { mode?: 'setup' | 'unavailable' }) {
  const isUnavailable = mode === 'unavailable'

  return (
    <main className="admin-setup-required">
      <section>
        <p className="admin-setup-required__eyebrow">{isUnavailable ? 'Admin unavailable' : 'Admin setup'}</p>
        <h1>{isUnavailable ? 'The admin database needs attention' : 'Connect the production database'}</h1>
        <p>
          {isUnavailable
            ? 'The public spa site is still available, but the admin panel could not load its database schema. Check DATABASE_URL, Payload migrations, and Netlify function logs.'
            : 'The public spa site is live. Add a Netlify environment variable named DATABASE_URL to enable login, registration, bookings, services, technicians, and content management.'}
        </p>
      </section>
    </main>
  )
}

function isNextControlFlowError(error: unknown) {
  const digest = (error as { digest?: unknown } | null)?.digest
  return typeof digest === 'string' && (digest.startsWith('NEXT_REDIRECT') || digest.startsWith('NEXT_NOT_FOUND'))
}

export const generateMetadata = async ({
  params,
  searchParams,
}: AdminPageProps): Promise<Metadata> => {
  if (!isPayloadConfigured()) {
    return {
      title: 'Admin setup required | Oasis Spa',
      description: 'Connect a production database to enable the admin panel.',
    }
  }

  try {
    const [{ generatePageMetadata }, { default: payloadConfig }] = await Promise.all([
      import('@payloadcms/next/views'),
      import('@/payload-config'),
    ])

    return await generatePageMetadata({
      config: Promise.resolve(payloadConfig),
      params,
      searchParams,
    })
  } catch (error) {
    if (isNextControlFlowError(error)) throw error

    console.error('Failed to generate Payload admin metadata:', error)
    return {
      title: 'Admin unavailable | Oasis Spa',
      description: 'The admin panel could not load its database-backed configuration.',
    }
  }
}

export default async function PayloadAdminPage({ params, searchParams }: AdminPageProps) {
  if (!isPayloadConfigured()) {
    return <AdminSetupRequired />
  }

  try {
    const [{ RootPage }, { default: payloadConfig }, { importMap }] = await Promise.all([
      import('@payloadcms/next/views'),
      import('@/payload-config'),
      import('@/app/(payload)/admin/importMap'),
    ])

    return await RootPage({
      config: Promise.resolve(payloadConfig),
      importMap,
      params,
      searchParams,
    })
  } catch (error) {
    if (isNextControlFlowError(error)) throw error

    console.error('Failed to render Payload admin page:', error)
    return <AdminSetupRequired mode="unavailable" />
  }
}

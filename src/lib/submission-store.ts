import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

type SubmissionKind = 'booking' | 'inquiry'

type SaveSubmissionResult =
  | {
      saved: true
      key: string
    }
  | {
      saved: false
      reason: string
    }

export async function saveSubmissionToBlob(
  kind: SubmissionKind,
  data: Record<string, unknown>,
): Promise<SaveSubmissionResult> {
  const submittedAt = new Date().toISOString()
  const key = `${kind}/${submittedAt.slice(0, 10)}/${submittedAt.replace(/[:.]/g, '-')}-${randomUUID()}`

  // Try Netlify Blobs first (production)
  try {
    const { getStore } = await import('@netlify/blobs')
    const store = getStore({ name: 'spa-submissions', consistency: 'strong' })

    await store.setJSON(
      key,
      {
        kind,
        status: 'new',
        submittedAt,
        data,
      },
      {
        metadata: {
          kind,
          status: 'new',
          submittedAt,
        },
      },
    )

    return { saved: true, key }
  } catch {
    // Netlify Blobs not available — fall back to local filesystem
  }

  // Local filesystem fallback (dev environment)
  try {
    const dir = path.resolve(process.cwd(), '.data', 'submissions', kind)
    await mkdir(dir, { recursive: true })

    const filename = `${submittedAt.replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}.json`
    await writeFile(
      path.join(dir, filename),
      JSON.stringify({ kind, status: 'new', submittedAt, data }, null, 2),
      'utf-8',
    )

    return { saved: true, key: `local/${kind}/${filename}` }
  } catch (error) {
    console.error('Failed to save submission to local filesystem', error)
    return { saved: false, reason: 'save-failed' }
  }
}


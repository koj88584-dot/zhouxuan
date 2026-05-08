import { randomUUID } from 'node:crypto'
import { getStore } from '@netlify/blobs'

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

  try {
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
  } catch (error) {
    console.error('Failed to save submission to Netlify Blobs', error)
    return { saved: false, reason: 'blob-save-failed' }
  }
}

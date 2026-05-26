import { NextResponse } from 'next/server'
import { sendInquiryNotification } from '@/lib/mailer'
import { getPayloadClient } from '@/lib/payload'
import { saveSubmissionToBlob } from '@/lib/submission-store'
import { inquirySchema } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-nf-client-connection-ip') || request.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(`inquiry:${ip}`)) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 })
  }

  const json = await request.json().catch(() => null)
  const parsed = inquirySchema.safeParse(json)

  if (!parsed.success) {
    const errors = Object.fromEntries(
      parsed.error.issues.map((issue) => [issue.path.join('.') || 'form', issue.message]),
    )

    return NextResponse.json({ errors }, { status: 400 })
  }

  const payload = await getPayloadClient()
  let persisted = false
  let stored = false

  if (payload) {
    try {
      await payload.create({
        collection: 'inquiries',
        data: {
          ...parsed.data,
          status: 'new',
        },
      })
      persisted = true
    } catch (error) {
      console.error('Failed to persist inquiry', error)
    }
  }

  const notification = await sendInquiryNotification(parsed.data)

  if (!persisted && !notification.sent) {
    const fallback = await saveSubmissionToBlob('inquiry', {
      ...parsed.data,
      source: 'website-inquiry',
    })

    stored = fallback.saved

    if (!fallback.saved) {
      return NextResponse.json(
        { error: 'We could not save or deliver your message right now. Please try again shortly.' },
        { status: 502 },
      )
    }
  }

  return NextResponse.json({
    success: true,
    persisted,
    notified: notification.sent,
    stored,
  })
}
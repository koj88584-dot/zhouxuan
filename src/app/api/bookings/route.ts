import { NextResponse } from 'next/server'
import { sendInquiryNotification } from '@/lib/mailer'
import { canTechnicianPerformService } from '@/lib/booking'
import { getServices, getTechnicians } from '@/lib/content'
import { getPayloadClient } from '@/lib/payload'
import { saveSubmissionToBlob } from '@/lib/submission-store'
import { bookingSchema } from '@/lib/validation'

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = bookingSchema.safeParse(json)

  if (!parsed.success) {
    const errors = Object.fromEntries(
      parsed.error.issues.map((issue) => [issue.path.join('.') || 'form', issue.message]),
    )

    return NextResponse.json({ errors }, { status: 400 })
  }

  const [services, technicians, payload] = await Promise.all([getServices(), getTechnicians(), getPayloadClient()])
  const service = services.find((entry) => entry.slug === parsed.data.serviceSlug)
  const technician =
    parsed.data.technicianSlug === 'any'
      ? technicians.find((entry) => entry.slug === 'any-available')
      : technicians.find((entry) => entry.slug === parsed.data.technicianSlug)

  if (!service) {
    return NextResponse.json({ errors: { serviceSlug: 'That service is no longer available.' } }, { status: 400 })
  }

  if (!technician) {
    return NextResponse.json(
      { errors: { technicianSlug: 'That technician is no longer available.' } },
      { status: 400 },
    )
  }

  if (!canTechnicianPerformService(technician, service.slug)) {
    return NextResponse.json(
      { errors: { technicianSlug: 'That technician is not available for this service.' } },
      { status: 400 },
    )
  }

  let persisted = false
  let stored = false

  if (payload) {
    try {
      await payload.create({
        collection: 'bookings',
        data: {
          status: 'new',
          serviceSlug: service.slug,
          serviceTitle: service.title,
          technicianSlug: parsed.data.technicianSlug,
          technicianName: technician.name,
          preferredDate: parsed.data.preferredDate,
          preferredTime: parsed.data.preferredTime,
          durationPreference: parsed.data.durationPreference,
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email,
          notes: parsed.data.notes,
          source: 'website-booking',
        },
      })
      persisted = true
    } catch (error) {
      console.error('Failed to persist booking request', error)
    }
  }

  const notification = await sendInquiryNotification(
    {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      serviceSlug: service.slug,
      message: [
        'New booking request',
        `Service: ${service.title}`,
        `Technician: ${technician.name}`,
        `Date: ${parsed.data.preferredDate}`,
        `Time: ${parsed.data.preferredTime}`,
        `Duration: ${parsed.data.durationPreference}`,
        parsed.data.notes ? `Notes: ${parsed.data.notes}` : undefined,
      ]
        .filter(Boolean)
        .join('\n'),
    },
    { subject: `New spa booking request from ${parsed.data.name}` },
  )

  if (!persisted && !notification.sent) {
    const fallback = await saveSubmissionToBlob('booking', {
      ...parsed.data,
      serviceTitle: service.title,
      technicianName: technician.name,
      source: 'website-booking',
    })

    stored = fallback.saved

    if (!fallback.saved) {
      return NextResponse.json(
        {
          error:
            'We could not save or deliver this booking request right now. Please call the spa or try again shortly.',
        },
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

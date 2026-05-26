import { getSpaTodayIso } from '@/lib/date'
import { bookingSchema, inquirySchema } from '@/lib/validation'

describe('inquirySchema', () => {
  it('accepts a valid inquiry payload', () => {
    const result = inquirySchema.safeParse({
      name: 'Avery Chen',
      email: 'avery@example.com',
      message: 'I would like to know which treatment is best for shoulder tension.',
      serviceSlug: 'body-massage',
    })

    expect(result.success).toBe(true)
  })

  it('rejects incomplete payloads with field errors', () => {
    const result = inquirySchema.safeParse({
      name: 'A',
      email: 'not-an-email',
      message: 'short',
    })

    expect(result.success).toBe(false)
    if (result.success) return

    const issues = result.error.issues.map((issue) => issue.path.join('.'))
    expect(issues).toContain('name')
    expect(issues).toContain('email')
    expect(issues).toContain('message')
  })
})

describe('bookingSchema', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('accepts a complete booking request', () => {
    const result = bookingSchema.safeParse({
      serviceSlug: 'body-massage',
      technicianSlug: 'any',
      preferredDate: '2026-06-12',
      preferredTime: '1:30 PM',
      durationPreference: '60 minutes',
      name: 'Avery Chen',
      phone: '6085550188',
      email: 'avery@example.com',
      notes: 'Medium pressure please.',
    })

    expect(result.success).toBe(true)
  })

  it('rejects missing booking details', () => {
    const result = bookingSchema.safeParse({
      serviceSlug: '',
      technicianSlug: '',
      preferredDate: 'not-a-date',
      preferredTime: '',
      durationPreference: '',
      name: 'A',
      phone: '12',
      email: 'bad',
    })

    expect(result.success).toBe(false)
    if (result.success) return

    const issues = result.error.issues.map((issue) => issue.path.join('.'))
    expect(issues).toContain('serviceSlug')
    expect(issues).toContain('preferredDate')
    expect(issues).toContain('phone')
  })

  it('uses the spa timezone when validating same-day bookings', () => {
    vi.setSystemTime(new Date('2026-05-09T02:30:00.000Z'))

    expect(getSpaTodayIso()).toBe('2026-05-08')

    const result = bookingSchema.safeParse({
      serviceSlug: 'body-massage',
      technicianSlug: 'any',
      preferredDate: '2026-05-08',
      preferredTime: '7:30 PM',
      durationPreference: '60 minutes',
      name: 'Avery Chen',
      phone: '6085550188',
      email: 'avery@example.com',
    })

    expect(result.success).toBe(true)
  })
})

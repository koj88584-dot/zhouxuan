'use client'

import { useMemo, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { CalendarCheck, CheckCircle2, Clock, Loader2, UserRound } from 'lucide-react'
import { canTechnicianPerformService } from '@/lib/booking'
import { getSpaTodayIso } from '@/lib/date'
import { defaultLocale, getUiCopy, type Locale } from '@/lib/i18n'
import type { ServiceDoc, TechnicianDoc } from '@/lib/types'
import { cn } from '@/lib/utils'

const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM', '9:00 PM']

export function BookingForm({
  services,
  technicians,
  locale = defaultLocale,
}: {
  services: ServiceDoc[]
  technicians: TechnicianDoc[]
  locale?: Locale
}) {
  const copy = getUiCopy(locale)
  const searchParams = useSearchParams()
  const requestedService = searchParams.get('service')
  const initialService = services.some((service) => service.slug === requestedService)
    ? requestedService || services[0]?.slug || ''
    : services[0]?.slug || ''

  const [serviceSlug, setServiceSlug] = useState(initialService)
  const [technicianSlug, setTechnicianSlug] = useState('any-available')
  const [preferredDate, setPreferredDate] = useState(getSpaTodayIso())
  const [preferredTime, setPreferredTime] = useState(timeSlots[3])
  const [durationPreference, setDurationPreference] = useState('Best fit')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const selectedService = services.find((service) => service.slug === serviceSlug)
  const availableTechnicians = useMemo(
    () =>
      technicians.filter(
        (technician) => canTechnicianPerformService(technician, serviceSlug),
      ),
    [serviceSlug, technicians],
  )

  const durationOptions = useMemo(() => {
    const durations = selectedService?.duration
      .split('/')
      .map((d) => d.replace(/min/i, '').trim() + ' min')
      .filter((d) => d.length > 4)

    return ['Best fit', ...(durations || [])]
  }, [selectedService?.duration])

  return (
    <form
      className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
      onSubmit={(event) => {
        event.preventDefault()
        setFeedback(null)

        startTransition(async () => {
          const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              serviceSlug,
              technicianSlug,
              preferredDate,
              preferredTime,
              durationPreference,
              name,
              phone,
              email,
              notes,
            }),
          })

          const data = (await response.json()) as {
            error?: string
            errors?: Record<string, string>
            success?: boolean
            persisted?: boolean
            notified?: boolean
            stored?: boolean
          }

          if (!response.ok) {
            setFeedback({
              type: 'error',
              message: data.errors ? Object.values(data.errors).join(' ') : data.error || copy.bookingForm.checkForm,
            })
            return
          }

          setName('')
          setPhone('')
          setEmail('')
          setNotes('')
          setFeedback({
            type: 'success',
            message: data.persisted || data.notified || data.stored ? copy.bookingForm.success : copy.bookingForm.submitted,
          })
        })
      }}
    >
      <section className="rounded-[1.8rem] border border-white/85 bg-white/88 p-5 shadow-[0_18px_48px_rgba(23,35,29,0.08)] md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-600">{copy.bookingForm.chooseService}</p>
        <div className="mt-5 grid gap-3">
          {services.map((service) => (
            <label
              key={service.slug}
              className={cn(
                'cursor-pointer rounded-[1.2rem] border p-4 transition',
                service.slug === serviceSlug
                  ? 'border-olive-700 bg-olive-900 text-ivory shadow-[0_16px_32px_rgba(28,53,41,0.16)]'
                  : 'border-olive-100 bg-olive-50/70 text-olive-900 hover:border-olive-300',
              )}
            >
              <input
                type="radio"
                name="serviceSlug"
                value={service.slug}
                checked={service.slug === serviceSlug}
                onChange={() => {
                  setServiceSlug(service.slug)
                  setTechnicianSlug('any-available')
                  setDurationPreference('Best fit')
                }}
                className="sr-only"
              />
              <span className="flex items-start justify-between gap-4">
                <span>
                  <span className="block text-lg font-semibold">{service.title}</span>
                  <span className={cn('mt-2 block text-sm leading-6', service.slug === serviceSlug ? 'text-stone-200' : 'text-olive-700')}>
                    {service.summary}
                  </span>
                </span>
                <span className={cn('mt-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]', service.slug === serviceSlug ? 'bg-white/14 text-stone-100' : 'bg-white text-olive-700')}>
                  {service.duration}
                </span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-6">
        <div className="rounded-[1.8rem] border border-white/85 bg-white/88 p-5 shadow-[0_18px_48px_rgba(23,35,29,0.08)] md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-600">{copy.bookingForm.technician}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {availableTechnicians.map((technician) => (
              <label
                key={technician.slug}
                className={cn(
                  'cursor-pointer rounded-[1.2rem] border p-4 transition',
                  technician.slug === technicianSlug
                    ? 'border-olive-700 bg-olive-900 text-ivory'
                    : 'border-olive-100 bg-olive-50/70 text-olive-900 hover:border-olive-300',
                )}
              >
                <input
                  type="radio"
                  name="technicianSlug"
                  value={technician.slug}
                  checked={technician.slug === technicianSlug}
                  onChange={() => setTechnicianSlug(technician.slug)}
                  className="sr-only"
                />
                <span className="flex gap-3">
                  <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-olive-800">
                    <UserRound className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">{technician.name}</span>
                    <span className="mt-1 block text-sm leading-6 opacity-80">{technician.title}</span>
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/85 bg-white/88 p-5 shadow-[0_18px_48px_rgba(23,35,29,0.08)] md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-600">{copy.bookingForm.timeRequest}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="grid min-w-0 gap-2 text-sm font-semibold text-olive-900">
              <span className="inline-flex items-center gap-2">
                <CalendarCheck className="size-4" aria-hidden="true" />
                {copy.bookingForm.date}
              </span>
              <input
                type="date"
                required
                min={getSpaTodayIso()}
                value={preferredDate}
                onChange={(event) => setPreferredDate(event.target.value)}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
              />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-semibold text-olive-900">
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4" aria-hidden="true" />
                {copy.bookingForm.time}
              </span>
              <select
                value={preferredTime}
                onChange={(event) => setPreferredTime(event.target.value)}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
              >
                {timeSlots.map((slot, index) => (
                  <option key={slot} value={slot}>
                    {copy.bookingForm.timeSlots[index] || slot}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-semibold text-olive-900">
              {copy.bookingForm.duration}
              <select
                value={durationPreference}
                onChange={(event) => setDurationPreference(event.target.value)}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
              >
                {durationOptions.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration === 'Best fit' ? copy.bookingForm.bestFit : duration}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/85 bg-white/88 p-5 shadow-[0_18px_48px_rgba(23,35,29,0.08)] md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-600">{copy.bookingForm.yourDetails}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="grid min-w-0 gap-2 text-sm font-semibold text-olive-900">
              {copy.bookingForm.fullName}
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
              />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-semibold text-olive-900">
              {copy.bookingForm.phone}
              <input
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
              />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-semibold text-olive-900">
              {copy.bookingForm.email}
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-12 w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
              />
            </label>
          </div>
          <label className="mt-4 grid min-w-0 gap-2 text-sm font-semibold text-olive-900">
            {copy.bookingForm.notes}
            <textarea
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={copy.bookingForm.notesPlaceholder}
              className="w-full min-w-0 rounded-[1.4rem] border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
            />
          </label>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-olive-900 px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="size-4" aria-hidden="true" />}
              {isPending ? copy.bookingForm.sending : copy.bookingForm.submit}
            </button>
            {feedback ? (
              <p className={cn('max-w-xl text-sm font-medium', feedback.type === 'success' ? 'text-olive-800' : 'text-red-700')} role="status">
                {feedback.message}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </form>
  )
}

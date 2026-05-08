'use client'

import { useState, useTransition } from 'react'
import { defaultLocale, getUiCopy, type Locale } from '@/lib/i18n'
import type { ServiceDoc } from '@/lib/types'

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  serviceSlug: '',
}

export function ContactForm({ services, locale = defaultLocale }: { services: ServiceDoc[]; locale?: Locale }) {
  const copy = getUiCopy(locale)
  const [form, setForm] = useState(initialState)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <form
      className="rounded-[1.9rem] border border-white/85 bg-white/92 p-6 shadow-[0_18px_50px_rgba(23,35,29,0.08)]"
      onSubmit={(event) => {
        event.preventDefault()
        setFeedback(null)

        startTransition(async () => {
          const response = await fetch('/api/inquiries', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          })

          const data = (await response.json()) as {
            error?: string
            errors?: Record<string, string>
            success?: boolean
            persisted?: boolean
            notified?: boolean
          }

          if (!response.ok) {
            setFeedback(data.errors ? Object.values(data.errors).join(' ') : data.error || copy.contactForm.error)
            return
          }

          setForm(initialState)
          setFeedback(
            data.persisted || data.notified
              ? copy.contactForm.success
              : copy.contactForm.setup,
          )
        })
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid min-w-0 gap-2 text-sm font-medium text-olive-900">
          {copy.contactForm.fullName}
          <input
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
          />
        </label>
        <label className="grid min-w-0 gap-2 text-sm font-medium text-olive-900">
          {copy.contactForm.email}
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
          />
        </label>
        <label className="grid min-w-0 gap-2 text-sm font-medium text-olive-900">
          {copy.contactForm.phone}
          <input
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            className="w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
          />
        </label>
        <label className="grid min-w-0 gap-2 text-sm font-medium text-olive-900">
          {copy.contactForm.service}
          <select
            value={form.serviceSlug}
            onChange={(event) => setForm((current) => ({ ...current, serviceSlug: event.target.value }))}
            className="w-full min-w-0 rounded-2xl border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
          >
            <option value="">{copy.contactForm.generalInquiry}</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 grid min-w-0 gap-2 text-sm font-medium text-olive-900">
        {copy.contactForm.message}
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className="w-full min-w-0 rounded-[1.4rem] border border-olive-200 bg-olive-50/70 px-4 py-3 outline-none transition focus:border-olive-500"
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-olive-900 px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-olive-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? copy.contactForm.sending : copy.contactForm.submit}
        </button>
        {feedback ? <p className="max-w-md text-sm text-olive-700">{feedback}</p> : null}
      </div>
    </form>
  )
}

import { z } from 'zod'
import { getSpaTodayIso } from '@/lib/date'

function isTodayOrFuture(value: string) {
  return value >= getSpaTodayIso()
}

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.'),
  email: z.email('Please enter a valid email address.'),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Please include a bit more detail in your message.'),
  serviceSlug: z.string().trim().optional(),
})

export const bookingSchema = z.object({
  serviceSlug: z.string().trim().min(1, 'Please choose a service.'),
  technicianSlug: z.string().trim().min(1, 'Please choose a technician preference.'),
  preferredDate: z.iso.date('Please choose a preferred date.').refine(isTodayOrFuture, 'Please choose today or a future date.'),
  preferredTime: z.string().trim().min(1, 'Please choose a preferred time.'),
  durationPreference: z.string().trim().min(1, 'Please choose a duration.'),
  name: z.string().trim().min(2, 'Please enter your full name.'),
  phone: z.string().trim().min(7, 'Please enter a phone number.'),
  email: z.email('Please enter a valid email address.'),
  notes: z.string().trim().max(700, 'Please keep notes under 700 characters.').optional(),
})

export const adminTokenSchema = z.string().trim().min(12)

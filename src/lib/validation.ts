import { z } from 'zod'
import { getSpaTodayIso } from '@/lib/date'

const VALID_TIME_SLOTS = [
  '9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM', '9:00 PM',
  '上午 9:00', '上午 10:30', '下午 12:00', '下午 1:30', '下午 3:00', '下午 4:30', '下午 6:00', '晚上 7:30', '晚上 9:00',
] as const

function isTodayOrFuture(value: string) {
  return value >= getSpaTodayIso()
}

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Please include a bit more detail in your message.').max(2000, 'Please keep your message under 2000 characters.'),
  serviceSlug: z.string().trim().optional(),
})

export const bookingSchema = z.object({
  serviceSlug: z.string().trim().min(1, 'Please choose a service.'),
  technicianSlug: z.string().trim().min(1, 'Please choose a technician preference.'),
  preferredDate: z.string().date('Please choose a preferred date.').refine(isTodayOrFuture, 'Please choose today or a future date.'),
  preferredTime: z.enum(VALID_TIME_SLOTS, { message: 'Please choose a valid time slot.' }),
  durationPreference: z.string().trim().min(1, 'Please choose a duration.'),
  name: z.string().trim().min(2, 'Please enter your full name.'),
  phone: z.string().trim().min(7, 'Please enter a phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  notes: z.string().trim().max(700, 'Please keep notes under 700 characters.').optional(),
})

export const adminTokenSchema = z.string().trim().min(12)

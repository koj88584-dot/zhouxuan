import nodemailer from 'nodemailer'
import type { InquiryInput } from '@/lib/types'

function getTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export function canSendInquiryNotifications() {
  return Boolean(getTransport() && process.env.CONTACT_NOTIFICATION_TO && process.env.SMTP_FROM)
}

export async function sendInquiryNotification(input: InquiryInput) {
  const transporter = getTransport()
  const target = process.env.CONTACT_NOTIFICATION_TO
  const from = process.env.SMTP_FROM

  if (!transporter || !target || !from) {
    return { sent: false, reason: 'not-configured' as const }
  }

  try {
    await transporter.sendMail({
      from,
      to: target,
      replyTo: input.email,
      subject: `New spa inquiry from ${input.name}`,
      text: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        input.phone ? `Phone: ${input.phone}` : undefined,
        input.serviceSlug ? `Service: ${input.serviceSlug}` : undefined,
        '',
        input.message,
      ]
        .filter(Boolean)
        .join('\n'),
    })
  } catch (error) {
    console.error('Failed to send inquiry notification', error)
    return { sent: false, reason: 'send-failed' as const }
  }

  return { sent: true as const }
}

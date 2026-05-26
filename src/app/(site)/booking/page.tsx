import { redirect } from 'next/navigation'

export const revalidate = 60

export default async function BookingPage() {
  redirect('/contact-us')
}

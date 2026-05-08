import type { TechnicianDoc } from '@/lib/types'

export function canTechnicianPerformService(technician: TechnicianDoc, serviceSlug: string) {
  return (
    technician.slug === 'any-available' ||
    technician.serviceSlugs.length === 0 ||
    technician.serviceSlugs.includes(serviceSlug)
  )
}

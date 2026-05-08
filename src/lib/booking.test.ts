import { canTechnicianPerformService } from '@/lib/booking'
import type { TechnicianDoc } from '@/lib/types'

const technician = {
  slug: 'lina',
  name: 'Lina',
  title: 'Relaxation focus',
  bio: '',
  serviceSlugs: ['body-massage'],
  specialties: [],
  languages: [],
  availabilityNote: '',
  active: true,
  displayOrder: 10,
} satisfies TechnicianDoc

describe('canTechnicianPerformService', () => {
  it('allows any-available, open service lists, and explicit matches only', () => {
    expect(canTechnicianPerformService({ ...technician, slug: 'any-available' }, 'foot-reflexology')).toBe(true)
    expect(canTechnicianPerformService({ ...technician, serviceSlugs: [] }, 'foot-reflexology')).toBe(true)
    expect(canTechnicianPerformService(technician, 'body-massage')).toBe(true)
    expect(canTechnicianPerformService(technician, 'foot-reflexology')).toBe(false)
  })
})

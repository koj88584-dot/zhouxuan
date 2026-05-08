import { getPageBySlug, getServiceBySlug, getServices, getSiteSettings, getTechnicians } from '@/lib/content'

describe('content fallback layer', () => {
  it('returns site settings without a configured database', async () => {
    const settings = await getSiteSettings()
    expect(settings.siteName).toBe('Oasis Spa')
    expect(settings.primaryNav).toContainEqual({ label: 'Book', href: '/booking' })
    expect(settings.contact.addressLine1).toContain('Odana')
  })

  it('returns the services collection and root-level service pages', async () => {
    const services = await getServices()
    expect(services.length).toBeGreaterThanOrEqual(6)

    const service = await getServiceBySlug('body-massage')
    expect(service?.title).toBe('Body Massage')
    expect(service?.binding.squareCategoryId).toBeTruthy()
  })

  it('returns technician options for booking fallback', async () => {
    const technicians = await getTechnicians()
    expect(technicians.length).toBeGreaterThanOrEqual(3)
    expect(technicians[0].slug).toBe('any-available')
    expect(technicians.some((technician) => technician.serviceSlugs.includes('body-massage'))).toBe(true)
  })

  it('returns localized public content for the Chinese language toggle', async () => {
    const settings = await getSiteSettings('zh')
    expect(settings.primaryNav).toContainEqual({ label: '预约', href: '/booking' })

    const service = await getServiceBySlug('body-massage', 'zh')
    expect(service?.title).toBe('全身按摩')

    const technicians = await getTechnicians('zh')
    expect(technicians[0].name).toBe('任意可预约技师')
  })

  it('returns editorial content pages that match the IA', async () => {
    const page = await getPageBySlug('aboutus')
    expect(page?.eyebrow).toBe('About Oasis Spa')
    expect(page?.bodyContent).toContain('Oasis Spa')
    expect(page?.bodyContent).toContain('massage')
  })
})

import { getPageBySlug, getServiceBySlug, getServices, getSiteSettings, getTechnicians } from '@/lib/content'

describe('content fallback layer', () => {
  it('returns site settings without a configured database', async () => {
    const settings = await getSiteSettings()
    expect(settings.siteName).toBe('7 DAY SPA')
    expect(settings.primaryNav).toContainEqual({ label: 'Services', href: '/services' })
    expect(settings.primaryNav.some((item) => item.href === '/booking')).toBe(false)
    expect(settings.contact.addressLine1).toContain('Sherman')
  })

  it('returns the services collection with 3 core massage styles', async () => {
    const services = await getServices()
    expect(services.length).toBeGreaterThanOrEqual(3)

    const service = await getServiceBySlug('body-massage')
    expect(service?.title).toBe('Body Massage')
    expect(service?.binding.active).toBe(true)
  })

  it('returns technician options for booking fallback', async () => {
    const technicians = await getTechnicians()
    expect(technicians.length).toBeGreaterThanOrEqual(2)
    expect(technicians[0].slug).toBe('any-available')
    expect(technicians.some((technician) => technician.serviceSlugs.includes('body-massage'))).toBe(true)
  })

  it('returns localized public content for the Chinese language toggle', async () => {
    const settings = await getSiteSettings('zh')
    expect(settings.primaryNav).toContainEqual({ label: '服务项目', href: '/services' })
    expect(settings.primaryNav.some((item) => item.href === '/booking')).toBe(false)

    const service = await getServiceBySlug('body-massage', 'zh')
    expect(service?.title).toBe('Body Massage')

    const technicians = await getTechnicians('zh')
    expect(technicians[0].name).toBe('任意可用按摩师')
  })

  it('returns editorial content pages that match the IA', async () => {
    const page = await getPageBySlug('aboutus')
    expect(page?.eyebrow).toBe('About 7 DAY SPA')
    expect(page?.bodyContent).toContain('7 DAY SPA')
    expect(page?.bodyContent).toContain('massage')
  })
})

import { runSquareSync } from '@/lib/square'

describe('runSquareSync', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      PAYLOAD_DATABASE_DISABLED: '1',
      SQUARE_ACCESS_TOKEN: '',
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('reports default services when Payload is unavailable', async () => {
    const summary = await runSquareSync()

    expect(summary.live).toBe(false)
    expect(summary.services.length).toBeGreaterThan(0)
    expect(summary.services[0]).toMatchObject({
      slug: 'body-massage',
      reason: 'Missing SQUARE_ACCESS_TOKEN',
    })
  })
})

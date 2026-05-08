import { getContactHref } from '@/lib/contact'

describe('getContactHref', () => {
  it('turns phone and email contact lines into direct links', () => {
    expect(getContactHref('(608) 888-7771')).toBe('tel:6088887771')
    expect(getContactHref('hello@example.com')).toBe('mailto:hello@example.com')
    expect(getContactHref('6733 Odana Rd')).toBeUndefined()
  })
})

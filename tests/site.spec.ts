import { expect, test } from '@playwright/test'

test.describe('7 DAY SPA marketing site', () => {
  test('renders the home page hero and featured services', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /relax, rejuvenate, refresh/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /view services/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /book appointment/i }).first()).toBeVisible()
  })

  test('renders the services page and one service detail page', async ({ page }) => {
    await page.goto('/services')
    await expect(page.getByRole('heading', { name: /massage menu/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /book now/i }).first()).toHaveAttribute('href', /\/booking\?service=/)
    await page.goto('/body-massage')
    await expect(page.getByRole('heading', { name: /body massage/i })).toBeVisible()
  })

  test('renders the contact page form', async ({ page }) => {
    await page.goto('/contact-us')
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible()
  })

  test('submits a booking request from the public form', async ({ page }) => {
    await page.route('**/api/bookings', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, stored: true }),
      })
    })

    await page.goto('/booking?service=body-massage')

    await expect(page.getByRole('heading', { name: /plan your spa visit/i })).toBeVisible()
    await page.getByLabel(/full name/i).fill('Avery Chen')
    await page.getByLabel(/phone/i).fill('6085550188')
    await page.getByLabel(/email/i).fill('avery@example.com')
    await page.getByLabel(/notes/i).fill('Medium pressure please.')
    await page.getByRole('button', { name: /request appointment/i }).click()

    await expect(page.getByText(/request received/i)).toBeVisible()
  })
})

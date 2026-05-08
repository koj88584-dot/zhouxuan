import { expect, test } from '@playwright/test'

test.describe('Verdant Meridian Spa marketing site', () => {
  test('renders the home page hero and featured services', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /restore the pace of your day/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /explore services/i })).toBeVisible()
  })

  test('renders the services page and one service detail page', async ({ page }) => {
    await page.goto('/services')
    await expect(page.getByRole('heading', { name: /service menu/i })).toBeVisible()
    await page.goto('/body-massage')
    await expect(page.getByRole('heading', { name: /body massage/i })).toBeVisible()
  })

  test('renders the contact page form', async ({ page }) => {
    await page.goto('/contact-us')
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible()
  })
})

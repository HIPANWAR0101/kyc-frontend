import { test, expect } from '@playwright/test'

test('RegistrationForm: user can register as customer', async ({ page }) => {
  await page.goto('/register')

  await page.fill('input[placeholder="Name"]', 'John Doe')
  await page.fill('input[placeholder="Email"]', 'john@example.com')
  await page.fill('input[placeholder="Password"]', 'password123')
  await page.fill('input[placeholder="Address"]', '123 Main St')
  await page.fill('input[placeholder="Contact"]', '9876543210')

  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('/')
})

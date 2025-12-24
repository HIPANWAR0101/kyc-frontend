import { test, expect } from '@playwright/test'

test('LoginForm: user can log in successfully', async ({ page }) => {
  await page.goto('/')

  await page.fill('input[placeholder="Email"]', 'test@example.com')
  await page.fill('input[placeholder="Password"]', 'password123')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL(/dashboard|bank-dashboard/)
})

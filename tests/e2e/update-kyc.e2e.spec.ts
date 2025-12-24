import { test, expect } from '@playwright/test'

test('UpdateKYC: user can update KYC info', async ({ page }) => {
  await page.goto('/dashboard/customer/update-kyc')

  await page.fill('input[placeholder="Address"]', '456 New Lane')
  await page.fill('input[placeholder="Mobile Number"]', '9876543210')
  await page.fill('input[placeholder="Aadhaar Number"]', '123412341234')
  await page.fill('input[placeholder="PAN Card Number"]', 'ABCDE1234F')

  // Simulate file uploads if needed
  // await page.setInputFiles('input[type="file"]', 'path/to/file.pdf')

  await page.click('button[type="submit"]')

  await expect(page.locator('text=KYC updated successfully!')).toBeVisible()
})


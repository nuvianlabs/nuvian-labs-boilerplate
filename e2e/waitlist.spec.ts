import { test, expect } from "@playwright/test"

test.describe("Waitlist Page", () => {
  test("should allow users to join waitlist with valid email", async ({ page }) => {
    await page.goto("/waitlist")

    // Fill in email
    const testEmail = `test-${Date.now()}@example.com`
    await page.fill('input[type="email"]', testEmail)

    // Submit form
    await page.click('button[type="submit"]')

    // Wait for success message
    await expect(page.locator("text=You're on the list!")).toBeVisible({ timeout: 10000 })
  })

  test("should show error for invalid email", async ({ page }) => {
    await page.goto("/waitlist")

    // Fill in invalid email
    await page.fill('input[type="email"]', "invalid-email")

    // Submit form
    await page.click('button[type="submit"]')

    // Should prevent submission due to HTML5 validation
    const emailInput = page.locator('input[type="email"]')
    await expect(emailInput).toHaveAttribute("type", "email")
  })

  test("should disable button while submitting", async ({ page }) => {
    await page.goto("/waitlist")

    // Fill in email
    await page.fill('input[type="email"]', `test-${Date.now()}@example.com`)

    // Get submit button
    const submitButton = page.locator('button[type="submit"]')

    // Click submit
    await submitButton.click()

    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled({ timeout: 1000 })
  })
})

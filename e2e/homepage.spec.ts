import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("should display the main heading", async ({ page }) => {
    await page.goto("/")

    // Check for main heading
    const heading = page.locator("h1")
    await expect(heading).toContainText("Nuvian Labs Boilerplate")
  })

  test("should navigate to pricing page", async ({ page }) => {
    await page.goto("/")

    // Click on pricing link
    await page.click('a[href="/pricing"]')

    // Verify we're on the pricing page
    await expect(page).toHaveURL("/pricing")
    await expect(page.locator("h1")).toContainText("Pricing")
  })

  test("should navigate to waitlist page", async ({ page }) => {
    await page.goto("/")

    // Click on waitlist link
    await page.click('a[href="/waitlist"]')

    // Verify we're on the waitlist page
    await expect(page).toHaveURL("/waitlist")
    await expect(page.locator("h1")).toContainText("Waitlist")
  })

  test("should navigate to setup page", async ({ page }) => {
    await page.goto("/")

    // Click on "Get Started" button
    await page.click('a[href="/setup"]')

    // Verify we're on the setup page
    await expect(page).toHaveURL("/setup")
  })

  test("should have functioning navigation", async ({ page }) => {
    await page.goto("/")

    // Verify navigation items are present
    await expect(page.locator('nav a[href="/pricing"]')).toBeVisible()
    await expect(page.locator('nav a[href="/waitlist"]')).toBeVisible()
  })
})

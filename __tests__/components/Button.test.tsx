import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "@/components/ui/button"

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("applies default variant styling", () => {
    render(<Button>Default</Button>)
    const button = screen.getByText("Default")
    expect(button).toHaveClass("bg-primary")
  })

  it("applies secondary variant styling", () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByText("Secondary")
    expect(button).toHaveClass("bg-secondary")
  })

  it("applies destructive variant styling", () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByText("Delete")
    expect(button).toHaveClass("bg-destructive")
  })

  it("applies outline variant styling", () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByText("Outline")
    expect(button).toHaveClass("border")
  })

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click</Button>)

    const button = screen.getByText("Click")
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText("Disabled")
    expect(button).toBeDisabled()
  })

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByText("Custom")
    expect(button).toHaveClass("custom-class")
  })

  it("renders as a different element when asChild is used", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/test")
  })
})

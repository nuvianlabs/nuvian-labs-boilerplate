import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

describe("Card Component", () => {
  it("renders Card with all sub-components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText("Card Title")).toBeInTheDocument()
    expect(screen.getByText("Card Description")).toBeInTheDocument()
    expect(screen.getByText("Card Content")).toBeInTheDocument()
    expect(screen.getByText("Card Footer")).toBeInTheDocument()
  })

  it("renders Card without optional components", () => {
    render(
      <Card>
        <CardContent>Just Content</CardContent>
      </Card>
    )

    expect(screen.getByText("Just Content")).toBeInTheDocument()
  })

  it("applies custom className to Card", () => {
    const { container } = render(
      <Card className="custom-card">
        <CardContent>Content</CardContent>
      </Card>
    )

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass("custom-card")
  })
})

import { AuthButton } from "@/components/auth/auth-button"
import Link from "next/link"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Nuvian Labs</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/waitlist"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Join Waitlist
            </Link>
            <AuthButton />
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Nuvian Labs Boilerplate. © 2025
          </p>
          <div className="flex gap-4">
            <Link
              href="https://github.com"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              GitHub
            </Link>
            <Link
              href="https://twitter.com"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Twitter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

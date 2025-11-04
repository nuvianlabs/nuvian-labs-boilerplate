import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Nuvian Labs Boilerplate
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Production-ready Next.js boilerplate with authentication, database, AI, payments, and analytics.
              Build your SaaS faster.
            </p>
          </div>

          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/setup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://github.com" target="_blank">
                View on GitHub
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mt-16">
            <FeatureCard
              title="Authentication"
              description="Better Auth with Google OAuth integration out of the box"
              icon="🔐"
            />
            <FeatureCard
              title="Database"
              description="Drizzle ORM with PostgreSQL for type-safe database operations"
              icon="🗄️"
            />
            <FeatureCard
              title="AI Integration"
              description="Vercel AI SDK ready with streaming chat interface"
              icon="🤖"
            />
            <FeatureCard
              title="Payments"
              description="Stripe integration with subscriptions and webhooks"
              icon="💳"
            />
            <FeatureCard
              title="Analytics"
              description="PostHog and Vercel Analytics for product insights"
              icon="📊"
            />
            <FeatureCard
              title="Monitoring"
              description="Sentry error tracking and Pino logging built-in"
              icon="🔍"
            />
          </div>

          {/* What's Included */}
          <Card className="w-full max-w-3xl mt-16">
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
              <CardDescription>Everything you need to build a modern web application</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <IncludedItem text="Next.js 15 with App Router" />
              <IncludedItem text="TypeScript & Tailwind CSS" />
              <IncludedItem text="User authentication & sessions" />
              <IncludedItem text="Database migrations & ORM" />
              <IncludedItem text="Email templates & sending" />
              <IncludedItem text="Background job processing" />
              <IncludedItem text="Rate limiting & caching" />
              <IncludedItem text="Testing setup (Vitest + Playwright)" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-4xl mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function IncludedItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-5 w-5 text-green-600" />
      <span className="text-sm">{text}</span>
    </div>
  )
}

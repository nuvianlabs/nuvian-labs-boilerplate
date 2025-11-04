import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Zap, Shield, Rocket, Code, Database, CreditCard } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
              Build Your SaaS in Days,
              <br />
              Not Months
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Production-ready Next.js boilerplate with authentication, payments, AI, and everything you need to launch fast.
            </p>
          </div>

          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://github.com" target="_blank">
                View on GitHub
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            All the essential features to build and scale your SaaS product
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Shield className="h-10 w-10" />}
            title="Authentication"
            description="Better Auth with Google OAuth, email/password, and session management built-in"
          />
          <FeatureCard
            icon={<Database className="h-10 w-10" />}
            title="Database"
            description="Drizzle ORM with PostgreSQL for type-safe, performant database operations"
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="AI Integration"
            description="Vercel AI SDK ready with streaming chat interface and OpenAI integration"
          />
          <FeatureCard
            icon={<CreditCard className="h-10 w-10" />}
            title="Payments"
            description="Stripe integration with subscriptions, webhooks, and billing portal"
          />
          <FeatureCard
            icon={<Code className="h-10 w-10" />}
            title="Modern Stack"
            description="Next.js 15, React 19, TypeScript, Tailwind CSS, and shadcn/ui"
          />
          <FeatureCard
            icon={<Rocket className="h-10 w-10" />}
            title="Deploy Instantly"
            description="Optimized for Vercel with one-click deployment and edge functions"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24">
        <Card className="border-2">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Ready to Build?</h3>
              <p className="text-muted-foreground">
                Start building your SaaS product today with our production-ready boilerplate
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-2 hover:border-primary transition-colors">
      <CardHeader>
        <div className="mb-4 text-primary">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

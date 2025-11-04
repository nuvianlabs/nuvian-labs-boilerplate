"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Circle, ArrowRight, ExternalLink, RefreshCw } from "lucide-react"
import Link from "next/link"

interface CheckItem {
  id: string
  name: string
  description: string
  status: "pass" | "fail" | "warn" | "checking"
  required: boolean
  docsLink?: string
}

export default function SetupPage() {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: "env",
      name: "Environment Variables",
      description: "Basic environment configuration",
      status: "checking",
      required: true,
    },
    {
      id: "database",
      name: "Database Connection",
      description: "PostgreSQL connection and schema",
      status: "checking",
      required: true,
      docsLink: "/docs/database-setup",
    },
    {
      id: "auth",
      name: "Authentication",
      description: "Better Auth and Google OAuth",
      status: "checking",
      required: true,
      docsLink: "/docs/auth-setup",
    },
    {
      id: "ai",
      name: "AI Integration",
      description: "OpenAI API configuration",
      status: "checking",
      required: false,
      docsLink: "/docs/ai-setup",
    },
    {
      id: "stripe",
      name: "Stripe Payments",
      description: "Stripe API keys configured",
      status: "checking",
      required: false,
      docsLink: "/docs/payments-setup",
    },
    {
      id: "email",
      name: "Email Service",
      description: "Resend API configured",
      status: "checking",
      required: false,
      docsLink: "/docs/email-setup",
    },
  ])

  const [isChecking, setIsChecking] = useState(false)

  const runChecks = async () => {
    setIsChecking(true)

    // Check environment variables
    const hasAppUrl = typeof window !== "undefined" && window.location.origin
    updateCheck("env", hasAppUrl ? "pass" : "fail")

    // Check database
    try {
      const healthRes = await fetch("/api/health")
      const healthData = await healthRes.json()
      updateCheck("database", healthData.status === "healthy" ? "pass" : "fail")
    } catch {
      updateCheck("database", "fail")
    }

    // Check auth configuration
    const hasGoogleClientId = await checkEnvVar("GOOGLE_CLIENT_ID")
    const hasAuthSecret = await checkEnvVar("BETTER_AUTH_SECRET")
    updateCheck("auth", hasGoogleClientId && hasAuthSecret ? "pass" : "fail")

    // Check AI (optional)
    const hasOpenAI = await checkEnvVar("OPENAI_API_KEY")
    updateCheck("ai", hasOpenAI ? "pass" : "warn")

    // Check Stripe (optional)
    const hasStripe = await checkEnvVar("STRIPE_SECRET_KEY")
    updateCheck("stripe", hasStripe ? "pass" : "warn")

    // Check Email (optional)
    const hasResend = await checkEnvVar("RESEND_API_KEY")
    updateCheck("email", hasResend ? "pass" : "warn")

    setIsChecking(false)
  }

  const updateCheck = (id: string, status: CheckItem["status"]) => {
    setChecks((prev) =>
      prev.map((check) => (check.id === id ? { ...check, status } : check))
    )
  }

  const checkEnvVar = async (varName: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/check-env?var=${varName}`)
      const data = await res.json()
      return data.exists
    } catch {
      return false
    }
  }

  useEffect(() => {
    runChecks()
  }, [])

  const requiredChecks = checks.filter((c) => c.required)
  const optionalChecks = checks.filter((c) => !c.required)
  const passedRequired = requiredChecks.filter((c) => c.status === "pass").length
  const totalRequired = requiredChecks.length
  const allRequiredPassed = passedRequired === totalRequired

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Setup Checker</h1>
          <p className="text-muted-foreground text-lg">
            Verify your boilerplate configuration before building
          </p>
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Progress</CardTitle>
            <CardDescription>
              {passedRequired} of {totalRequired} required checks completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(passedRequired / totalRequired) * 100}%` }}
                />
              </div>

              {allRequiredPassed && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">All required checks passed!</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Required Checks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Required Configuration</h2>
          <div className="grid gap-4">
            {requiredChecks.map((check) => (
              <CheckCard key={check.id} check={check} />
            ))}
          </div>
        </div>

        {/* Optional Checks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Optional Integrations</h2>
          <div className="grid gap-4">
            {optionalChecks.map((check) => (
              <CheckCard key={check.id} check={check} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={runChecks} disabled={isChecking} variant="outline">
            <RefreshCw className={`mr-2 h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
            Re-check
          </Button>

          {allRequiredPassed && (
            <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">📚 Read the Documentation</h4>
              <p className="text-sm text-muted-foreground">
                Check out the quick start guide and setup instructions
              </p>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="https://github.com/your-repo/docs">
                  View Docs <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">🎨 Customize Your App</h4>
              <p className="text-sm text-muted-foreground">
                Edit the starter prompt to describe your app idea
              </p>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/docs/business/starter-prompt.md">
                  Edit Starter Prompt <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">🚀 Deploy to Production</h4>
              <p className="text-sm text-muted-foreground">
                Deploy your app to Vercel with one click
              </p>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="https://vercel.com/new">
                  Deploy Now <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CheckCard({ check }: { check: CheckItem }) {
  const getIcon = () => {
    switch (check.status) {
      case "pass":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warn":
        return <Circle className="h-5 w-5 text-yellow-600" />
      case "checking":
        return <RefreshCw className="h-5 w-5 text-muted-foreground animate-spin" />
    }
  }

  const getStatusBadge = () => {
    switch (check.status) {
      case "pass":
        return <Badge variant="default" className="bg-green-600">Configured</Badge>
      case "fail":
        return <Badge variant="destructive">Not Configured</Badge>
      case "warn":
        return <Badge variant="outline">Optional</Badge>
      case "checking":
        return <Badge variant="outline">Checking...</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{check.name}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-sm text-muted-foreground">{check.description}</p>
        </div>
        {check.docsLink && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={check.docsLink}>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export const dynamic = 'force-dynamic'

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist")
      }

      setIsSubmitted(true)
      toast({
        title: "Success!",
        description: "You've been added to the waitlist. Check your email for confirmation.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4 text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Join the Waitlist
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Be the first to know when we launch new features and updates
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Early Access</CardTitle>
            <CardDescription>
              Join thousands of developers building with our boilerplate
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
                <h3 className="text-2xl font-semibold">You&apos;re on the list!</h3>
                <p className="text-muted-foreground text-center">
                  We&apos;ve sent a confirmation email to <strong>{email}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By joining, you agree to receive updates and announcements. Unsubscribe anytime.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

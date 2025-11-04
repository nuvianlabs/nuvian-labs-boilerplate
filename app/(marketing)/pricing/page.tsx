import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "Community support",
      "1 team member",
    ],
    cta: "Get Started",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious builders",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "5 team members",
      "AI features included",
      "Custom domain",
    ],
    cta: "Start Free Trial",
    href: "/sign-up?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container px-4 py-24">
      <div className="space-y-4 text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Choose the plan that's right for you. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.highlighted ? "border-primary border-2 shadow-lg scale-105" : ""}
          >
            {plan.highlighted && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium rounded-t-lg">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>All plans include a 14-day free trial. No credit card required.</p>
      </div>
    </div>
  )
}

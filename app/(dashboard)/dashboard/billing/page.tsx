"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export const dynamic = 'force-dynamic';
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export default function BillingPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock subscription data - in a real app, fetch from your database
  const subscription = {
    plan: "Pro",
    status: "active",
    amount: "$29",
    interval: "month",
    nextBillingDate: "December 3, 2025",
    cancelAtPeriodEnd: false,
  };

  // Mock invoice history
  const invoices = [
    {
      id: "INV-001",
      date: "Nov 3, 2025",
      amount: "$29.00",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-002",
      date: "Oct 3, 2025",
      amount: "$29.00",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-003",
      date: "Sep 3, 2025",
      amount: "$29.00",
      status: "paid",
      downloadUrl: "#",
    },
  ];

  // Mock payment method
  const paymentMethod = {
    type: "card",
    brand: "Visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2026,
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    // In a real app, redirect to Stripe Customer Portal
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Opening billing portal",
      description: "You will be redirected to manage your subscription.",
    });
    setIsLoading(false);
  };

  const handleUpdatePaymentMethod = async () => {
    toast({
      title: "Update payment method",
      description: "This feature will be available once Stripe is configured.",
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Downloading invoice",
      description: `Invoice ${invoiceId} will be downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the {subscription.plan} plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold">{subscription.plan}</h3>
                  <Badge
                    variant={
                      subscription.status === "active" ? "default" : "secondary"
                    }
                  >
                    {subscription.status === "active" ? (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {subscription.status}
                  </Badge>
                </div>
                <p className="text-3xl font-bold">
                  {subscription.amount}
                  <span className="text-lg font-normal text-muted-foreground">
                    /{subscription.interval}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {subscription.cancelAtPeriodEnd
                    ? `Cancels on ${subscription.nextBillingDate}`
                    : `Renews on ${subscription.nextBillingDate}`}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Plan includes:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Custom integrations
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button onClick={handleManageSubscription} disabled={isLoading}>
              {isLoading ? "Loading..." : "Manage Subscription"}
            </Button>
            <Button variant="outline" asChild>
              <a href="/pricing" target="_blank">
                View All Plans
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <CardTitle>Payment Method</CardTitle>
          </div>
          <CardDescription>
            Manage your payment method for subscription billing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-16 rounded border flex items-center justify-center bg-muted">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">
                  {paymentMethod.brand} ending in {paymentMethod.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleUpdatePaymentMethod}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Download your past invoices and receipts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{invoice.amount}</p>
                    <Badge variant="secondary" className="mt-1">
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage & Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Usage & Limits</CardTitle>
          <CardDescription>
            Track your usage against plan limits.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">API Requests</span>
              <span className="text-sm text-muted-foreground">
                75,000 / 100,000
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "75%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-sm text-muted-foreground">3.2 GB / 10 GB</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "32%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Team Members</span>
              <span className="text-sm text-muted-foreground">4 / 10</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

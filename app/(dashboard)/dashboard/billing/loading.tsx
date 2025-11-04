import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BillingLoading() {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Current Plan Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-48" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full max-w-xs" />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-16 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-9 w-20" />
          </div>
        </CardContent>
      </Card>

      {/* Billing History Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

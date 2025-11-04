import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Card Skeleton */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-5 w-32 mx-auto" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>

          {/* Social Links Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <Skeleton className="h-10 w-40" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

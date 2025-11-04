import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, LayoutDashboard } from "lucide-react"

export default function DashboardNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <FileQuestion className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Page Not Found</CardTitle>
          </div>
          <CardDescription>
            This dashboard page doesn&apos;t exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

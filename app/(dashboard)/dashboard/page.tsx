"use client";

import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';
import {
  Users,
  TrendingUp,
  CreditCard,
  Activity,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();

  // Mock stats - in a real app, these would come from your database
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Active Subscriptions",
      value: "1,234",
      change: "+4.3%",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "API Requests",
      value: "98.5K",
      change: "+23.1%",
      trend: "up",
      icon: Activity,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New user signed up",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      action: "Subscription upgraded",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 3,
      action: "Payment received",
      time: "3 hours ago",
      status: "success",
    },
    {
      id: 4,
      action: "Feature request submitted",
      time: "5 hours ago",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name?.split(" ")[0] || "there"}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s what&apos;s happening with your application today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600 font-medium">
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      activity.status === "success" ? "default" : "secondary"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-between" variant="outline">
              View Analytics
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Manage Users
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Billing Settings
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              API Documentation
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Card */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm opacity-90">
            Complete your setup to get the most out of your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary">Complete Profile</Button>
            <Button variant="secondary">Setup Billing</Button>
            <Button variant="secondary">Invite Team</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

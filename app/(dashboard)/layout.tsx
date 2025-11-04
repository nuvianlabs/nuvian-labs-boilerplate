"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { AuthButton } from "@/components/auth/auth-button";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const dynamic = 'force-dynamic';

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protect the route - redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  // Show loading state while checking auth
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close button */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  NL
                </span>
              </div>
              <span className="font-semibold text-lg">Nuvian Labs</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section - User info */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {session.user?.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1" />

            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

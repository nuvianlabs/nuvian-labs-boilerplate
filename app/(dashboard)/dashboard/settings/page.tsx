"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export const dynamic = 'force-dynamic';
import {
  Bell,
  Lock,
  User,
  Globe,
  Mail,
  Shield,
  Smartphone,
} from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Settings saved",
      description: "Your profile settings have been updated successfully.",
    });

    setIsSaving(false);
  };

  const handleToggleNotification = async (type: string) => {
    toast({
      title: "Notification updated",
      description: `${type} notifications have been toggled.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile Information</CardTitle>
          </div>
          <CardDescription>
            Update your personal information and how others see you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={session?.user?.name || ""}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={session?.user?.email || ""}
                  placeholder="john@example.com"
                  disabled
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Badge variant="secondary">
                <Mail className="h-3 w-3 mr-1" />
                {session?.user?.emailVerified ? "Verified" : "Not Verified"}
              </Badge>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>
            Choose what notifications you want to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">
                Receive email updates about your account activity.
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleNotification("Email")}
            >
              Enabled
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="space-y-0.5">
              <div className="font-medium">Marketing Emails</div>
              <div className="text-sm text-muted-foreground">
                Receive emails about new features and updates.
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleNotification("Marketing")}
            >
              Disabled
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="space-y-0.5">
              <div className="font-medium">Security Alerts</div>
              <div className="text-sm text-muted-foreground">
                Get notified about important security events.
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleNotification("Security")}
            >
              Enabled
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>
            Manage your account security and authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <div className="font-medium">Password</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Last changed 3 months ago
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <div className="font-medium">Two-Factor Authentication</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <div className="font-medium">Active Sessions</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Manage your active sessions across devices
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that affect your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Delete Account</div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data.
              </div>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

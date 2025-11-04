"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';
import { useToast } from "@/components/ui/use-toast";
import {
  User,
  Mail,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Upload,
  Github,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });

    setIsSaving(false);
  };

  const handleUploadAvatar = () => {
    toast({
      title: "Upload avatar",
      description: "Avatar upload functionality will be implemented with storage setup.",
    });
  };

  // Mock user data - in a real app, fetch from database
  const userProfile = {
    ...session?.user,
    bio: "Full-stack developer passionate about building great products.",
    location: "San Francisco, CA",
    website: "https://example.com",
    company: "Nuvian Labs",
    joinedDate: "January 2025",
    github: "johndoe",
    twitter: "@johndoe",
    linkedin: "johndoe",
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your public profile information.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="h-24 w-24 rounded-full border-4 border-background shadow-lg"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg">
                      <span className="text-primary-foreground text-3xl font-bold">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                    onClick={handleUploadAvatar}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">
                    {session?.user?.name || "User"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Mail className="h-3 w-3 mr-1" />
                    {session?.user?.emailVerified ? "Verified" : "Not Verified"}
                  </Badge>
                  <Badge variant="outline">Pro Plan</Badge>
                </div>

                <Button variant="outline" className="w-full">
                  Change Avatar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium">{userProfile.joinedDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Projects</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">API Calls</span>
                <span className="font-medium">98.5K</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>Basic Information</CardTitle>
              </div>
              <CardDescription>
                Update your basic profile information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue={session?.user?.name || ""}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      defaultValue={userProfile.company}
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue={userProfile.bio}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      defaultValue={userProfile.location}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">
                      <Globe className="h-4 w-4 inline mr-1" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      defaultValue={userProfile.website}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                <CardTitle>Social Links</CardTitle>
              </div>
              <CardDescription>
                Connect your social media profiles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github">
                    <Github className="h-4 w-4 inline mr-1" />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    defaultValue={userProfile.github}
                    placeholder="username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">
                    <Twitter className="h-4 w-4 inline mr-1" />
                    Twitter/X
                  </Label>
                  <Input
                    id="twitter"
                    defaultValue={userProfile.twitter}
                    placeholder="@username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">
                    <Linkedin className="h-4 w-4 inline mr-1" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    defaultValue={userProfile.linkedin}
                    placeholder="username"
                  />
                </div>

                <Button type="submit">Update Social Links</Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                View your account details and status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-sm text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
                <Badge variant="secondary">
                  {session?.user?.emailVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">User ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {session?.user?.id?.substring(0, 24)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {userProfile.joinedDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

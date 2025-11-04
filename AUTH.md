# Authentication Guide

Complete guide to authentication setup and usage with Better Auth.

## Table of Contents

- [Overview](#overview)
- [Quick Setup](#quick-setup)
- [Google OAuth Setup](#google-oauth-setup)
- [Using Authentication](#using-authentication)
- [Protected Routes](#protected-routes)
- [Session Management](#session-management)
- [Advanced Configuration](#advanced-configuration)

---

## Overview

The boilerplate uses **Better Auth** - a modern, type-safe authentication library for Next.js.

### Features

- ✅ Google OAuth integration
- ✅ Email & password authentication (configurable)
- ✅ Session management (7-day sessions)
- ✅ Database-backed sessions
- ✅ Type-safe auth client
- ✅ Server and client-side auth
- ✅ Automatic session refresh

### Architecture

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │
       │ useSession()
       │ signIn/signOut
       │
┌──────▼──────────────────────┐
│   Better Auth Client        │
│   /lib/auth-client.ts       │
└──────┬──────────────────────┘
       │
       │ API Calls
       │
┌──────▼──────────────────────┐
│   Auth API Route            │
│   /api/auth/[...all]        │
└──────┬──────────────────────┘
       │
       │ Database
       │
┌──────▼──────────────────────┐
│   PostgreSQL                │
│   (users, sessions, accounts)│
└─────────────────────────────┘
```

---

## Quick Setup

### 1. Generate Auth Secret

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 2. Add to Environment Variables

In `.env.local`:

```bash
BETTER_AUTH_SECRET=your-generated-secret-here
BETTER_AUTH_URL=http://localhost:3000
```

### 3. Configure Google OAuth

See [Google OAuth Setup](#google-oauth-setup) below.

---

## Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "My SaaS App")
4. Click "Create"

### Step 2: Enable Google+ API

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (or "Internal" for workspace)
3. Click "Create"

**Fill in required fields:**

- **App name**: Your application name
- **User support email**: Your email
- **Developer contact information**: Your email

**Scopes** (click "Add or Remove Scopes"):
- `userinfo.email`
- `userinfo.profile`

Click "Save and Continue"

### Step 4: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"

**Configure:**

**Name**: Your app name

**Authorized JavaScript origins**:
```
http://localhost:3000
https://your-domain.com
https://your-domain.vercel.app
```

**Authorized redirect URIs**:
```
http://localhost:3000/api/auth/callback/google
https://your-domain.com/api/auth/callback/google
https://your-domain.vercel.app/api/auth/callback/google
```

5. Click "Create"
6. Copy your **Client ID** and **Client Secret**

### Step 5: Add Credentials to Environment

In `.env.local`:

```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Step 6: Test

1. Restart your development server: `pnpm dev`
2. Visit `/sign-in`
3. Click "Continue with Google"
4. Authorize your app
5. You should be redirected to `/dashboard`

---

## Using Authentication

### Client Components

Use the `useSession()` hook in client components:

```typescript
"use client"

import { useSession } from "@/lib/auth-client"

export default function MyComponent() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Not signed in</div>
  }

  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <p>Email: {session.user.email}</p>
      {session.user.image && (
        <img src={session.user.image} alt="Profile" />
      )}
    </div>
  )
}
```

### Sign In

```typescript
"use client"

import { signIn } from "@/lib/auth-client"

function SignInButton() {
  return (
    <button
      onClick={() => signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      })}
    >
      Sign in with Google
    </button>
  )
}
```

### Sign Out

```typescript
"use client"

import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

function SignOutButton() {
  const router = useRouter()

  return (
    <button
      onClick={async () => {
        await signOut()
        router.push("/")
      }}
    >
      Sign Out
    </button>
  )
}
```

### Server Components & API Routes

```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return Response.json({
    user: session.user
  })
}
```

---

## Protected Routes

### Client-Side Protection

Redirect users if not authenticated:

```typescript
"use client"

import { useEffect } from "react"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in")
    }
  }, [session, isPending, router])

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
```

### API Route Protection

```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST(request: Request) {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  // User is authenticated
  const userId = session.user.id

  // Your protected logic here
  // ...

  return Response.json({ success: true })
}
```

---

## Session Management

### Session Configuration

Sessions are configured in `/lib/auth.ts`:

```typescript
export const auth = betterAuth({
  // ...
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,      // Update daily
  },
})
```

### Session Data Structure

```typescript
{
  user: {
    id: string
    email: string
    name: string | null
    image: string | null
    emailVerified: boolean
    createdAt: Date
    updatedAt: Date
  },
  session: {
    id: string
    userId: string
    expiresAt: Date
    createdAt: Date
  }
}
```

### Check Session Status

```typescript
"use client"

import { useSession } from "@/lib/auth-client"

export default function SessionStatus() {
  const { data: session, isPending } = useSession()

  return (
    <div>
      {isPending && "Checking session..."}
      {!isPending && session && "Signed in"}
      {!isPending && !session && "Signed out"}
    </div>
  )
}
```

### Refresh Session

Sessions auto-refresh when accessed. Manual refresh:

```typescript
import { useSession } from "@/lib/auth-client"

const { data: session, refetch } = useSession()

// Manually refresh
await refetch()
```

---

## Advanced Configuration

### Add Email/Password Authentication

Update `/lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // Require email verification
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
})
```

### Add More OAuth Providers

```typescript
socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  },
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  },
}
```

### Custom Session Duration

```typescript
session: {
  expiresIn: 60 * 60 * 24 * 30,  // 30 days
  updateAge: 60 * 60 * 24 * 7,   // Update weekly
  cookieCache: {
    enabled: true,
    maxAge: 60 * 5 // 5 minutes
  }
}
```

### Add Roles & Permissions

Extend the user table in `/lib/schema.ts`:

```typescript
export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false),
  name: text("name"),
  image: text("image"),
  role: text("role").default("user"), // Add role field
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})
```

Check roles in your app:

```typescript
const { data: session } = useSession()

if (session?.user.role === "admin") {
  // Show admin features
}
```

---

## Troubleshooting

### Common Issues

#### OAuth Redirect Mismatch

**Error**: `redirect_uri_mismatch`

**Solution**:
1. Check authorized redirect URIs in Google Console
2. Ensure they match exactly: `http://localhost:3000/api/auth/callback/google`
3. No trailing slashes
4. Include all environments (localhost, staging, production)

#### Session Not Persisting

**Solution**:
1. Check `BETTER_AUTH_SECRET` is set
2. Verify database connection
3. Check browser cookies are enabled
4. Ensure `BETTER_AUTH_URL` matches your domain

#### "Unauthorized" Errors

**Solution**:
1. Check session hasn't expired
2. Verify `useSession()` is called in client component
3. Ensure API route has proper headers

---

## Security Best Practices

### 1. Secure Your Auth Secret

```bash
# Generate strong secret
openssl rand -base64 32

# Never commit to git
echo ".env.local" >> .gitignore

# Use different secrets for staging/production
```

### 2. Enable HTTPS in Production

```bash
# Production environment variable
BETTER_AUTH_URL=https://your-domain.com  # Not http://
```

### 3. Implement CSRF Protection

Better Auth includes CSRF protection by default. Ensure it's enabled:

```typescript
export const auth = betterAuth({
  // ...
  advanced: {
    crossSubDomainCookies: {
      enabled: false // Disable for better security
    }
  }
})
```

### 4. Rate Limit Auth Endpoints

Use Upstash Redis or similar for rate limiting:

```typescript
// In /app/api/auth/[...all]/route.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})

// Apply to auth requests
```

### 5. Validate Email Domains

```typescript
// In /lib/auth.ts
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    async sendVerificationEmail({ user, url }) {
      // Only allow company emails
      if (!user.email.endsWith("@yourcompany.com")) {
        throw new Error("Only company emails allowed")
      }
      // Send email...
    }
  }
})
```

---

## Related Documentation

- [DATABASE.md](./DATABASE.md) - Database schema (users, sessions, accounts)
- [API.md](./API.md) - Auth API endpoints
- [Better Auth Docs](https://www.better-auth.com/docs) - Official documentation

---

**Need help?** Open an issue on [GitHub](https://github.com/nuvian-labs/nuvian-labs-boilerplate/issues)

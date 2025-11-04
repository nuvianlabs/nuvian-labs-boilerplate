# Troubleshooting Guide

Common issues and solutions for the Nuvian Labs Boilerplate.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Database Problems](#database-problems)
- [Authentication Errors](#authentication-errors)
- [Build & Deployment Issues](#build--deployment-issues)
- [Development Server Issues](#development-server-issues)
- [Type Errors](#type-errors)

---

## Installation Issues

### `pnpm: command not found`

**Problem**: pnpm is not installed.

**Solution**:
```bash
# Install pnpm globally
npm install -g pnpm

# Or use Corepack (Node 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

### `Error: EACCES: permission denied`

**Problem**: Insufficient permissions to install packages.

**Solution**:
```bash
# macOS/Linux - Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use nvm to manage Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### `Package installation fails`

**Problem**: Corrupted package cache or lock file.

**Solution**:
```bash
# Clean pnpm cache
pnpm store prune

# Delete lock file and node_modules
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install
```

---

## Database Problems

### `Error: DATABASE_URL environment variable is not set`

**Problem**: Database connection string not configured.

**Solution**:
```bash
# 1. Copy .env.example to .env.local
cp .env.example .env.local

# 2. Edit .env.local and add your database URL
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# 3. Restart dev server
pnpm dev
```

### `Error: connect ECONNREFUSED`

**Problem**: Cannot connect to PostgreSQL database.

**Solution**:

**Check if PostgreSQL is running:**
```bash
# macOS
brew services list | grep postgresql

# Start PostgreSQL
brew services start postgresql@15

# Linux
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql
```

**Verify connection string:**
```bash
# Test connection
psql postgresql://user:password@localhost:5432/dbname

# If this fails, check:
# 1. Database exists: \l in psql
# 2. User has permissions: \du in psql
# 3. Port is correct (default: 5432)
```

### `Error: relation "user" does not exist`

**Problem**: Database schema not created.

**Solution**:
```bash
# Push schema to database
pnpm db:push

# Verify tables created
pnpm db:studio
```

### `Error: SSL connection required`

**Problem**: Database requires SSL but connection string doesn't specify it.

**Solution**:
```bash
# Add SSL to connection string
DATABASE_URL=postgresql://user:password@host:5432/db?sslmode=require

# Or for Supabase/cloud providers
DATABASE_URL=postgresql://user:password@host:6543/db?pgbouncer=true&sslmode=require
```

### `Migration errors`

**Problem**: Schema changes conflict with existing data.

**Solution**:
```bash
# DEVELOPMENT ONLY - drops all data
pnpm db:drop
pnpm db:push

# PRODUCTION - create manual migration
pnpm db:generate
# Review generated SQL in drizzle/ folder
# Apply carefully with pnpm db:migrate
```

---

## Authentication Errors

### `Error: redirect_uri_mismatch`

**Problem**: OAuth redirect URI not authorized in Google Console.

**Solution**:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add to "Authorized redirect URIs":
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-domain.com/api/auth/callback/google
   ```
4. Save and wait 5 minutes for changes to propagate

### `Error: BETTER_AUTH_SECRET is not set`

**Problem**: Auth secret not configured.

**Solution**:
```bash
# Generate secret
openssl rand -base64 32

# Add to .env.local
BETTER_AUTH_SECRET=your-generated-secret-here

# Restart server
pnpm dev
```

### Session not persisting after sign-in

**Problem**: Cookies not being set properly.

**Solution**:

1. **Check BETTER_AUTH_URL matches your domain:**
   ```bash
   # .env.local
   BETTER_AUTH_URL=http://localhost:3000  # Must match exactly
   ```

2. **Ensure browsers accept cookies**
3. **Clear browser cookies and try again**
4. **Check for HTTPS in production:**
   ```bash
   # Production .env
   BETTER_AUTH_URL=https://your-domain.com  # Not http://
   ```

### `Error: Invalid client_id`

**Problem**: Google OAuth credentials incorrect.

**Solution**:

1. Verify credentials in `.env.local`:
   ```bash
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

2. Check client ID format ends with `.apps.googleusercontent.com`
3. Ensure using OAuth 2.0 Client ID (not API key)

### Sign-out doesn't work

**Problem**: Session not being cleared properly.

**Solution**:
```typescript
import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

// Ensure you redirect after sign-out
async function handleSignOut() {
  await signOut()
  router.push("/")
  router.refresh() // Force refresh
}
```

---

## Build & Deployment Issues

### `Error: Type error during build`

**Problem**: TypeScript compilation errors.

**Solution**:
```bash
# Check for type errors
pnpm type-check

# Common fixes:
# 1. Update types
npm update @types/node @types/react @types/react-dom

# 2. Clear Next.js cache
rm -rf .next

# 3. Rebuild
pnpm build
```

### `Error: Module not found`

**Problem**: Import paths or dependencies missing.

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check import paths use aliases
# ✅ import { db } from "@/lib/db"
# ❌ import { db } from "../../lib/db"
```

### Build works locally but fails in Vercel

**Problem**: Environment variables not set in Vercel.

**Solution**:

1. Go to Vercel Project Settings → Environment Variables
2. Add all required variables from `.env.example`
3. Redeploy

**Required variables:**
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### `Error: Serverless Function timeout`

**Problem**: Database queries taking too long.

**Solution**:

1. **Add connection pooling:**
   ```bash
   # Use connection pooler (Supabase/PgBouncer)
   DATABASE_URL=postgresql://...?pgbouncer=true
   ```

2. **Optimize queries:**
   ```typescript
   // Add indexes to frequently queried columns
   // Use db.query instead of raw SQL
   // Limit results with .limit(n)
   ```

3. **Increase timeout (Vercel Pro):**
   ```json
   // vercel.json
   {
     "functions": {
       "app/api/**/*.ts": {
         "maxDuration": 60
       }
     }
   }
   ```

---

## Development Server Issues

### `Error: Port 3000 already in use`

**Problem**: Another process is using port 3000.

**Solution**:
```bash
# Find and kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
pnpm dev -- -p 3001
```

### Hot reload not working

**Problem**: File changes not reflecting.

**Solution**:

1. **Restart dev server:**
   ```bash
   # Kill server (Ctrl+C) and restart
   pnpm dev
   ```

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   pnpm dev
   ```

3. **Check file watcher limits (Linux):**
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

### `ENOSPC: System limit for number of file watchers reached`

**Problem**: Too many files being watched (Linux).

**Solution**:
```bash
# Increase file watcher limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
echo fs.inotify.max_queued_events=524288 | sudo tee -a /etc/sysctl.conf
echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## Type Errors

### `Cannot find module '@/lib/...'`

**Problem**: TypeScript path aliases not configured.

**Solution**:

Verify `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### `Type 'X' is not assignable to type 'Y'`

**Problem**: Type mismatch in components or functions.

**Solution**:

1. **Check function signatures:**
   ```typescript
   // Make sure types match
   const user: User | null = await getUser()
   if (!user) return // Handle null case
   ```

2. **Use type assertions carefully:**
   ```typescript
   const data = response as MyType // Only if you're sure
   ```

3. **Enable strict mode for better errors:**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

### `Property 'X' does not exist on type 'Y'`

**Problem**: Accessing property that doesn't exist.

**Solution**:

1. **Check object structure:**
   ```typescript
   const { data: session } = useSession()
   console.log(session?.user?.email) // Use optional chaining
   ```

2. **Extend types if needed:**
   ```typescript
   // types/index.ts
   import { Session } from "better-auth"

   declare module "better-auth" {
     interface Session {
       customField: string
     }
   }
   ```

---

## Performance Issues

### Slow page loads

**Solution**:

1. **Enable image optimization:**
   ```typescript
   // Use Next.js Image component
   import Image from "next/image"

   <Image src="/logo.png" width={100} height={100} alt="Logo" />
   ```

2. **Implement code splitting:**
   ```typescript
   // Dynamic imports for heavy components
   const HeavyComponent = dynamic(() => import("@/components/Heavy"), {
     loading: () => <LoadingSpinner />
   })
   ```

3. **Add caching:**
   ```typescript
   // API routes
   export async function GET() {
     return Response.json(data, {
       headers: {
         'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
       }
     })
   }
   ```

### Database queries slow

**Solution**:

1. **Add indexes:**
   ```typescript
   // lib/schema.ts
   export const users = pgTable("user", {
     // ... columns
   }, (table) => ({
     emailIdx: index("email_idx").on(table.email)
   }))
   ```

2. **Use connection pooling**
3. **Optimize queries** (see [DATABASE.md](./DATABASE.md))

---

## Getting More Help

### Check Logs

**Development:**
```bash
# Terminal shows detailed errors
pnpm dev
```

**Production (Vercel):**
1. Go to Vercel Dashboard → Your Project → Logs
2. View real-time logs
3. Filter by error level

**Database:**
```bash
# Check database logs
pnpm db:studio
```

### Debug Mode

Enable verbose logging:

```typescript
// lib/auth.ts
export const auth = betterAuth({
  // ...
  advanced: {
    debug: process.env.NODE_ENV === "development"
  }
})
```

### Common Command Fixes

```bash
# Nuclear option - reset everything (DELETES DATA)
rm -rf node_modules pnpm-lock.yaml .next
pnpm install
pnpm db:drop  # WARNING: Deletes all data
pnpm db:push
pnpm dev
```

### Still Stuck?

1. **Search existing issues**: [GitHub Issues](https://github.com/nuvian-labs/nuvian-labs-boilerplate/issues)
2. **Check documentation**:
   - [QUICK-START.md](./QUICK-START.md)
   - [DATABASE.md](./DATABASE.md)
   - [AUTH.md](./AUTH.md)
   - [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Open a new issue** with:
   - Error message (full stack trace)
   - Steps to reproduce
   - Environment (OS, Node version, pnpm version)
   - What you've tried

---

**Remember**: Most issues are environment variable related. Check `.env.local` first!

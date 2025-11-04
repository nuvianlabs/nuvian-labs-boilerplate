# Quick Start Guide

Get your Nuvian Labs Boilerplate up and running in minutes.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **pnpm** package manager ([Install](https://pnpm.io/installation))
- **PostgreSQL database** (local or cloud)
- **Google OAuth credentials** (optional, for authentication)

## 1. Clone or Use Template

### Option A: Use as Template (Recommended)
```bash
# On GitHub, click "Use this template" button
# Then clone your new repository
git clone https://github.com/YOUR_USERNAME/YOUR_PROJECT_NAME.git
cd YOUR_PROJECT_NAME
```

### Option B: Clone Directly
```bash
git clone https://github.com/nuvian-labs/nuvian-labs-boilerplate.git
cd nuvian-labs-boilerplate
```

## 2. Install Dependencies

```bash
pnpm install
```

## 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure the following **required** variables:

```bash
# Database (Required)
DATABASE_URL=postgresql://user:password@localhost:5432/your_database

# Authentication (Required)
BETTER_AUTH_SECRET=your-random-32-character-secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (Required for sign-in)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Generate Auth Secret

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

## 4. Set Up Database

### Create Database

```bash
# If using local PostgreSQL
createdb your_database_name

# Or connect to your cloud database (Vercel Postgres, Supabase, Railway, etc.)
```

### Run Migrations

```bash
pnpm db:push
```

This will create all necessary tables in your database.

## 5. Start Development Server

```bash
pnpm dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## 6. Verify Setup

Visit [http://localhost:3000/setup](http://localhost:3000/setup) to check your configuration:

- ✅ Environment variables loaded
- ✅ Database connected
- ✅ Authentication configured
- ✅ All systems operational

## 7. Test Authentication

1. Visit [http://localhost:3000/sign-in](http://localhost:3000/sign-in)
2. Click "Continue with Google"
3. Authorize with your Google account
4. You'll be redirected to the dashboard at `/dashboard`

## What's Next?

### Explore the Boilerplate

- **Landing Page**: `/` - Marketing site with features and pricing
- **Dashboard**: `/dashboard` - Protected user dashboard
- **Settings**: `/dashboard/settings` - User settings and preferences
- **Billing**: `/dashboard/billing` - Subscription and payment management
- **Profile**: `/dashboard/profile` - User profile management

### Customize Your App

1. **Update branding** in `app/layout.tsx` (title, description)
2. **Modify landing page** in `app/page.tsx`
3. **Customize pricing** in `app/(marketing)/pricing/page.tsx`
4. **Add your logo** by updating the header component

### Optional Integrations

Add these services to unlock additional features:

- **Stripe** - For payments and subscriptions ([Setup Guide](./DEPLOYMENT.md#stripe-setup))
- **OpenAI** - For AI features ([API Keys](https://platform.openai.com/api-keys))
- **PostHog** - For analytics ([Setup Guide](https://posthog.com/docs))
- **Sentry** - For error tracking ([Setup Guide](https://docs.sentry.io/))
- **Resend** - For transactional emails ([API Keys](https://resend.com/api-keys))

## Common Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm type-check         # Check TypeScript types
pnpm lint               # Lint code

# Database
pnpm db:push            # Push schema changes
pnpm db:studio          # Open database GUI
pnpm db:generate        # Generate migrations

# Production
pnpm build              # Build for production
pnpm start              # Start production server
```

## Getting Help

- **Setup Issues**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Database Help**: See [DATABASE.md](./DATABASE.md)
- **Auth Setup**: See [AUTH.md](./AUTH.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── (marketing)/       # Public marketing pages
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/             # Auth-specific components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities and configurations
│   ├── auth.ts           # Better Auth configuration
│   ├── db.ts             # Database client
│   └── schema.ts         # Database schema
└── public/               # Static assets
```

## Next Steps

1. ✅ **Read the [DATABASE.md](./DATABASE.md)** guide to understand the schema
2. ✅ **Set up [Google OAuth](./AUTH.md#google-oauth-setup)** for authentication
3. ✅ **Review the [API documentation](./API.md)** for available endpoints
4. ✅ **Check [DEPLOYMENT.md](./DEPLOYMENT.md)** when ready to deploy

---

**Need help?** Open an issue on [GitHub](https://github.com/nuvian-labs/nuvian-labs-boilerplate/issues)

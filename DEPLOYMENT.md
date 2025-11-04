# Deployment Guide

Deploy your Nuvian Labs Boilerplate to production with these step-by-step guides.

## Table of Contents

- [Vercel (Recommended)](#vercel-deployment)
- [Railway](#railway-deployment)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment-checklist)

---

## Vercel Deployment

Vercel is the recommended platform for deploying Next.js applications.

### Prerequisites

- Vercel account ([Sign up](https://vercel.com/signup))
- GitHub repository with your code
- PostgreSQL database (Vercel Postgres, Supabase, or Railway)

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select your repository and click "Import"

### Step 2: Configure Project

```bash
Framework Preset: Next.js
Root Directory: ./
Build Command: pnpm build (or leave default)
Output Directory: .next (or leave default)
Install Command: pnpm install
```

### Step 3: Set Environment Variables

In the Vercel project settings, add these environment variables:

#### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication
BETTER_AUTH_SECRET=your-production-secret-keep-this-safe
BETTER_AUTH_URL=https://your-domain.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Optional Variables (Add as needed)

```bash
# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# OpenAI (for AI features)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# Resend (for emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# PostHog (for analytics)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sentry (for error tracking)
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxxxxxxxxx

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://xxxxxxxxxxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxx

# Inngest (for background jobs)
INNGEST_EVENT_KEY=xxxxxxxxxxxxx
INNGEST_SIGNING_KEY=signkey-xxxxxxxxxxxxx
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (~2-3 minutes)
3. Visit your deployed site at `https://your-project.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `BETTER_AUTH_URL` in environment variables to use your custom domain

---

## Railway Deployment

Railway provides an excellent platform with built-in PostgreSQL.

### Prerequisites

- Railway account ([Sign up](https://railway.app))
- GitHub repository with your code

### Step 1: Create New Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway and select your repository

### Step 2: Add PostgreSQL Database

1. In your Railway project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically provision a PostgreSQL database
4. Copy the `DATABASE_URL` connection string

### Step 3: Configure Environment Variables

In Railway project settings, add variables tab:

```bash
# Database (automatically provided by Railway if using their PostgreSQL)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Authentication
BETTER_AUTH_SECRET=your-production-secret
BETTER_AUTH_URL=https://your-app.up.railway.app

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Add other optional variables as needed (see Vercel section above)
```

### Step 4: Configure Build Settings

Railway should auto-detect Next.js. Verify these settings:

```bash
Build Command: pnpm build
Start Command: pnpm start
Install Command: pnpm install
```

### Step 5: Deploy

1. Click "Deploy"
2. Railway will build and deploy your application
3. Access your app at `https://your-app.up.railway.app`

---

## Database Setup

### Option 1: Vercel Postgres (Recommended for Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Storage
2. Click "Create Database" → "Postgres"
3. Select your project
4. Vercel automatically adds `POSTGRES_URL` to your environment variables
5. Rename it to `DATABASE_URL` in your environment variables

**Run Migrations:**

```bash
# Locally with Vercel CLI
vercel env pull .env.local
pnpm db:push
```

### Option 2: Supabase

1. Create project at [Supabase](https://supabase.com)
2. Go to Project Settings → Database
3. Copy the connection string (in "URI" format)
4. Add to `DATABASE_URL` in your deployment platform

**Connection String Format:**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### Option 3: Railway Postgres

1. Add PostgreSQL service in Railway project
2. Railway automatically provides `DATABASE_URL`
3. Reference it in your app: `${{Postgres.DATABASE_URL}}`

### Option 4: Other Providers

Compatible with any PostgreSQL provider:
- **Neon** ([neon.tech](https://neon.tech))
- **PlanetScale** ([planetscale.com](https://planetscale.com))
- **Heroku Postgres** ([heroku.com/postgres](https://www.heroku.com/postgres))
- **AWS RDS** ([aws.amazon.com/rds](https://aws.amazon.com/rds/))

---

## Environment Variables

### Production Security Checklist

- ✅ Use strong, unique `BETTER_AUTH_SECRET` (32+ characters)
- ✅ Never commit `.env.local` or `.env` to version control
- ✅ Use production OAuth credentials (not development)
- ✅ Enable SSL for database connections
- ✅ Use environment-specific URLs (`BETTER_AUTH_URL`)
- ✅ Rotate secrets regularly
- ✅ Use different secrets for staging vs production

### Managing Secrets

**Vercel:**
```bash
# Pull environment variables locally
vercel env pull .env.local

# Add new variable
vercel env add DATABASE_URL

# Remove variable
vercel env rm OLD_VARIABLE
```

**Railway:**
```bash
# Pull environment variables
railway variables

# Set variable
railway variables set KEY=value
```

---

## Google OAuth Setup for Production

### Update OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add authorized redirect URIs:

```
https://your-domain.com/api/auth/callback/google
https://your-domain.vercel.app/api/auth/callback/google
```

4. Add authorized JavaScript origins:

```
https://your-domain.com
https://your-domain.vercel.app
```

5. Save changes

---

## Stripe Setup

### Create Stripe Account

1. Sign up at [Stripe](https://stripe.com)
2. Complete account verification
3. Switch to **Live Mode** (toggle in dashboard)

### Get API Keys

1. Go to Developers → API keys
2. Copy your **Live** publishable key and secret key
3. Add to environment variables:

```bash
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
```

### Set Up Webhooks

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret
6. Add to environment variables:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

---

## Post-Deployment Checklist

### Verify Deployment

- [ ] Site loads at production URL
- [ ] Database connection works
- [ ] Sign-in with Google works
- [ ] Dashboard is accessible after auth
- [ ] API endpoints respond correctly
- [ ] Environment variables are set
- [ ] SSL certificate is active
- [ ] Custom domain configured (if applicable)

### Test Critical Paths

- [ ] User can sign up
- [ ] User can sign in
- [ ] User can access dashboard
- [ ] User can update profile
- [ ] User can change settings
- [ ] Waitlist form submits successfully

### Performance & Monitoring

- [ ] Enable Vercel Analytics or PostHog
- [ ] Set up Sentry error tracking
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring
- [ ] Enable logging (structured logs)

### Security

- [ ] Force HTTPS
- [ ] Set security headers
- [ ] Enable CORS properly
- [ ] Rate limiting configured
- [ ] Database connection uses SSL
- [ ] Secrets rotated from development

---

## Continuous Deployment

### Automatic Deployments

Both Vercel and Railway support automatic deployments:

- **Push to `main` branch** → Deploys to production
- **Push to other branches** → Creates preview deployment
- **Pull requests** → Generates preview URLs

### Manual Deployments

**Vercel:**
```bash
vercel --prod
```

**Railway:**
```bash
railway up
```

---

## Rollback

### Vercel

1. Go to Deployments tab
2. Find the last working deployment
3. Click "⋯" → "Promote to Production"

### Railway

1. Go to Deployments
2. Select previous deployment
3. Click "Redeploy"

---

## Troubleshooting

### Build Fails

**Error: `DATABASE_URL is not set`**
- Add `DATABASE_URL` to environment variables
- Ensure database connection string is valid

**Error: TypeScript errors**
```bash
pnpm type-check
```

### Runtime Errors

**Error: `BETTER_AUTH_SECRET is not set`**
- Add to production environment variables
- Redeploy

**Error: OAuth redirect mismatch**
- Update authorized redirect URIs in Google Console
- Ensure `BETTER_AUTH_URL` matches your domain

### Database Issues

**Connection timeout**
- Enable SSL in connection string: `?sslmode=require`
- Check database is accessible from deployment platform
- Verify firewall rules allow connections

---

## Performance Optimization

### Enable Caching

Add to `next.config.ts`:

```typescript
const nextConfig = {
  // ... existing config
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
      ],
    },
  ],
}
```

### Database Connection Pooling

For serverless environments, use connection pooling:

```bash
# Supabase (with pooling)
DATABASE_URL=postgresql://user:pass@host:6543/db?pgbouncer=true

# Or use Prisma Accelerate / Supabase Pooler
```

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Issues**: [GitHub Issues](https://github.com/nuvian-labs/nuvian-labs-boilerplate/issues)

---

**Ready to deploy? Start with Vercel for the easiest experience!**

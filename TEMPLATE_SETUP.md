# Template Setup Guide

This guide will help you set up your new project after creating it from the Nuvian Labs Boilerplate template.

## Step 1: Create Your Repository

1. Click "Use this template" on GitHub
2. Choose "Create a new repository"
3. Name your repository
4. Choose public or private
5. Click "Create repository from template"

## Step 2: Clone Your Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

## Step 3: Install Dependencies

```bash
pnpm install
```

If you don't have pnpm installed:
```bash
npm install -g pnpm
```

## Step 4: Customize Your Project

### Update package.json

```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "description": "Your project description",
  "author": "Your Name"
}
```

### Update Project Name Throughout

Search and replace "Nuvian Labs Boilerplate" with your project name in:
- [README.md](README.md) - Main heading and all references
- [app/layout.tsx](app/layout.tsx) - Site metadata
- [app/page.tsx](app/page.tsx) - Homepage content
- [components/nav.tsx](components/nav.tsx) - Navigation branding

### Update Branding

1. Replace [public/logo.svg](public/logo.svg) with your logo
2. Update favicon in [app/layout.tsx](app/layout.tsx)
3. Update colors in [tailwind.config.ts](tailwind.config.ts)
4. Update metadata in [app/layout.tsx](app/layout.tsx)

## Step 5: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Generate required secrets:
```bash
# Generate AUTH_SECRET
openssl rand -base64 32

# Generate ENCRYPTION_KEY
openssl rand -hex 32
```

3. Fill in all required variables in `.env.local`:
   - Database URL
   - Google OAuth credentials
   - Stripe keys (if using payments)
   - Email service credentials (if using email)
   - Analytics keys (if using analytics)

See [QUICK-START.md](QUICK-START.md) for detailed environment variable setup.

## Step 6: Set Up Your Database

### Option A: Vercel Postgres (Recommended for Vercel deployments)

1. Create a Vercel account if you don't have one
2. Create a new Postgres database in your Vercel dashboard
3. Copy the connection string to `DATABASE_URL` in `.env.local`

### Option B: Supabase

1. Create a Supabase account and project
2. Get the connection string from Project Settings → Database
3. Copy to `DATABASE_URL` in `.env.local`

### Option C: Railway

1. Create a Railway account and project
2. Add a PostgreSQL service
3. Copy the connection string to `DATABASE_URL` in `.env.local`

### Option D: Local PostgreSQL

```bash
# macOS
brew install postgresql
brew services start postgresql
createdb your_db_name

# Set DATABASE_URL
DATABASE_URL="postgresql://localhost/your_db_name"
```

### Initialize Database

```bash
pnpm db:push
```

See [DATABASE.md](DATABASE.md) for more details.

## Step 7: Set Up Authentication

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

See [AUTH.md](AUTH.md) for detailed authentication setup.

## Step 8: Test Your Setup

```bash
# Start development server
pnpm dev

# In another terminal, run type checking
pnpm type-check

# Run unit tests
pnpm test

# Run E2E tests (requires dev server running)
pnpm test:e2e
```

Visit http://localhost:3000 to see your app.

## Step 9: Remove Template-Specific Files (Optional)

If you don't need the template documentation:

```bash
rm TEMPLATE_SETUP.md
rm STATUS.md
```

Update [README.md](README.md) to focus on your project instead of the boilerplate.

## Step 10: Deploy Your App

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
pnpm add -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard
4. Redeploy with production settings

### Railway

1. Connect your GitHub repository to Railway
2. Add environment variables
3. Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Optional: Enable Additional Features

The boilerplate includes optional features you can enable:

### Phase 6: AI Integration
- OpenAI integration
- AI-powered chat interface
- Streaming responses

### Phase 7: Feature Requests
- In-app feature request system
- Voting and commenting
- Admin management interface

### Phase 8: Analytics
- PostHog integration
- Event tracking
- User analytics dashboard

### Phase 9: Payments
- Stripe subscription management
- Multiple pricing tiers
- Webhook handling
- Customer portal

### Phase 10: Email
- Resend integration
- Transactional emails
- Email templates with React Email

See the individual phase documentation in the codebase for setup instructions.

## Getting Help

- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- Read the [QUICK-START.md](QUICK-START.md) for detailed setup
- Open an issue on GitHub for bugs
- Start a discussion for questions

## Next Steps

1. Customize your landing page
2. Build your core features
3. Add your content
4. Set up CI/CD
5. Configure monitoring
6. Launch!

Happy building! 🚀

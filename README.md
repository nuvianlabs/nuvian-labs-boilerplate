# Nuvian Labs Boilerplate

Production-ready Next.js boilerplate with authentication, database, AI, payments, and analytics. Build your SaaS faster.

## Features

- ✅ **Next.js 15** with App Router
- ✅ **React 19** with TypeScript
- ✅ **Better Auth** with Google OAuth
- ✅ **Drizzle ORM** with PostgreSQL
- ✅ **Stripe** payments integration
- ✅ **AI Integration** with Vercel AI SDK
- ✅ **Email** with Resend & React Email
- ✅ **Analytics** with PostHog & Vercel Analytics
- ✅ **Monitoring** with Sentry
- ✅ **Styling** with Tailwind CSS & shadcn/ui

## Quick Start

1. **Use this template**
   ```bash
   gh repo create my-app --template YOUR_USERNAME/nuvian-labs-boilerplate --private
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run database migrations**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Verify setup**
   Open [http://localhost:3000/setup](http://localhost:3000/setup)

## Documentation

- [Quick Start Guide](docs/setup/QUICK-START.md)
- [Deployment Guide](docs/setup/DEPLOYMENT.md)
- [Database Setup](docs/setup/DATABASE.md)
- [Authentication Setup](docs/setup/AUTH.md)

## Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript check

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Drizzle Studio
pnpm db:seed          # Seed database

# Testing
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests
```

## Tech Stack

### Core
- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui

### Backend
- **Database:** PostgreSQL
- **ORM:** Drizzle
- **Auth:** Better Auth
- **Payments:** Stripe
- **Email:** Resend
- **Jobs:** Inngest

### Frontend
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts

### Infrastructure
- **Hosting:** Vercel
- **Analytics:** PostHog
- **Monitoring:** Sentry
- **Logging:** Pino
- **Rate Limiting:** Upstash Redis

## Project Structure

```
nuvian-labs-boilerplate/
├── app/
│   ├── (marketing)/          # Public marketing pages
│   ├── (auth)/               # Authentication pages
│   ├── (dashboard)/          # Protected dashboard
│   ├── (ai)/                 # AI chat interface
│   ├── api/                  # API routes
│   └── setup/                # Setup checker
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── marketing/            # Marketing components
│   ├── dashboard/            # Dashboard components
│   ├── auth/                 # Auth components
│   └── email/                # Email templates
├── lib/
│   ├── schema.ts             # Database schema
│   ├── db.ts                 # Database client
│   ├── auth.ts               # Auth configuration
│   └── utils.ts              # Utility functions
├── docs/                     # Documentation
└── scripts/                  # Utility scripts
```

## Environment Variables

See [.env.example](.env.example) for all required and optional environment variables.

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Random secret for auth
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret

### Optional
- `OPENAI_API_KEY` - For AI features
- `STRIPE_SECRET_KEY` - For payments
- `RESEND_API_KEY` - For emails
- `POSTHOG_KEY` - For analytics

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import on [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy!

See [DEPLOYMENT.md](docs/setup/DEPLOYMENT.md) for detailed instructions.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📚 [Documentation](docs/)
- 🐛 [Report Bug](https://github.com/YOUR_USERNAME/nuvian-labs-boilerplate/issues)
- 💡 [Request Feature](https://github.com/YOUR_USERNAME/nuvian-labs-boilerplate/issues)

---

**Built with ❤️ using Nuvian Labs Boilerplate**

# Getting Started with Nuvian Labs Boilerplate

## 🎯 What You Have

A partially-built, production-ready Next.js boilerplate with:

✅ **Phases 1-4 Complete (31% done)**
- Foundation (Next.js 15, TypeScript, Tailwind CSS)
- Database & Auth (Drizzle ORM, Better Auth, Google OAuth)
- Setup Checker page
- Marketing Site (landing, pricing, waitlist)

🚧 **Phases 5-13 Remaining**
- Dashboard, AI Integration, Feature Requests, Analytics, Payments, Email, Documentation, Polish, GitHub Template Setup

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add at minimum:
```env
# Required for basic functionality
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@host:5432/database
BETTER_AUTH_SECRET=your-random-secret-here
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret
```

### 3. Set Up Database

```bash
# Generate migrations from schema
pnpm db:generate

# Apply migrations
pnpm db:migrate

# (Optional) Seed with sample data
pnpm db:seed
```

### 4. Start Development

```bash
pnpm dev
```

Visit http://localhost:3000

## 🧪 What Works Now

You can currently:

1. **View marketing pages:**
   - Landing page: http://localhost:3000
   - Pricing: http://localhost:3000/pricing
   - Waitlist: http://localhost:3000/waitlist

2. **Check setup status:**
   - Setup checker: http://localhost:3000/setup

3. **See auth pages:**
   - Sign in: http://localhost:3000/sign-in
   - Sign up: http://localhost:3000/sign-up

4. **Test APIs:**
   - Health check: http://localhost:3000/api/health
   - Waitlist submission (POST to /api/waitlist)

## 📝 What to Build Next

See [STATUS.md](STATUS.md) for detailed progress.

### Option A: Complete MVP (Recommended)

Build these phases in order:
1. **Phase 5: Dashboard** - Essential for logged-in users
2. **Phase 11: Documentation** - Help users set up
3. **Phase 12: Polish** - Error handling, loading states
4. **Phase 13: GitHub Template** - Make it reusable

### Option B: Feature-First Approach

Add features you need:
- **Phase 6: AI Integration** - If building AI app
- **Phase 9: Payments** - If monetizing
- **Phase 7: Feature Requests** - For user feedback
- **Phase 8: Analytics** - For insights

## 🔧 Using the Boilerplate

### For Your Own Project

1. **Fork or use as template** (after Phase 13)
2. **Edit starter prompt** in `docs/business/starter-prompt.md`
3. **Describe your app** to Claude Code
4. **Let AI build** your custom features on top

### Continue Building This Boilerplate

1. **Review** `IMPLEMENTATION-ROADMAP.md` for detailed phase instructions
2. **Pick a phase** from STATUS.md
3. **Build incrementally** and test each phase
4. **Commit frequently** after each working phase

## 📚 Documentation

- **README.md** - Overview and features
- **STATUS.md** - Current build progress
- **IMPLEMENTATION-ROADMAP.md** - Phase-by-phase guide (from original docs)
- **USER-GUIDE.md** - For end users (from original docs)
- **QUICK-COMMANDS.md** - Command reference (from original docs)

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if DATABASE_URL is set
echo $DATABASE_URL

# Test connection
pnpm db:studio
```

### Type Errors

```bash
# Check TypeScript
pnpm type-check

# Should show no errors currently
```

### Build Errors

```bash
# Clean and rebuild
pnpm clean
pnpm install
```

## 🎨 Customization

### Change Branding

1. Edit `app/layout.tsx` - Update metadata
2. Edit marketing pages - Change copy
3. Use `/create design system` in Claude Code (when Phase 11 complete)

### Add Features

Use Claude Code:
```
Build a [feature name] where users can:
- [functionality 1]
- [functionality 2]
- [functionality 3]

Create the necessary database tables, API routes, and UI components.
```

## 📦 What's Included

### Dependencies
- Next.js 15, React 19, TypeScript
- Tailwind CSS, shadcn/ui
- Better Auth (Google OAuth)
- Drizzle ORM, PostgreSQL
- Vercel AI SDK (not used yet)
- Stripe (not used yet)
- Resend (not used yet)
- PostHog (not used yet)

### File Structure
```
app/
├── (marketing)/    # Public pages ✅
├── (auth)/         # Auth pages ✅
├── (dashboard)/    # Dashboard (TODO)
├── (ai)/           # AI chat (TODO)
├── api/            # API routes (partial)
└── setup/          # Setup checker ✅

components/
├── ui/             # shadcn components ✅
├── marketing/      # Marketing (TODO)
├── dashboard/      # Dashboard (TODO)
└── auth/           # Auth button ✅

lib/
├── schema.ts       # DB schema ✅
├── db.ts           # DB client ✅
├── auth.ts         # Auth config ✅
└── utils.ts        # Utilities ✅
```

## ✅ Next Steps

1. **Choose your path:**
   - Complete the boilerplate (Phases 5-13)
   - OR use it now to build your app (limited features)

2. **Set up services:**
   - Create Vercel Postgres database
   - Set up Google OAuth credentials
   - (Optional) Add API keys for other services

3. **Start building:**
   - Use `docs/business/starter-prompt.md` as template
   - Give prompts to Claude Code
   - Build your app features

## 💡 Pro Tips

- **Test frequently** - Run `pnpm dev` after changes
- **Commit often** - Use git for checkpoints
- **Read STATUS.md** - See what's done and what's next
- **Check setup page** - Verify configuration at `/setup`
- **Use TypeScript** - Run `pnpm type-check` before committing

---

**Happy Building! 🚀**

Need help? Check the docs or review the implementation roadmap for detailed instructions.

# Database Guide

Complete guide to the database schema, operations, and best practices.

## Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Setup](#setup)
- [Common Operations](#common-operations)
- [Migrations](#migrations)
- [Best Practices](#best-practices)

---

## Overview

The Nuvian Labs Boilerplate uses:

- **PostgreSQL** - Production-grade relational database
- **Drizzle ORM** - Type-safe ORM with excellent TypeScript support
- **Better Auth** - Authentication system with built-in database schema

### Connection

The database client is configured in `/lib/db.ts` with lazy initialization to prevent build-time connection issues.

```typescript
import { db } from "@/lib/db"

// Database is ready to use
const users = await db.query.users.findMany()
```

---

## Database Schema

All tables are defined in `/lib/schema.ts`.

### Core Tables (Better Auth)

#### `user` Table

Stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | Unique user ID (nanoid) |
| `email` | text | User email (unique) |
| `emailVerified` | boolean | Email verification status |
| `name` | text | User's full name |
| `image` | text | Profile image URL |
| `createdAt` | timestamp | Account creation date |
| `updatedAt` | timestamp | Last update timestamp |

**Relationships:**
- Has many `sessions`
- Has many `accounts` (OAuth providers)
- Has many `featureRequests`
- Has one `subscription`

#### `session` Table

Manages user sessions for authentication.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | Unique session ID |
| `userId` | text (FK) | Reference to user |
| `expiresAt` | timestamp | Session expiration |
| `createdAt` | timestamp | Session start time |

**Cascade:** Deletes when user is deleted

#### `account` Table

Stores OAuth provider connections.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | Unique account ID |
| `userId` | text (FK) | Reference to user |
| `accountId` | text | Provider account ID |
| `providerId` | text | OAuth provider (google, github, etc.) |
| `accessToken` | text | OAuth access token |
| `refreshToken` | text | OAuth refresh token |
| `expiresAt` | timestamp | Token expiration |
| `createdAt` | timestamp | Connection date |

**Cascade:** Deletes when user is deleted

---

### Application Tables

#### `waitlist` Table

Stores email waitlist signups.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | Unique waitlist entry ID |
| `email` | text | Email address (unique) |
| `source` | text | Where they signed up from |
| `referredBy` | text | Referral code |
| `notified` | boolean | Whether they've been notified |
| `createdAt` | timestamp | Signup date |

**Indexes:** `email` (unique)

#### `feature_request` Table

User-submitted feature requests.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | Unique request ID |
| `title` | text | Feature title |
| `description` | text | Detailed description |
| `status` | text | pending, planned, in-progress, completed |
| `upvotes` | integer | Number of upvotes |
| `userId` | text (FK) | User who created it |
| `createdAt` | timestamp | Creation date |
| `updatedAt` | timestamp | Last update |

**Relationships:**
- Belongs to `user`
- Has many `votes`

**Cascade:** Deletes when user is deleted

#### `vote` Table

Tracks user votes on feature requests.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | Unique vote ID |
| `userId` | text (FK) | User who voted |
| `requestId` | text (FK) | Feature request ID |
| `createdAt` | timestamp | Vote timestamp |

**Cascade:** Deletes when user or request is deleted

#### `metric` Table

Stores application metrics and analytics.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | Unique metric ID |
| `name` | text | Metric name |
| `value` | integer | Metric value |
| `tags` | jsonb | Additional metadata |
| `userId` | text (FK, nullable) | Associated user (optional) |
| `timestamp` | timestamp | When metric was recorded |

**Cascade:** Sets userId to null when user is deleted

#### `subscription` Table

Stripe subscription management.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text (PK) | Unique subscription ID |
| `userId` | text (FK) | Subscribed user |
| `stripeCustomerId` | text | Stripe customer ID |
| `stripeSubscriptionId` | text | Stripe subscription ID |
| `status` | text | active, canceled, past_due, etc. |
| `priceId` | text | Stripe price ID |
| `currentPeriodEnd` | timestamp | Current billing period end |
| `cancelAtPeriodEnd` | boolean | Cancel at period end flag |
| `createdAt` | timestamp | Subscription start date |
| `updatedAt` | timestamp | Last update |

**Cascade:** Deletes when user is deleted

---

## Setup

### Prerequisites

- PostgreSQL 14+ installed
- Connection string ready

### Local Setup

#### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb nuvian_boilerplate

# Set connection string in .env.local
DATABASE_URL=postgresql://localhost:5432/nuvian_boilerplate
```

#### Option 2: Docker

```bash
# Run PostgreSQL in Docker
docker run --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=nuvian_boilerplate \
  -p 5432:5432 \
  -d postgres:15

# Connection string
DATABASE_URL=postgresql://postgres:password@localhost:5432/nuvian_boilerplate
```

#### Option 3: Cloud Database

Use a hosted PostgreSQL provider:

- **Vercel Postgres** - [vercel.com/storage/postgres](https://vercel.com/storage/postgres)
- **Supabase** - [supabase.com](https://supabase.com)
- **Railway** - [railway.app](https://railway.app)
- **Neon** - [neon.tech](https://neon.tech)

### Push Schema to Database

```bash
# Push schema changes to database
pnpm db:push

# Generate migration files (optional)
pnpm db:generate
```

### Open Database Studio

```bash
# Open Drizzle Studio (database GUI)
pnpm db:studio
```

Visit [https://local.drizzle.studio](https://local.drizzle.studio) to browse your database.

---

## Common Operations

### Querying Data

#### Find All

```typescript
import { db } from "@/lib/db"

// Get all users
const allUsers = await db.query.users.findMany()

// Get with limit
const recentUsers = await db.query.users.findMany({
  limit: 10,
  orderBy: (users, { desc }) => [desc(users.createdAt)]
})
```

#### Find One

```typescript
import { eq } from "drizzle-orm"
import { users } from "@/lib/schema"

// Find by ID
const user = await db.query.users.findFirst({
  where: eq(users.id, userId)
})

// Find by email
const user = await db.query.users.findFirst({
  where: eq(users.email, "user@example.com")
})
```

#### With Relationships

```typescript
// User with sessions
const userWithSessions = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    sessions: true
  }
})

// Feature request with votes
const request = await db.query.featureRequests.findFirst({
  where: eq(featureRequests.id, requestId),
  with: {
    votes: true,
    user: true
  }
})
```

### Inserting Data

```typescript
import { db } from "@/lib/db"
import { users, waitlist } from "@/lib/schema"

// Insert one
const newUser = await db.insert(users).values({
  email: "new@example.com",
  name: "New User"
}).returning()

// Insert many
await db.insert(waitlist).values([
  { email: "user1@example.com" },
  { email: "user2@example.com" },
])
```

### Updating Data

```typescript
import { eq } from "drizzle-orm"
import { users } from "@/lib/schema"

// Update user
await db.update(users)
  .set({
    name: "Updated Name",
    updatedAt: new Date()
  })
  .where(eq(users.id, userId))
```

### Deleting Data

```typescript
import { eq } from "drizzle-orm"
import { featureRequests } from "@/lib/schema"

// Delete feature request
await db.delete(featureRequests)
  .where(eq(featureRequests.id, requestId))
```

### Complex Queries

```typescript
import { and, eq, gte, desc } from "drizzle-orm"
import { featureRequests } from "@/lib/schema"

// Feature requests with multiple conditions
const requests = await db.query.featureRequests.findMany({
  where: and(
    eq(featureRequests.status, "pending"),
    gte(featureRequests.upvotes, 5)
  ),
  orderBy: [desc(featureRequests.upvotes)],
  limit: 20
})
```

### Transactions

```typescript
await db.transaction(async (tx) => {
  // Create user
  const [user] = await tx.insert(users).values({
    email: "user@example.com",
    name: "User"
  }).returning()

  // Create subscription
  await tx.insert(subscriptions).values({
    userId: user.id,
    stripeCustomerId: "cus_xxx",
    stripeSubscriptionId: "sub_xxx",
    status: "active",
    priceId: "price_xxx"
  })
})
```

---

## Migrations

### Generate Migration

```bash
# Generate migration files
pnpm db:generate
```

This creates SQL migration files in `drizzle/` directory.

### Apply Migrations

```bash
# Push schema to database
pnpm db:push

# Or apply migrations
pnpm db:migrate
```

### Migration Best Practices

1. **Always backup** before running migrations in production
2. **Test migrations** in staging environment first
3. **Review generated SQL** before applying
4. **Use transactions** for multi-step migrations
5. **Keep migrations reversible** when possible

---

## Best Practices

### 1. Use Drizzle Query Builder

```typescript
// ✅ Good - Type-safe
const user = await db.query.users.findFirst({
  where: eq(users.email, email)
})

// ❌ Avoid - Raw SQL unless necessary
const user = await db.execute(sql`SELECT * FROM user WHERE email = ${email}`)
```

### 2. Always Handle Errors

```typescript
try {
  const user = await db.insert(users).values(data).returning()
  return { success: true, user }
} catch (error) {
  console.error("Database error:", error)
  return { success: false, error: "Failed to create user" }
}
```

### 3. Use Transactions for Related Operations

```typescript
// ✅ Good - Atomic operation
await db.transaction(async (tx) => {
  await tx.insert(users).values(userData)
  await tx.insert(subscriptions).values(subData)
})

// ❌ Avoid - Race conditions possible
await db.insert(users).values(userData)
await db.insert(subscriptions).values(subData)
```

### 4. Optimize Queries

```typescript
// ✅ Good - Single query with join
const usersWithSubs = await db.query.users.findMany({
  with: { subscription: true }
})

// ❌ Avoid - N+1 queries
const users = await db.query.users.findMany()
for (const user of users) {
  const sub = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, user.id)
  })
}
```

### 5. Index Frequently Queried Columns

```typescript
// Add indexes for better performance
export const users = pgTable("user", {
  // ... columns
}, (table) => ({
  emailIdx: index("email_idx").on(table.email),
}))
```

### 6. Use Prepared Statements

```typescript
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

// Prepare once, execute many times
const findUserById = db.query.users.findFirst({
  where: eq(users.id, placeholder("id"))
}).prepare()

// Execute with different values
const user1 = await findUserById.execute({ id: "user1" })
const user2 = await findUserById.execute({ id: "user2" })
```

---

## Troubleshooting

### Connection Issues

**Error: `connection timeout`**
```bash
# Check database is running
pg_isready

# Verify connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

### Migration Errors

**Error: `relation already exists`**
```bash
# Drop and recreate database (DEVELOPMENT ONLY!)
pnpm db:drop
pnpm db:push
```

### Performance Issues

```bash
# Analyze slow queries
EXPLAIN ANALYZE SELECT * FROM user WHERE email = 'test@example.com';

# Check indexes
\d user
```

---

## Database Commands

```bash
# Setup & Migrations
pnpm db:push         # Push schema to database
pnpm db:generate     # Generate migration files
pnpm db:migrate      # Run migrations
pnpm db:studio       # Open database GUI
pnpm db:drop         # Drop database (WARNING: deletes all data)

# psql Commands
psql $DATABASE_URL   # Connect to database
\dt                  # List tables
\d table_name        # Describe table
\q                   # Quit
```

---

## Related Documentation

- [AUTH.md](./AUTH.md) - Authentication setup
- [API.md](./API.md) - API endpoints
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues

---

**Need help?** Check the [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview) or open an issue on GitHub.

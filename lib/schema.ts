import { pgTable, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"

// Helper function for IDs
export const createId = () => nanoid()

// Users table (Better Auth compatible)
export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// Sessions table (Better Auth compatible)
export const sessions = pgTable("session", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

// Accounts table (Better Auth compatible for OAuth)
export const accounts = pgTable("account", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

// Waitlist
export const waitlist = pgTable("waitlist", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  email: text("email").notNull().unique(),
  source: text("source"),
  referredBy: text("referredBy"),
  notified: boolean("notified").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

// Feature Requests
export const featureRequests = pgTable("feature_request", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").default("pending").notNull(), // pending, planned, in-progress, completed
  upvotes: integer("upvotes").default(0).notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// Votes (for feature requests)
export const votes = pgTable("vote", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  requestId: text("requestId")
    .notNull()
    .references(() => featureRequests.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

// Metrics
export const metrics = pgTable("metric", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  value: integer("value").notNull(),
  tags: jsonb("tags"),
  userId: text("userId").references(() => users.id, { onDelete: "set null" }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
})

// Subscriptions (Stripe)
export const subscriptions = pgTable("subscription", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeCustomerId: text("stripeCustomerId").notNull(),
  stripeSubscriptionId: text("stripeSubscriptionId").notNull(),
  status: text("status").notNull(), // active, canceled, past_due, etc.
  priceId: text("priceId").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// Type exports for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Session = typeof sessions.$inferSelect
export type Account = typeof accounts.$inferSelect
export type WaitlistEntry = typeof waitlist.$inferSelect
export type FeatureRequest = typeof featureRequests.$inferSelect
export type Vote = typeof votes.$inferSelect
export type Metric = typeof metrics.$inferSelect
export type Subscription = typeof subscriptions.$inferSelect

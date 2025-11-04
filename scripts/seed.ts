import { db } from "../lib/db"
import { users, featureRequests, waitlist } from "../lib/schema"
import { createId } from "../lib/schema"

async function seed() {
  console.log("🌱 Seeding database...")

  try {
    // Create example user
    const [user] = await db
      .insert(users)
      .values({
        email: "demo@example.com",
        name: "Demo User",
        emailVerified: true,
      })
      .returning()

    console.log("✅ Created demo user:", user.email)

    // Create example feature requests
    const requests = [
      {
        title: "Dark Mode Support",
        description: "Add dark mode toggle to the application settings",
        status: "completed" as const,
        upvotes: 42,
        userId: user.id,
      },
      {
        title: "Export to CSV",
        description: "Allow users to export their data to CSV format",
        status: "in-progress" as const,
        upvotes: 28,
        userId: user.id,
      },
      {
        title: "Mobile App",
        description: "Native mobile app for iOS and Android",
        status: "planned" as const,
        upvotes: 156,
        userId: user.id,
      },
      {
        title: "API Webhooks",
        description: "Send webhooks for important events",
        status: "pending" as const,
        upvotes: 15,
        userId: user.id,
      },
    ]

    await db.insert(featureRequests).values(requests)
    console.log(`✅ Created ${requests.length} feature requests`)

    // Create example waitlist entries
    const waitlistEntries = [
      { email: "user1@example.com", source: "website" },
      { email: "user2@example.com", source: "twitter" },
      { email: "user3@example.com", source: "website" },
    ]

    await db.insert(waitlist).values(waitlistEntries)
    console.log(`✅ Created ${waitlistEntries.length} waitlist entries`)

    console.log("✅ Seeding completed!")
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }

  process.exit(0)
}

seed()

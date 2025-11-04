import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set")
  }

  const client = postgres(process.env.DATABASE_URL)
  return drizzle(client, { schema })
}

// Lazy initialization - only create connection when db is accessed
let _db: ReturnType<typeof getDb> | null = null

export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_, prop) {
    if (!_db) {
      _db = getDb()
    }
    return _db[prop as keyof typeof _db]
  }
})
